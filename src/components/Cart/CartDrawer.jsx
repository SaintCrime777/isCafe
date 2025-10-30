// src/components/Cart/CartDrawer.jsx
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
// 子組件
import CartList from "./CartList";
import LoginPrompt from "./LoginPrompt";
import OrderForm from "./OrderForm";
import OrderSuccess from "./OrderSuccess";

export default function CartDrawer() {
  const { getTotalItems, getTotal, clearCart } = useCartStore(); // ✅ 加上 getTotal 和 clearCart
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState("cart");
  const [orderNumber, setOrderNumber] = useState(null); // ✅ 加上訂單編號
  const [orderData, setOrderData] = useState({
    name: "",
    orderType: "dine-in",
    tableNumber: "",
    phone: "",
    address: "",
    notes: "",
  });

  // 登入後恢復結帳流程
  useEffect(() => {
    const checkoutInProgress = localStorage.getItem('checkout-in-progress');
    if (user && checkoutInProgress === 'true') {
      setOrderData((prev) => ({
        ...prev,
        name: user.displayName || user.email || "",
      }));
      setDrawerStep('order-form');
      localStorage.removeItem('checkout-in-progress');
      toast.success('登入成功！請繼續填寫訂單資料');
    }
  }, [user]);

  // ✅ 當 Drawer 關閉時，重置步驟到購物車
  useEffect(() => {
    if (!isOpen) {
      // Drawer 關閉後 500ms 再重置，避免看到切換動畫
      const timer = setTimeout(() => {
        setDrawerStep('cart');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ✅ 生成訂單編號
  const generateOrderNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0,10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${dateStr}${random}`;
  };

  // ✅ 送出訂單的函數
  const handleSubmitOrder = () => {
    const newOrderNumber = generateOrderNumber();
    
    // TODO: 之後會連接 Supabase
    console.log('📦 訂單資料:', {
      orderNumber: newOrderNumber,
      user_id: user.id,
      ...orderData,
      total: getTotal(),
    });
    
    setOrderNumber(newOrderNumber);
    clearCart(); // ✅ 送出訂單後立刻清空購物車
    toast.success('訂單送出成功！');
    setDrawerStep('success');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative w-14 h-14 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors">
          <ShoppingCart className="h-8 w-8" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              {getTotalItems()}
            </Badge>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl">
            {drawerStep === "cart" && `購物車 (${getTotalItems()} 件商品)`}
            {drawerStep === "login-required" && "請先登入"}
            {drawerStep === "order-form" && "填寫訂單資料"}
            {drawerStep === "success" && "訂單完成"}
          </SheetTitle>
        </SheetHeader>

        {drawerStep === "cart" && (
          <CartList onConfirm={() => {
            if (!user) {
              setDrawerStep("login-required");
            } else {
              setOrderData(prev => ({ ...prev, name: user.displayName || user.email || "" }));
              setDrawerStep("order-form");
            }
          }} />
        )}

        {drawerStep === "login-required" && (
          <LoginPrompt onBack={() => setDrawerStep("cart")} />
        )}

        {drawerStep === "order-form" && (
          <OrderForm
            orderData={orderData}
            setOrderData={setOrderData}
            onBack={() => setDrawerStep("cart")}
            onSubmit={handleSubmitOrder} // ✅ 改成呼叫 handleSubmitOrder
          />
        )}

       {drawerStep === "success" && (
          <OrderSuccess 
            orderNumber={orderNumber}
            onClose={() => {
              setIsOpen(false); // ✅ 關閉 Drawer
              window.scrollTo({ top: 0, behavior: 'smooth' }); // 滾動到頂部
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}