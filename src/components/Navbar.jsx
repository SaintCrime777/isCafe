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
} from "@/components/ui/dialog"

function Navbar() {
  // 搜尋相關 state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);//彈出維修別忘了
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

        <div className="flex gap-[75px] mt-2">
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

        {/* 按鈕組 */}
        <div className="flex items-center gap-6 mt-2">
          {/* 搜尋 */}
          <div className="relative" ref={searchInputRef}>
            {/* 展開的搜尋框 */}
            {isSearchOpen && (
              <div className="absolute right-0 top-0 flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-4 py-2 shadow-lg animate-in slide-in-from-right duration-200">
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

          {/* 購物車 - 直接使用 CartDrawer，不要再包 Button！ */}
          <CartDrawer className="w-8 h-8" />

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
          
          <Button 
            onClick={() => setShowComingSoon(false)}
            className="w-full"
          >
            知道了
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default Navbar;
