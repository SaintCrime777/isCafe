// src/components/Navbar.jsx
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { SiLine } from "react-icons/si"
import CartDrawer from "./Cart/CartDrawer"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#EFEDD9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#EFEDD9]/60">
      <div className="max-w-[1400px] h-[100px] mx-auto px-5 flex items-center justify-between">
        
        <a href="#" className="w-20 h-20 mt-2 border-4 border-white/80 rounded-lg shadow-md">
          <img src="/logo.png" alt="笑忘咖啡" className="w-full h-full object-contain" />
        </a>

        <div className="flex gap-[75px] mt-2">
          <a href="#brand" className="font-bold text-xl hover:opacity-70 transition-opacity">
            品牌理念
          </a>
          <a href="#coffee" className="font-bold text-xl hover:opacity-70 transition-opacity">
            咖啡飲品
          </a>
          <a href="#dessert" className="font-bold text-xl hover:opacity-70 transition-opacity">
            輕食甜點
          </a>
          <a href="#bean" className="font-bold text-xl hover:opacity-70 transition-opacity">
            咖啡豆專區
          </a>
        </div>

        {/* 按鈕組 */}
        <div className="flex items-center gap-6 mt-2">
          {/* 搜尋 */}
           <button 
    className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
  >
    <Search className="h-8 w-8" />
  </button>
          
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
              <SiLine className="h-6 w-6"/>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar