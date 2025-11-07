// src/components/Bean.jsx
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import BeanCard from "./BeanCard";
import { useCartStore } from "@/stores/useCartStore";

function Bean() {
  const [selectedRoast, setSelectedRoast] = useState("all");
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [productSizes, setProductSizes] = useState({});
  const [products, setProducts] = useState([]); // ✅ 改成動態資料
  const [loading, setLoading] = useState(true); // ✅ 加上 loading
  const addItem = useCartStore((state) => state.addItem);

  // ✅ 從 Supabase 抓取咖啡豆商品
  useEffect(() => {
    const fetchBeans = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'bean')  // ✅ 只抓咖啡豆類
          .order('created_at', { ascending: true });

        if (error) {
          console.error('❌ 抓取咖啡豆商品失敗:', error);
        } else {
          // console.log('✅ 從 Supabase 抓到的咖啡豆:', data);
          setProducts(data || []);
        }
      } catch (error) {
        console.error('❌ 發生錯誤:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeans();
  }, []);

  // 根據焙度篩選產品
  // ⚠️ 注意：資料庫欄位有無焙度
  const filteredProducts = products.filter((p) => {
    if (selectedRoast === "all") return true;
    // 假設 roast 資訊在 description 中，或者有獨立的欄位
    return p.roast === selectedRoast;
  });

  // 切換焙度時重置選擇
  const handleRoastChange = (roast) => {
    setSelectedRoast(roast);
    setSelectedProductIndex(null);
  };

  // 處理規格變更
  const handleSizeChange = (productId, size) => {
    setProductSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  // ✅ Loading 狀態
  if (loading) {
    return (
      <section
        id="bean"
        className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]"
      >
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">載入咖啡豆商品中...</p>
        </div>
      </section>
    );
  }

  // ✅ 無商品狀態
  if (products.length === 0) {
    return (
      <section
        id="bean"
        className="relative w-full bg-[#FFF0DD] py-20 overflow-x-hidden scroll-mt-[100px]"
      >
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">目前沒有咖啡豆商品</p>
        </div>
      </section>
    );
  }

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
              letterSpacing: "0.25em",
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
                product={product}  // ✅ 傳整個 product 物件
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

              // 取得選中規格
              const selectedSize = productSizes[selectedProduct.id] || '100g';
              
              // ✅ 從 prices JSON 中取得對應規格的價格
              const price = selectedProduct.prices?.[selectedSize] || selectedProduct.price;

              // ✅ 重要：id 直接用 UUID，不加前綴！
              addItem({
                id: selectedProduct.id,  // ✅ 直接用 UUID
                name: `${selectedProduct.name} (${selectedSize})`,  // ✅ 名稱包含規格
                price: price,
                image_url: selectedProduct.image_url,
                description: `${selectedProduct.description} | ${selectedSize}`,  // ✅ 描述包含規格
                quantity: 1,
              });

              alert(`${selectedProduct.name} (${selectedSize}) 已加入購物車！`);
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