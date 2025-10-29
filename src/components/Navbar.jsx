// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { SiLine } from "react-icons/si";
import CartDrawer from "./Cart/CartDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, User } from "lucide-react";

function Navbar() {
  //OAuth
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  // 搜尋相關 state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false); //彈出維修別忘了
  const searchInputRef = useRef(null);

  // 點擊外部關閉搜尋框
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // 處理 Enter 按鍵
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      setShowComingSoon(true);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#EFEDD9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#EFEDD9]/60">
        <div className="max-w-[1400px] h-[100px] mx-auto px-5 flex items-center justify-between">
          {/* 打包LOGO跟區塊 */}
          <div className="flex items-center gap-12">
            <a
              href="#"
              className="w-20 h-20 mt-2 border-4 border-white/80 rounded-lg shadow-md"
            >
              <img
                src="/logo.png"
                alt="笑忘咖啡"
                className="w-full h-full object-contain"
              />
            </a>

            <div className="flex gap-16 mt-2">
              <a
                href="#brand"
                className="font-bold text-xl hover:opacity-70 transition-opacity"
              >
                品牌理念
              </a>
              <a
                href="#coffee"
                className="font-bold text-xl hover:opacity-70 transition-opacity"
              >
                咖啡飲品
              </a>
              <a
                href="#dessert"
                className="font-bold text-xl hover:opacity-70 transition-opacity"
              >
                輕食甜點
              </a>
              <a
                href="#bean"
                className="font-bold text-xl hover:opacity-70 transition-opacity"
              >
                咖啡豆專區
              </a>
            </div>
          </div>

          {/* 按鈕組 */}
          <div className="flex items-center gap-4 mt-2">
            {/* 搜尋 */}
            <div className="relative" ref={searchInputRef}>
              {/* 展開的搜尋框 - 調整位置避免遮擋 */}
              {isSearchOpen && (
                <div className="absolute right-0 top-0 flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-4 py-2 shadow-lg animate-in slide-in-from-right duration-200 z-50">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋商品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-36 outline-none text-gray-700 placeholder:text-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* 搜尋 Icon 按鈕 */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${
                  isSearchOpen ? "invisible" : "visible"
                }`}
              >
                <Search className="h-8 w-8" />
              </button>
            </div>

            {/* 購物車 */}
            <CartDrawer className="w-8 h-8" />

            {/* 登入、登出按鈕 - 統一樣式 */}
            {!loading && (
              <>
                {user ? (
                  // 已登入 - 顯示用戶資訊和登出按鈕
                  <div className="flex items-center gap-2">
                    {/* 用戶資訊 */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#5A3211]/10 border border-[#5A3211]/20 rounded-full">
                      <User className="h-5 w-5 text-[#5A3211]" />
                      <span className="text-sm font-medium text-[#5A3211] max-w-[120px] truncate">
                        {user.user_metadata?.full_name ||
                          user.email?.split("@")[0]}
                      </span>
                    </div>

                    {/* 登出按鈕 */}
                    <Button
                      variant="outline"
                      className="rounded-full border-[#5A3211] text-[#5A3211] hover:bg-[#5A3211] hover:text-white h-10"
                      onClick={signOut}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      登出
                    </Button>
                  </div>
                ) : (
                  // 未登入 - Google 登入按鈕（咖啡色系）
                  <Button
                    className="bg-[#5A3211] hover:bg-[#4A2810] text-white rounded-full px-6 h-12 flex items-center gap-2"
                    onClick={signInWithGoogle}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google 登入
                  </Button>
                )}
              </>
            )}

            {/* LINE */}
            <Button
              className="bg-[#1E943D] hover:bg-[#167A30] text-white rounded-full px-4 h-12"
              asChild
            >
              <a
                href="https://line.me/R/ti/p/@796bobmj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                加入笑忘
                <SiLine className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* 維修中 Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              時機到了，自有搜尋!
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center">
            <img
              src="/maintenance.webp"
              alt="維修中"
              className="w-96 h-96 object-contain mb-6"
            />

            <p className="text-gray-600 text-center mb-6">
              創建初期商品不多，請慢慢逛
            </p>

            <Button onClick={() => setShowComingSoon(false)} className="w-full">
              知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
