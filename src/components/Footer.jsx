import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <footer className="w-full bg-[#D9D9D9]">
      <div className="max-w-[1440px] h-[512px] mx-auto px-5 lg:px-12 flex flex-col justify-between py-12">
        
        {/* 上方 - 社群圖示 */}
        <div className="flex gap-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook alt="Facebook" style={{color: '#5A3211'}} className="w-8 h-8"/>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram alt="Instagram" className="w-8 h-8" style={{color: '#5A3211'}} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter alt="X (Twitter)" className="w-8 h-8" style={{color: '#5A3211'}} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube alt="YouTube" className="w-8 h-8" style={{color: '#5A3211'}} />
          </a>
        </div>
{/* 分隔線 */}
    <div className="w-full h-[4px] bg-white mt-2" />
        {/* 中段 */}
        <div className="flex items-center justify-between gap-12 flex-1">
          {/* 左側 - 公司資訊 */}
          <div 
            className="space-y-2"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '20px',
              lineHeight: '1.5',
              letterSpacing: '0.2em',
              color: '#000000'
            }}
          >
            <p>是個咖有限公司</p>
            <p>聯繫信箱｜iscafe@mail.com</p>
            <p>統一編號｜87654321</p>
            <p>營業時間｜週一至週五10:00-18:00</p>
            <p>公司地址｜台北市市府路1號1樓</p>
          </div>

          {/* 右側 - Logo */}
          <div className="w-80 h-80 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="笑忘咖啡 Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 下段 - 連結與版權 */}
        <div className="space-y-2">
          {/* 連結列 */}
          <div 
            className="text-center"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '14px',
              lineHeight: 'auto',
              letterSpacing: '0.2em',
              color: '#000000'
            }}
          >
            網站地圖｜個人資料保護政策｜聯絡我們:02-23456789(週一至週六9:30~17:30)
          </div>

          {/* Copyright */}
          <p 
            className="text-center"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: '12px',
              lineHeight: 'auto',
              letterSpacing: '0.2em',
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