import { Button } from "@/components/ui/button";

export default function OrderSuccess({ orderNumber, onClose }) {
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

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            // TODO: 之後可以跳轉到訂單詳情頁
            alert("訂單詳情功能開發中...");
          }}
        >
          查看訂單詳情
        </Button>
      </div>
    </div>
  );
}
