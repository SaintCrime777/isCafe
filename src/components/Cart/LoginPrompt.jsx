// src/components/Cart/LoginPrompt.jsx
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginPrompt({ onBack }) {
  //onBack 由CartDrawer來
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

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
      {/* 登入提示內容 */}
      <div className="text-6xl">
        <img src="" alt="" />
      </div>
      <h3 className="text-2xl font-bold text-center">請先登入會員</h3>
      <div className="text-center text-gray-600 space-y-2">
        <p>登入後即可：</p>
        <ul className="text-left space-y-1">
          <li>✓ 送出訂單</li>
          <li>✓ 查詢訂單記錄</li>
          <li>✓ 享會員優惠</li>
        </ul>
      </div>
      <Button onClick={handleGoogleLogin}>使用 Google 登入</Button>
      <Button variant="outline" onClick={onBack}>
        ← 返回購物車
      </Button>
    </div>
  );
}
