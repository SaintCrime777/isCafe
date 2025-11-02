// src/components/Footer.jsx
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="w-full bg-[#D9D9D9]">
      {/* RWD自適應 */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 flex flex-col justify-between py-8 lg:py-12">
        
        {/* 上方 - 社群圖示 */}
        <div className="flex gap-6 lg:gap-8 justify-center lg:justify-start">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-7 h-7 lg:w-8 lg:h-8" style={{color: '#5A3211'}} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-7 h-7 lg:w-8 lg:h-8" style={{color: '#5A3211'}} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="w-7 h-7 lg:w-8 lg:h-8" style={{color: '#5A3211'}} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="w-7 h-7 lg:w-8 lg:h-8" style={{color: '#5A3211'}} />
          </a>
        </div>

        {/* 分隔線 */}
        <div className="w-full h-[3px] lg:h-[4px] bg-white mt-4 lg:mt-2" />
        
        {/* ✅ 中段  */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-12 flex-1 my-6 lg:my-0">
          
          {/* mobile-LOGO先行 */}
          <div className="w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center order-1 lg:order-2">
            <img 
              src="/logo.png" 
              alt="笑忘咖啡 Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* ✅ 左側 - 公司資訊 */}
          <div 
            className="space-y-1 lg:space-y-2 text-center lg:text-left order-2 lg:order-1"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: 'clamp(14px, 3.5vw, 20px)',  
              lineHeight: '1.6',
              letterSpacing: '0.1em',
              color: '#000000'
            }}
          >
            <p className="font-semibold">是個咖有限公司</p>
            <p className="text-sm lg:text-base">聯繫信箱｜iscafe@mail.com</p>
            <p className="text-sm lg:text-base">統一編號｜87654321</p>
            <p className="text-sm lg:text-base">營業時間｜週一至週五10:00-18:00</p>
            <p className="text-sm lg:text-base">公司地址｜台北市市府路1號1樓</p>
          </div>
        </div>

        {/* ✅ 下段 - 連結與版權 */}
        <div className="space-y-3 lg:space-y-2 mt-6 lg:mt-0">
          {/*  mobile - 換行 */}
          <div 
            className="text-center flex flex-col lg:flex-row lg:justify-center gap-1 lg:gap-0"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: 'clamp(11px, 2.5vw, 14px)',  
              lineHeight: '1.5',
              letterSpacing: '0.1em',
              color: '#000000'
            }}
          >
            {/* mobile分行 */}
            <span className="block lg:inline">網站地圖｜個人資料保護政策</span>
            <span className="hidden lg:inline">｜</span>
            <span className="block lg:inline">聯絡我們:02-23456789</span>
            <span className="block lg:inline text-xs lg:text-sm">(週一至週六9:30~17:30)</span>
          </div>

          {/* Copyright */}
          <p 
            className="text-center"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: 'clamp(10px, 2vw, 12px)',  
              lineHeight: '1.5',
              letterSpacing: '0.15em',
              color: '#000000'
            }}
          >
            ©2025 Iscafe Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;