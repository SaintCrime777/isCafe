import { useState } from "react";
import BeanCard from "./BeanCard";
import { useCartStore } from "@/stores/useCartStore";
import { ShoppingCart } from "lucide-react";

function Bean() {
  const [selectedRoast, setSelectedRoast] = useState("all");
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [productSizes, setProductSizes] = useState({});
  const addItem = useCartStore((state) => state.addItem);

  // 定義 6 個咖啡豆產品（含各自的價格）
  const products = [
    {
      id: 1,
      name: "巴拿馬藝妓",
      flavor: "茉莉花、佛手柑",
      origin: "波奎特",
      roast: "淺焙",
      image: "/bean01.webp",
      prices: {
        "100g": 350,
        "200g": 650,
        "400g": 1200,
      },
    },
    {
      id: 2,
      name: "衣索比亞耶加雪菲",
      flavor: "檸檬、藍莓",
      origin: "耶加雪菲",
      roast: "淺焙",
      image: "/bean02.webp",
      prices: {
        "100g": 250,
        "200g": 450,
        "400g": 800,
      },
    },
    {
      id: 3,
      name: "哥倫比亞卡杜拉",
      flavor: "焦糖、巧克力",
      origin: "娜玲瓏",
      roast: "中焙",
      image: "/bean03.webp",
      prices: {
        "100g": 220,
        "200g": 400,
        "400g": 750,
      },
    },
    {
      id: 4,
      name: "肯亞AA",
      flavor: "黑醋栗、葡萄柚",
      origin: "尼耶利",
      roast: "中焙",
      image: "/bean04.webp",
      prices: {
        "100g": 280,
        "200g": 520,
        "400g": 950,
      },
    },
    {
      id: 5,
      name: "瓜地馬拉安提瓜",
      flavor: "堅果、可可",
      origin: "安提瓜",
      roast: "深焙",
      image: "/bean05.webp",
      prices: {
        "100g": 230,
        "200g": 420,
        "400g": 780,
      },
    },
    {
      id: 6,
      name: "哥斯大黎加塔拉珠",
      flavor: "蜂蜜、柑橘",
      origin: "塔拉珠",
      roast: "深焙",
      image: "/bean06.webp",
      prices: {
        "100g": 240,
        "200g": 440,
        "400g": 820,
      },
    },
  ];

  // 根據焙度篩選產品
  const filteredProducts =
    selectedRoast === "all"
      ? products
      : products.filter((p) => p.roast === selectedRoast);

  // 切換焙度時重置選擇
  const handleRoastChange = (roast) => {
    setSelectedRoast(roast);
    setSelectedProductIndex(null); // 重置選擇
  };

  // 處理規格變更
  const handleSizeChange = (productId, size) => {
    setProductSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  return (
    <section
      id="bean"
      className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]"
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
            咖啡豆專區
          </h2>
        </div>

        {/* 焙度篩選按鈕 */}
        <div className="flex justify-center gap-4 mb-12">
          {["all", "淺焙", "中焙", "深焙"].map((roast) => (
            <button
              key={roast}
              onClick={() => handleRoastChange(roast)}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedRoast === roast
                  ? "bg-[#5A3211] text-white scale-105"
                  : "bg-[#D4C5A9] text-[#5A3211] hover:bg-[#C4B599]"
              }`}
              style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                border:
                  selectedRoast === roast
                    ? "3px solid #FFFFFF"
                    : "2px solid #5A3211",
              }}
            >
              {roast === "all" ? "全部" : roast}
            </button>
          ))}
        </div>

        {/* 產品卡片網格 - 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto mb-12">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductIndex(index)}
            >
              <BeanCard
                product={product}
                isSelected={index === selectedProductIndex}
                selectedWeight={productSizes[product.id] || "100g"} 
                onWeightChange={(weight) =>
                  handleSizeChange(product.id, weight)
                } 
              />
            </div>
          ))}
        </div>

        {/* 加入清單按鈕 */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              // 檢查是否有選中商品
              if (selectedProductIndex === null) {
                alert("請先點選一個咖啡豆！");
                return;
              }

              // 取得選中的商品
              const selectedProduct = filteredProducts[selectedProductIndex];

              // 取得選中規格的價格
              const selectedSize = productSizes[selectedProduct.id] || '100g';
              const price = selectedProduct.prices[selectedSize];

              // 加入購物車
              addItem({
                id: `${selectedProduct.id}-${selectedSize}`, // ID 包含規格
                name: `${selectedProduct.name} (${selectedSize})`, // 名稱包含規格
                price: price,
                image_url: selectedProduct.image,
                description: `${selectedProduct.flavor} | ${selectedProduct.origin} | ${selectedProduct.roast}`,
              });

              // 提示訊息
              alert(`${selectedProduct.name} (${selectedSize}) 已加入購物車！`);

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
    </section>
  );
}

export default Bean;
