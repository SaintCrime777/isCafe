import { useState } from "react";
import DessertCard from "./DessertCard";
import { useCartStore } from "@/stores/useCartStore";

function Dessert() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  const products = [
    {
      id: 1,
      image: "/tisu.webp",
      title: "笑忘提酥",
      description: "沒有慾望煩惱是一口甜蜜法消化的，如果有就兩口！",
      price: "220",
    },
    {
      id: 2,
      image: "/brownie.webp",
      title: "阿布朗尼想",
      description: "濃郁瑞士蓮巧克力，外酥內軟的口感，幸福！",
      price: "150",
    },
    {
      id: 3,
      image: "/basque.webp",
      title: "焦糖巴斯克",
      description: "入口即化，淡淡奶香，一口咬下，人生無他",
      price: "175",
    },
    {
      id: 4,
      image: "/canele.webp",
      title: "可可麗露",
      description: "雙倍的天使之鈴交響樂",
      price: "90",
    },
    {
      id: 5,
      image: "/crepe.webp",
      title: "可可麗餅",
      description: "C'est parfait!",
      price: "220",
    },
    {
      id: 6,
      image: "/cookie.webp",
      title: "心太軟餅乾",
      description: "還不趕緊帶走送給心儀的對象",
      price: "120",
    },
  ];

  // 計算要顯示的 4 張卡片（循環顯示）
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push({
        ...products[(selectedIndex + i) % products.length],
        index: (selectedIndex + i) % products.length,
      });
    }
    return visible;
  };

  // 往左選
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  // 往右選
  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % products.length);
  };

  //  // 加入清單
  // const handleAddToCart = () => {
  //   if (selectedProductIndex === null) {
  //     alert('請先選擇一個甜點！');
  //     return;
  //   }
  //   const selectedProduct = products[selectedProductIndex];
  //   alert(`已加入：${selectedProduct.title} - $${selectedProduct.price}`);
  // };

  const visibleProducts = getVisibleProducts();

  return (
    <section
      id="dessert"
      className="relative w-full bg-[#EFEDD9] py-20 overflow-x-hidden scroll-mt-[100px]"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5">
        {/* 標題區 */}
        <div className="flex flex-col items-center mt-[-20px] mb-12">
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
            輕食甜點
          </h2>
        </div>

        {/* 產品卡片區 */}
        <div className="relative flex items-center justify-center">
          {/* 左箭頭 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            style={{ border: "3px solid #5A3211" }}
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

          {/* 卡片容器 */}
          <div className="flex items-end justify-center gap-6 px-20 transition-all duration-200 ease-in-out">
            {visibleProducts.map((product) => (
              <DessertCard
                key={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                isSelected={product.index === selectedProductIndex}
                onClick={() => setSelectedProductIndex(product.index)}
              />
            ))}
          </div>

          {/* 右箭頭 */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            style={{ border: "3px solid #5A3211" }}
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
            //supabase
            onClick={() => {
              // 檢查是否有選中的商品
              if (selectedProductIndex === null) {
                alert("請先點選一個甜點！");
                return;
              }

              // 取得當前中間顯示的商品
              const selectedProduct = products[selectedProductIndex];//index 是「找」商品，id 是「認」商品！
              // console.log('🍰 Dessert addItem 傳入:', {
              //   id: selectedProduct.id.toString(),
              //   name: selectedProduct.title,
              //   // ... 其他欄位
              // });
              // 加入購物車
              addItem({
                id: `dessert-${selectedProduct.id}`, // 轉成字串
                name: selectedProduct.title,
                price: parseInt(selectedProduct.price),
                image_url: selectedProduct.image,
                description: selectedProduct.description || " ",
                quantity: 1,
              });

              // 提示訊息
              alert(`${selectedProduct.title} 已加入購物車！`);

              // 清除選取狀態（選擇性）
              setSelectedProductIndex(null);
            }}
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <img
          src="/dessertbg.jpg"
          alt="底圖"
          className="w-[800px] h-[600px] object-cover opacity-90"
        />
      </div>
    </section>
  );
}

export default Dessert;
