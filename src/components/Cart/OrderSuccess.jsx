import { Button } from "@/components/ui/button";
import { useState } from "react";
import OrderDetailDialog from "./OrderDetailDialog";

export default function OrderSuccess({ orderNumber, onClose }) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      <div className="text-6xl">🎉</div>
      <h3 className="text-2xl font-bold">訂單送出成功！</h3>
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          訂單編號：
          <span className="font-mono font-bold text-primary">
            #{orderNumber}
          </span>
        </p>
        <p className="text-sm text-gray-500">我們已收到您的訂單，請稍候！</p>
      </div>

      {/* 按鈕區 */}
      <div className="w-full space-y-3 mt-4">
        <Button className="w-full h-12 text-lg" onClick={onClose}>
          繼續點餐
        </Button>

        <button
          onClick={() => setShowDetail(true)}
          className="w-full py-3 bg-white border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
        >
          查看訂單詳情
        </button>
        
        {/* ✅ 訂單詳情 Dialog */}
        {showDetail && (
          <OrderDetailDialog
            orderNumber={orderNumber}
            isOpen={showDetail}
            onClose={() => setShowDetail(false)}
          />
        )}
      </div>
    </div>
  );
}
