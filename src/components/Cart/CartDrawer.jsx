// src/components/Cart/CartDrawer.jsx
import { useState, useEffect } from "react"; // ✅ 加這行
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getTotalItems,
    clearCart,
  } = useCartStore();

  // ✅ 從 useAuthStore 取得 user
  const { user } = useAuthStore();

  const [drawerStep, setDrawerStep] = useState("cart");
  const [orderData, setOrderData] = useState({
    name: "",
    orderType: "dine-in",
    tableNumber: "",
    phone: "",
    address: "",
    notes: "",
  });

  //刪除至0
  const handleDecreaseQuantity = (itemId, currentQuantity, itemName) => {
    if (currentQuantity === 1) {
      if (confirm(`確定要刪除「${itemName}」嗎？`)) {
        removeItem(itemId);
      }
    } else {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  // 確認購物車按鈕
  const handleConfirmCart = () => {
    // ✅ 直接用 user 檢查
    if (!user) {
      setDrawerStep("login-required");
    } else {
      // 自動帶入使用者名稱
      setOrderData((prev) => ({
        ...prev,
        name: user.displayName || user.email || "",
      }));
      setDrawerStep("order-form");
    }
  };

  // ✅ 返回購物車
  const handleBackToCart = () => {
    setDrawerStep("cart");
  };

  // ✅ 監聽登入成功後的自動恢復
  useEffect(() => {
    const checkoutInProgress = localStorage.getItem("checkout-in-progress");

    if (user && checkoutInProgress === "true") {
      // 登入成功且之前正在結帳
      setOrderData((prev) => ({
        ...prev,
        name: user.displayName || user.email || "",
      }));
      setDrawerStep("order-form");
      localStorage.removeItem("checkout-in-progress");
      toast.success("登入成功！請繼續填寫訂單資料");
    }
  }, [user]);

  // ✅ 加這個函數：Google 登入
  const handleGoogleLogin = async () => {
    try {
      // ✅ 記錄正在結帳
      localStorage.setItem("checkout-in-progress", "true");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin, // 登入後回到當前頁面
        },
      });

      if (error) {
        toast.error("登入失敗：" + error.message);
      } else {
        toast.success("正在跳轉到 Google 登入...");
      }
    } catch (error) {
      toast.error("登入發生錯誤");
      console.error("登入錯誤:", error);
    }
  };

  // ✅ 送出訂單
  const handleSubmitOrder = async () => {
    // 驗證必填欄位
    if (!orderData.name.trim()) {
      toast.error("請輸入姓名");
      return;
    }

    if (orderData.orderType === "dine-in" && !orderData.tableNumber) {
      toast.error("請選擇桌號");
      return;
    }

    // TODO: 送到 Supabase
    console.log("📦 訂單資料:", {
      user_id: user.id,
      ...orderData,
      items: items,
      total: getTotal(),
    });

    toast.success("訂單送出成功！（開發中）");

    // 暫時先跳到成功頁面
    setDrawerStep("success");
  };

  return (
    <Sheet>
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

      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">
            {/* ✅ 根據步驟顯示不同標題 */}
            {drawerStep === "cart" && `購物車 (${getTotalItems()} 件商品)`}
            {drawerStep === "login-required" && "請先登入"}
            {drawerStep === "order-form" && "填寫訂單資料"}
            {drawerStep === "success" && "訂單完成"}
          </SheetTitle>
        </SheetHeader>

        {/* ✅ 步驟 1: 購物車列表 */}
        {drawerStep === "cart" && (
          <>
            {/* 購物車項目列表 */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingCart className="h-16 w-16 mb-4" />
                  <p className="text-lg">購物車是空的</p>
                  <p className="text-sm">快去挑選喜歡的咖啡吧！</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                  >
                    {/* 商品圖片 */}
                    <img
                      src={item.image_url || "/placeholder-coffee.jpg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />

                    {/* 商品資訊 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-sm font-medium text-gray-700 mt-1">
                          NT$ {item.price}
                        </p>
                      </div>

                      {/* 數量控制 */}
                      <div className="flex items-center gap-3 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            handleDecreaseQuantity(
                              item.id,
                              item.quantity,
                              item.name
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            if (confirm(`確定要刪除「${item.name}」嗎？`)) {
                              removeItem(item.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* 小計 */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="font-bold text-lg">
                        NT$ {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 結帳區塊 */}
            {items.length > 0 && (
              <div className="border-t pt-4 space-y-4 mt-auto">
                {/* 總計 */}
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>總計</span>
                  <span className="text-2xl">NT$ {getTotal()}</span>
                </div>

                {/* ✅ 結帳按鈕改用 handleConfirmCart */}
                <Button
                  className="w-full h-12 text-lg"
                  size="lg"
                  onClick={handleConfirmCart}
                >
                  確認商品
                </Button>

                {/* 清空購物車按鈕 */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (confirm("確定要清空購物車嗎？")) {
                      clearCart();
                    }
                  }}
                >
                  清空購物車
                </Button>
              </div>
            )}
          </>
        )}

        {/* ✅ 步驟 2: 登入提示 */}
        {drawerStep === "login-required" && (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
            <div className="text-6xl">🔐</div>
            <h3 className="text-2xl font-bold text-center">請先登入會員</h3>
            <div className="text-center text-gray-600 space-y-2">
              <p>登入後即可：</p>
              <ul className="text-left space-y-1">
                <li>✓ 送出訂單</li>
                <li>✓ 查詢訂單記錄</li>
                <li>✓ 享會員優惠</li>
              </ul>
            </div>

            <Button
              className="w-full h-12 text-lg"
              size="lg"
              onClick={handleGoogleLogin}
            >
              使用 Google 登入
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleBackToCart}
            >
              ← 返回購物車
            </Button>
          </div>
        )}

        {/* ✅ 步驟 3: 訂單資料表單 */}
        {drawerStep === "order-form" && (
          <div className="flex flex-col h-full">
            {/* 表單內容 */}
            <div className="flex-1 overflow-y-auto py-6 px-2 space-y-6">
              {/* 姓名 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  姓名/暱稱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderData.name}
                  onChange={(e) =>
                    setOrderData({ ...orderData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="請輸入您的姓名"
                />
              </div>

              {/* 訂單類型 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  訂單類型 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="orderType"
                      value="dine-in"
                      checked={orderData.orderType === "dine-in"}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          orderType: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span>內用</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="orderType"
                      value="takeout"
                      checked={orderData.orderType === "takeout"}
                      onChange={(e) =>
                        setOrderData({
                          ...orderData,
                          orderType: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span>外帶</span>
                  </label>
                </div>
              </div>

              {/* 桌號（內用才顯示） */}
              {orderData.orderType === "dine-in" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    桌號 <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={orderData.tableNumber}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        tableNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">請選擇桌號</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} 號桌
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 配送地址（外帶才顯示） */}
              {orderData.orderType === "takeout" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    配送地址（選填）
                  </label>
                  <input
                    type="text"
                    value={orderData.address}
                    onChange={(e) =>
                      setOrderData({ ...orderData, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="請輸入配送地址（外帶自取可不填）"
                  />
                </div>
              )}

              {/* 電話 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">聯絡電話（選填）</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) =>
                    setOrderData({ ...orderData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0912-345-678"
                />
              </div>

              {/* 備註 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">備註（選填）</label>
                <textarea
                  value={orderData.notes}
                  onChange={(e) =>
                    setOrderData({ ...orderData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="特殊需求或備註事項..."
                />
              </div>

              {/* 訂單摘要 */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">
                  訂單摘要
                </h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">商品數量</span>
                  <span className="font-medium">{getTotalItems()} 件</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>總計</span>
                  <span className="text-primary">NT$ {getTotal()}</span>
                </div>
              </div>
            </div>

            {/* 底部按鈕 */}
            <div className="border-t pt-4 space-y-3">
              <Button
                className="w-full h-12 text-lg"
                size="lg"
                onClick={handleSubmitOrder}
              >
                送出訂單
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleBackToCart}
              >
                ← 返回購物車
              </Button>
            </div>
          </div>
        )}

        {/* ✅ 步驟 4: 訂單成功（先放佔位） */}
        {drawerStep === "success" && (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-bold">訂單送出成功！</h3>
            <p className="text-gray-600">訂單編號：#20251030001</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
