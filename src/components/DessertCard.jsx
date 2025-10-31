// src/components/DessertCard.jsx
import React from "react";
import { IoPricetagsOutline } from "react-icons/io5";

const DessertCard = ({
  product,  // ✅ 改成接收 product 物件
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      className="relative cursor-pointer w-60 h-[416px]"
      onClick={onClick}
      style={{
        willChange: "transform, border-color, border-width",
      }}
    >
      {/* 下半部 - 資訊卡片 */}
      <div
        className={`
          absolute bottom-0
          w-60 h-[300px]
          rounded-2xl
          bg-[#FFF0DD] 
          border-2 border-[#5A3211]
          ${isSelected ? "!border-[#1E953E] !border-[4px]" : ""}
          px-5 pt-24 pb-5
          transition-[border-color,border-width,transform] duration-300 ease-out
          z-10
        `}
      >
        {/* 文字容器 */}
        <div className="mt-8 flex-1 flex flex-col items-center">
          {/* 品項名稱 */}
          <h3
            className="font-['Zen_Maru_Gothic'] font-bold text-2xl text-black tracking-wider mb-2 text-center"
            style={{
              WebkitTextStroke: "4px #FFFFFF",
              paintOrder: "stroke fill",
            }}
          >
            {product.name} 
          </h3>

          {/* 描述文字 */}
          <p className="font-['Zen_Maru_Gothic'] font-bold text-sm leading-[150%] tracking-wider text-[#5A3211] line-clamp-3 text-center">
            {product.description}  
          </p>
        </div>

        {/* 價格標籤 */}
        <div className="absolute bottom-2 right-4 flex items-center">
          <div className="relative">
            <IoPricetagsOutline className="mt-1 w-16 h-16 text-[#ED6C30] rotate-45" />
            <span
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] font-['Zen_Maru_Gothic'] font-semibold text-xl text-black"
              style={{
                WebkitTextStroke: "2px #ffffffff",
                paintOrder: "stroke fill",
              }}
            >
              {product.price}  
            </span>
          </div>
        </div>
      </div>

      {/* 上半部 - 圓形圖片區 */}
      <div className="relative flex justify-center pt-4 z-20">
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-[3px] border-white transition-all duration-300">
          <img 
            src={product.image_url}  
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default DessertCard;