import ProductCard from "./ProductCard";

function Sectwo() {
  const products = [
    {
      id:1,
      image: "/wagashi.webp",
      title: "和菓笑忘",
      description: "和我們一起笑忘閒聊風花雪月!",
      price: 230,
    },
    {
      id:2,
      image: "/sun.webp",
      title: "笑忘金烏",
      description: "金烏不獨，難以耀群星。將進酒，不將就!",
      price: 265,
    },
    {
      id:3,
      image: "/pasta.webp",
      title: "笑忘Pasta",
      description: "來點pasta，卡關都all pass！",
      price: 330,
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
