import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { SiLine } from "react-icons/si"


function Navbar() {
  return (
    <nav className="w-full h-[100px] bg-[#EFEDD9] flex items-center justify-between px-[71px] sticky top-0 z-50">
      {/* Logo */}
      <div className="w-20 h-20 mt-2 border-4 border-[#FFFFFF] rounded-lg shadow-md">
        <img src="/logo.png" alt="笑忘咖啡" className="w-full h-full object-contain" />
      </div>

      {/* 跳轉項 */}
      <div className="flex gap-[75px] ml-40">
        <a 
          href="#brand" 
          className="font-bold text-base hover:opacity-70 transition-opacity"
        >
          品牌理念
        </a>
        <a 
          href="#coffee" 
          className="font-bold text-base hover:opacity-70 transition-opacity"
        >
          咖啡飲品
        </a>
        <a 
          href="#dessert" 
          className="font-bold text-base hover:opacity-70 transition-opacity"
        >
          輕食甜點
        </a>
        <a 
          href="#beans" 
          className="font-bold text-base hover:opacity-70 transition-opacity"
        >
          經典豆單
        </a>
      </div>

      {/* 按鈕組 */}
      <div className="flex items-center gap-6 ml-20">
        {/* 搜尋 */}
        <Button variant="ghost" size="iconLg">
          <Search className="h-8 w-8" />
        </Button>
        
        {/* 購物車 */}
        <Button variant="ghost" size="iconLg">
          <ShoppingCart className="h-8 w-8" />
        </Button>

        {/* LINE */}
        <Button 
          className="bg-[#1E943D] hover:bg-[#167A30] text-white rounded-full px-4"
          asChild
        >
          <a 
            href="https://line.me/R/ti/p/@796bobmj" 
            target="_blank"
            rel="noopener noreferrer"
          >
            加入笑忘
            <SiLine className="h-6 w-6"/>
          </a>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar