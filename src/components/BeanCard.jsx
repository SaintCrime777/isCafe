// src/components/BeanCard.jsx
import { useState } from 'react';

const BeanCard = ({ product, isSelected, selectedWeight, onWeightChange }) => {
  
  // ✅ 從 product.prices (JSON) 取得可用的重量選項
  const availableWeights = product.prices ? Object.keys(product.prices) : ['100g'];

  return (
    <div 
      className={`
        relative w-full bg-white rounded-3xl overflow-hidden cursor-pointer
        transition-all duration-300 ease-out
        ${isSelected 
          ? 'ring-[6px] ring-[#1E953E] shadow-2xl scale-105' 
          : 'ring-2 ring-[#5A3211] shadow-lg hover:shadow-xl hover:scale-102'}
      `}
    >
      {/* 圖片區域 */}
      <div className="relative h-[200px] bg-[#4A4A4A] overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}  
          className="w-full h-full object-cover"
        />
      </div>

      {/* 資訊區域 */}
      <div className="bg-[#EFEDD9] px-6 pt-6 pb-8">
        {/* 產品名稱 */}
        <h3 
          className="text-2xl font-bold text-black text-center mb-3"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            WebkitTextStroke: "4px #FFFFFF",
            paintOrder: "stroke fill"
          }}
        >
          {product.name} 
        </h3>

        {/* 風味描述 */}
        <p 
          className="text-sm font-bold text-black text-center mb-4 leading-relaxed"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            letterSpacing: "0.05em"
          }}
        >
          {product.description} 
        </p>

        {/* 重量選擇下拉 */}
        <div className="relative mb-3">
          <select
            value={selectedWeight}
            onChange={(e) => {
              e.stopPropagation();
              onWeightChange(e.target.value);
            }}
            className="w-full px-4 py-2 bg-white border-2 border-[#5A3211] rounded-lg appearance-none cursor-pointer font-bold text-black text-center"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {availableWeights.map(weight => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
          {/* 下拉箭頭 */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-[#5A3211]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* 價格顯示 */}
        <div className="text-center mb-4">
          <span 
            className="text-2xl font-bold text-[#ED6C30]"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif"
            }}
          >
            NT$ {product.prices?.[selectedWeight] || product.price}  
          </span>
        </div>

        {/* 產地（如果有的話） */}
        {product.origin && (
          <p 
            className="text-right text-sm font-bold text-black"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif"
            }}
          >
            產地 - {product.origin}
          </p>
        )}
      </div>
    </div>
  );
};

export default BeanCard;