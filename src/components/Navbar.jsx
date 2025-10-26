import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { SiLine } from "react-icons/si"


function Navbar() {
  return (
    // 外層：全寬背景 + sticky
    <nav className="w-full h-[100px] bg-[#EFEDD9] sticky top-0 z-50">
      
      {/* 內容器：限制寬度1400px，居中對齊 */}
      <div className="max-w-[1400px] h-full mx-auto px-5 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="w-20 h-20 mt-2 border-4 border-[#FFFFFF] rounded-lg shadow-md">
          <img src="/logo.png" alt="笑忘咖啡" className="w-full h-full object-contain" />
        </a>

        {/* 跳轉項 */}
        <div className="flex gap-[75px] mt-2 z-99">
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
            href="#beans" 
            className="font-bold text-xl hover:opacity-70 transition-opacity"
          >
            經典豆單
          </a>
        </div>

        {/* 按鈕組 */}
        <div className="flex items-center gap-6 mt-2">
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
      </div>
    </nav>
  )
}

export default Navbar