// src/components/Coffee.jsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DrinkCard from "./DrinkCard";
import { useCartStore } from "@/stores/useCartStore";

function Coffee() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [cardOffset, setCardOffset] = useState(400);
  const [products, setProducts] = useState([]); // ✅ 改成動態資料
  const [loading, setLoading] = useState(true); // ✅ 加上 loading
  const addItem = useCartStore((state) => state.addItem);

  // ✅ 從 Supabase 抓取咖啡商品
  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'coffee')  // ✅ 只抓咖啡類
          .order('created_at', { ascending: true });

        if (error) {
          console.error('❌ 抓取咖啡商品失敗:', error);
        } else {
          console.log('✅ 從 Supabase 抓到的咖啡:', data);
          setProducts(data || []);
        }
      } catch (error) {
        console.error('❌ 發生錯誤:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffee();
  }, []);

  // 響應式調整卡片間距
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardOffset(200);
      } else if (width < 1024) {
        setCardOffset(300);
      } else {
        setCardOffset(400);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 修正後的邏輯（左右互換）
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    
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

  const getTransformX = (position) => {
    switch (position) {
      case "left":
        return -cardOffset;
      case "center":
        return 0;
      case "right":
        return cardOffset;
      default:
        return 0;
    }
  };

  // ✅ Loading 狀態
  if (loading) {
    return (
      <section
        id="coffee"
        className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]"
      >
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">載入咖啡商品中...</p>
        </div>
      </section>
    );
  }

  // ✅ 無商品狀態
  if (products.length === 0) {
    return (
      <section
        id="coffee"
        className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]"
      >
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">目前沒有咖啡商品</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="coffee"
      className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]"
    >
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
              letterSpacing: "0.25em",
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
          <div
            className="relative w-full max-w-[1000px] mx-auto"
            style={{
              height: "700px",
              minHeight: "600px",
            }}
          >
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translateX(${getTransformX(
                    product.position
                  )}px)`,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: product.position === "center" ? 1 : 0.7,
                  zIndex: product.position === "center" ? 10 : 5,
                }}
              >
                <DrinkCard
                  product={product}  // ✅ 直接傳整個 product
                  isCenter={product.position === "center"}
                />
              </div>
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
            onClick={() => {
              const currentProduct = products[currentIndex];
              
              // ✅ 使用正確的欄位名稱
              addItem({
                id: currentProduct.id,  // ✅ 直接用 UUID
                name: currentProduct.name,  // ✅ 不是 title
                price: currentProduct.price,  // ✅ 已經是數字
                image_url: currentProduct.image_url,  // ✅ 不是 image
                description: currentProduct.description || '',
                quantity: 1,
              });

              alert(`${currentProduct.name} 已加入購物車！`);
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