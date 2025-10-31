import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

export default function OrderForm({
  orderData,
  setOrderData,
  onBack,
  onSubmit,
}) {
  const { items, getTotal, getTotalItems } = useCartStore();

  // 處理送出訂單
  const handleSubmit = () => {
    // 驗證必填欄位
    if (!orderData.name.trim()) {
      toast.error("請輸入姓名");
      return;
    }

    if (orderData.orderType === "dine-in" && !orderData.tableNumber) {
      toast.error("請選擇桌號");
      return;
    }

    // ✅ 新增：外帶的驗證
    if (orderData.orderType === "takeout") {
      if (!orderData.phone.trim()) {
        toast.error("外帶請輸入聯絡電話");
        return;
      }
      if (!orderData.paymentMethod) {
        toast.error("請選擇付款方式");
        return;
      }
    }

    // 驗證通過，呼叫父組件的 onSubmit
    onSubmit();
  };

  return (
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
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`
                flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${
                  orderData.orderType === "dine-in"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <input
                type="radio"
                name="orderType"
                value="dine-in"
                checked={orderData.orderType === "dine-in"}
                onChange={(e) =>
                  setOrderData({ ...orderData, orderType: e.target.value })
                }
                className="sr-only"
              />
              <span className="text-2xl">🍽️</span>
              <span className="font-medium">內用</span>
            </label>

            <label
              className={`
                flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                ${
                  orderData.orderType === "takeout"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <input
                type="radio"
                name="orderType"
                value="takeout"
                checked={orderData.orderType === "takeout"}
                onChange={(e) =>
                  setOrderData({ ...orderData, orderType: e.target.value })
                }
                className="sr-only"
              />
              <span className="text-2xl">🥡</span>
              <span className="font-medium">外帶</span>
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
                setOrderData({ ...orderData, tableNumber: e.target.value })
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
              配送地址<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={orderData.address}
              onChange={(e) =>
                setOrderData({ ...orderData, address: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="請輸入配送地址（外帶自取請填自取）"
            />
          </div>
        )}

        {/* 電話 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            聯絡電話
            {orderData.orderType === "takeout" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="tel"
            required={orderData.orderType === "takeout"}
            value={orderData.phone}
            onChange={(e) =>
              setOrderData({ ...orderData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={
              orderData.orderType === "takeout" ? "請輸入電話" : "選填(集點用)"
            }
          />
        </div>

        {/* ✅ 新增：付款方式（外帶才顯示） */}
        {orderData.orderType === "takeout" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              付款方式 <span className="text-red-500">*</span>
            </label>

            {/* 說明文字 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <span>💡</span>
                <span>展示版本｜實際上線將串接綠界/街口支付/PayPal等線上金流</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label
                className={`
                  flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${
                    orderData.paymentMethod === "cash"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={orderData.paymentMethod === "cash"}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="sr-only"
                />
                <span className="text-2xl">💵</span>
                <span className="font-medium">現金</span>
              </label>

              <label
                className={`
                  flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${
                    orderData.paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={orderData.paymentMethod === "card"}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="sr-only"
                />
                <span className="text-2xl">💳</span>
                <span className="font-medium">信用卡</span>
              </label>
            </div>
          </div>
        )}

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
          <h4 className="font-semibold text-sm text-gray-700">訂單摘要</h4>
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
          onClick={handleSubmit}
        >
          送出訂單
        </Button>

        <Button variant="outline" className="w-full" onClick={onBack}>
          ← 返回購物車
        </Button>
      </div>
    </div>
  );
}
