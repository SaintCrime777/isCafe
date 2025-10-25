import ProductCard from "./ProductCard";

function Sectwo() {
  const products = [
    {
      image: "/latte.webp",
      title: "笑忘拿鐵",
      description: "我有咖啡，你有故事\n共情笑忘香醇天然地",
    },
    {
      image: "/tisu.webp",
      title: "笑忘提蘇",
      description: "沒有慾望煩惱是\n一口甜蜜法消化的，\n如果有就兩口！",
    },
    {
      image: "/herbtea.webp",
      title: "笑忘果茶",
      description: "蘊含天地萬本精華，\n飲下一杯，舒緩情緒\n恢復元氣！",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-5">
      {/* 標題區 */}
      <div className="flex flex-col items-center mb-12">
        {/* 咖啡豆圖標 */}
        <div className="w-12 h-12 mb-4">
          <img
            src="/coffeebean.png"
            alt="咖啡豆圖標"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 標題文字 */}
        <h2
          className="font-bold"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: "32px",
            color: "#000000",
            letterSpacing: "0.15em",
            WebkitTextStroke:"5px #FFFFFF",
            paintOrder:"stroke fill"
          }}
        >
          笑忘精選品項
        </h2>
      </div>

      {/* 產品卡片區 */}
      <div className="flex justify-center gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Sectwo;
