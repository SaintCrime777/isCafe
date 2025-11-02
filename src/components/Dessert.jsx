// src/components/Dessert.jsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DessertCard from "./DessertCard";
import { useCartStore } from "@/stores/useCartStore";
import { useSwipeable } from "react-swipeable"; //RWD-mobile

function Dessert() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [products, setProducts] = useState([]); // ✅ 改成動態資料
  const [loading, setLoading] = useState(true); // ✅ 加上 loading
  const addItem = useCartStore((state) => state.addItem);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ 從 Supabase 抓取甜點商品
  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", "dessert") // ✅ 只抓甜點類
          .order("created_at", { ascending: true });

        if (error) {
          console.error("❌ 抓取甜點商品失敗:", error);
        } else {
          console.log("✅ 從 Supabase 抓到的甜點:", data);
          setProducts(data || []);
        }
      } catch (error) {
        console.error("❌ 發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesserts();
  }, []);

  //RWD-mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 根據不同載具有不同呈現
  const getVisibleProducts = () => {
    if (products.length === 0) return [];

    const visible = [];
    const count = isMobile ? 1 : 4; //手機卡片1張

    for (let i = 0; i < count; i++) {
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

  //左右滑動
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 50,
  });

  const visibleProducts = getVisibleProducts();

  // ✅ Loading 狀態
  if (loading) {
    return (
      <section
        id="dessert"
        className="relative w-full bg-[#EFEDD9] py-20 overflow-x-hidden scroll-mt-[100px]"
      >
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">載入甜點商品中...</p>
        </div>
      </section>
    );
  }

  // ✅ 無商品狀態
  if (products.length === 0) {
    return (
      <section
        id="dessert"
        className="relative w-full bg-[#EFEDD9] py-20 overflow-x-hidden scroll-mt-[100px]"
      >
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">目前沒有甜點商品</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="dessert"
      className="relative w-full bg-[#EFEDD9] py-20 overflow-x-hidden scroll-mt-[100px]"
      {...handlers}
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
              letterSpacing: "0.25em",
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
            className={`absolute z-20 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors
              ${
                isMobile
                  ? "w-12 h-12 left-2" 
                  : "w-16 h-16 left-0"
              }
            `}
            style={{ border: "3px solid #5A3211" }}
          >
            <svg
              className={isMobile ? "w-6 h-6" : "w-8 h-8"}
              fill="none"
              stroke="#5A3211"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 卡片容器 */}
          <div
            className={`flex items-end justify-center transition-all duration-200 ease-in-out
            ${isMobile ? "w-full" : "gap-6 px-20"}`}
          >
            {visibleProducts.map((product) => (
              <DessertCard
                key={product.id}
                product={product} // ✅ 傳整個 product 物件
                isSelected={product.index === selectedProductIndex}
                onClick={() => setSelectedProductIndex(product.index)}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* 右箭頭 */}
          <button
            onClick={handleNext}
            className={`absolute z-20 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors
              ${
                isMobile
                  ? "w-12 h-12 right-2" 
                  : "w-16 h-16 right-0"
              }
            `}
            style={{ border: "3px solid #5A3211" }}
          >
            <svg
              className={isMobile ? "w-6 h-6" : "w-8 h-8"}
              fill="none"
              stroke="#5A3211"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 指示器 */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-8 mb-6">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  setSelectedProductIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  idx === selectedIndex
                    ? "bg-[#5A3211] w-8"
                    : "bg-gray-300 w-2.5"
                }`}
              />
            ))}
          </div>
        )}

        {/* 加入清單按鈕 */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              // 檢查是否有選中的商品
              if (selectedProductIndex === null) {
                alert("請先點選一個甜點！");
                return;
              }

              // 取得選中的商品
              const selectedProduct = products[selectedProductIndex];

              // ✅ 使用正確的欄位名稱
              addItem({
                id: selectedProduct.id, // ✅ 直接用 UUID
                name: selectedProduct.name, // ✅ 不是 title
                price: selectedProduct.price, // ✅ 已經是數字
                image_url: selectedProduct.image_url, // ✅ 不是 image
                description: selectedProduct.description || "",
                quantity: 1,
              });

              alert(`${selectedProduct.name} 已加入購物車！`);
              setSelectedProductIndex(null);
            }}
            className="px-12 py-3 text-white font-bold rounded-full hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#5A3211",
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? "18px" : "20px",
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
        className="absolute top-1/2 left-0 transform -translate-y-1/2 pointer-events-none w-full"
        style={{ zIndex: 0 }}
      >
        <img
          src="/dessertbg.jpg"
          alt="底圖"
          className={`w-full object-cover opacity-90 ${
            isMobile ? "h-[600px]" : "h-[600px]"
          }`}
        />
      </div>
    </section>
  );
}

export default Dessert;
