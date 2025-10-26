// src/components/Coffee.jsx
import { useState } from "react";
import DrinkCard from "./DrinkCard";

function Coffee() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const products = [
    {
      image: "/herbtea.webp",
      title: "笑忘果茶",
      price: "170",
      ingredient: "有機嚴選花果茶",
    },
    {
      image: "/latte.webp",
      title: "笑忘拿鐵",
      price: "180",
      ingredients: ["小農鮮乳", "笑忘配方豆"],
    },
    {
      image: "/americano.webp",
      title: "天天好美式",
      price: "150",
      ingredient: "笑忘配方豆",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  const getVisibleProducts = () => {
    const prevIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === products.length - 1 ? 0 : currentIndex + 1;

    return [
      { ...products[prevIndex], index: prevIndex, position: "left" },
      { ...products[currentIndex], index: currentIndex, position: "center" },
      { ...products[nextIndex], index: nextIndex, position: "right" },
    ];
  };

  const visibleProducts = getVisibleProducts();

  return (
    <section id="coffee" className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]">
      {/* 主要內容區 */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5">
        {/* 標題區 */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 mb-4">
            <img
              src="/coffeebean.png"
              alt="咖啡豆圖標"
              className="w-full h-full object-contain"
            />
          </div>

          <h2
            className="font-bold"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: "36px",
              color: "#000000",
              letterSpacing: "0.15em",
              WebkitTextStroke: "5px #FFFFFF",
              paintOrder: "stroke fill",
            }}
          >
            咖啡飲品
          </h2>
        </div>

        {/* 產品卡片區 */}
        <div className="relative flex items-center justify-center">
          {/* 左箭頭 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            style={{
              border: "3px solid #5A3211",
            }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="#5A3211"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 產品卡片容器 */}
          <div className="flex items-end justify-center gap-12 px-16">
            {visibleProducts.map((product, idx) => (
              <DrinkCard
                key={`${product.id}-${product.position}`}
                image={product.image}
                title={product.title}
                price={product.price}
                ingredient={product.ingredient}
                ingredients={product.ingredients}
                isCenter={product.position === "center"}
              />
            ))}
          </div>

          {/* 右箭頭 */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            style={{
              border: "3px solid #5A3211",
            }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="#5A3211"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 加入清單按鈕 */}
        <div className="flex justify-center mt-12">
          <button
            className="px-12 py-3 text-white font-bold rounded-full hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#5A3211",
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: "20px",
              letterSpacing: "0.1em",
              border: "2px solid #FFFFFF",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            加入清單
          </button>
        </div>
      </div>
      {/* 底圖 */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div className="max-w-[1400px] mx-auto">
          <img
            src="/cut.webp"
            alt="底圖"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Coffee;
