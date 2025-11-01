import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "./ProductCard";

function Sectwo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 從 Supabase 抓取首頁精選商品
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'featured') //限定推薦商品
          .order('created_at', { ascending: true })
          .limit(3);

        if (error) {
          console.error('❌ 抓取商品失敗:', error);
        } else {
          console.log('✅ 從 Supabase 抓到的商品:', data);
          setProducts(data || []);
        }
      } catch (error) {
        console.error('❌ 發生錯誤:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Loading 狀態
  if (loading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-5 py-20">
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-500">載入商品中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-5">
      {/* 標題區 */}
      <div className="flex flex-col items-center mb-8 md:mb-12">
        {/* 咖啡豆圖標 */}
        <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4">
          <img
            src="/coffeebean.png"
            alt="咖啡豆圖標"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 標題文字 - 響應式字體 */}
        <h2
          className="font-bold text-2xl md:text-3xl lg:text-[32px]"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            color: "#000000",
            letterSpacing: "0.15em",
            WebkitTextStroke: "3px #FFFFFF",
            paintOrder: "stroke fill"
          }}
        >
          笑忘精選品項
        </h2>
      </div>

      {/* 產品卡片區 - 響應式網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Sectwo;