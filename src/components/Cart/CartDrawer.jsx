// src/components/Cart/CartDrawer.jsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/stores/useCartStore"

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, getTotal, getTotalItems } = useCartStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative w-14 h-14 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors">
          <ShoppingCart className="h-8 w-8" />
          {getTotalItems() > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
            >
              {getTotalItems()}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl">
            購物車 ({getTotalItems()} 件商品)
          </SheetTitle>
        </SheetHeader>
        
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
                  src={item.image_url || '/placeholder-coffee.jpg'} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
                
                {/* 商品資訊 */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 line-clamp-1 line-clamp-2">
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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
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
            
            {/* 結帳按鈕 */}
            <Button 
              className="w-full h-12 text-lg"
              size="lg"
              onClick={() => alert('結帳功能即將實作！')}
            >
              前往結帳
            </Button>
            
            {/* 清空購物車按鈕 */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                if (confirm('確定要清空購物車嗎？')) {
                  useCartStore.getState().clearCart()
                }
              }}
            >
              清空購物車
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}