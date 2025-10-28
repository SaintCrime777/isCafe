import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { SiLine } from "react-icons/si"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#EFEDD9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#EFEDD9]/75">
      <div className="max-w-[1400px] h-[100px] mx-auto px-5 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="w-20 h-20 mt-2 border-4 border-white/80 rounded-lg shadow-md backdrop-blur-sm">
          <img src="/logo.png" alt="笑忘咖啡" className="w-full h-full object-contain" />
        </a>

        {/* 導航 - 保持置中 */}
        <div className="flex gap-[75px] mt-2">
          <a 
            href="#brand" 
            className="font-bold text-xl hover:opacity-70 transition-opacity text-[#3D3D3D]"
          >
            品牌理念
          </a>
          <a 
            href="#coffee" 
            className="font-bold text-xl hover:opacity-70 transition-opacity text-[#3D3D3D]"
          >
            咖啡飲品
          </a>
          <a 
            href="#dessert" 
            className="font-bold text-xl hover:opacity-70 transition-opacity text-[#3D3D3D]"
          >
            輕食甜點
          </a>
          <a 
            href="#bean" 
            className="font-bold text-xl hover:opacity-70 transition-opacity text-[#3D3D3D]"
          >
            咖啡豆專區
          </a>
        </div>

        {/* 按鈕組 */}
        <div className="flex items-center gap-6 mt-2">
          <Button variant="ghost" size="iconLg">
            <Search className="h-8 w-8" />
          </Button>
          
          <Button variant="ghost" size="iconLg">
            <ShoppingCart className="h-8 w-8" />
          </Button>

          <Button 
            className="bg-[#1E943D] hover:bg-[#167A30] text-white rounded-full px-4 shadow-md"
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