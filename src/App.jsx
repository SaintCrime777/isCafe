import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Coffee from "./components/Coffee";
import Dessert from "./components/Dessert";
import Bean from "./components/Bean";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import { supabase } from "@/lib/supabase"; // ✅ 確認你的路徑
import { useAuthStore } from "@/stores/useAuthStore"; // ✅ 加這行
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true); // ✅ 控制開場

  // 只在第一次顯示
  // useEffect(() => {
  //   const hasVisited = sessionStorage.getItem("hasVisited");
  //   if (hasVisited) {
  //     setShowSplash(false);
  //   }
  // }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasVisited", "true"); // ✅ 紀錄訪問
  };

  // ✅ 加這段：監聽 Supabase 登入狀態
  useEffect(() => {
    // 初始化：檢查當前登入狀態
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        useAuthStore.getState().login({
          id: session.user.id,
          email: session.user.email,
          displayName:
            session.user.user_metadata?.full_name || session.user.email,
          avatar: session.user.user_metadata?.avatar_url,
        });
      }
    });

    // 監聽登入狀態變化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔐 Auth 狀態變化:", event, session?.user); // 除錯用

      if (session?.user) {
        // 登入成功：存到 Zustand
        useAuthStore.getState().login({
          id: session.user.id,
          email: session.user.email,
          displayName:
            session.user.user_metadata?.full_name || session.user.email,
          avatar: session.user.user_metadata?.avatar_url,
        });
      } else {
        // 登出：清空 Zustand
        useAuthStore.getState().logout();
      }
    });

    // 清理函數
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Toaster position="top-center" richColors />
      <Navbar />
      <Hero />
      <Coffee />
      <Dessert />
      <Bean />
      <Footer />
    </>
  );
}

export default App;
