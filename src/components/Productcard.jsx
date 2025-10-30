import { useCartStore } from "@/stores/useCartStore";

function ProductCard({ product, buttonText = "加入清單" }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div
      className="w-[380px] h-[480px] bg-[#EFEDD9] border-[3px] flex flex-col"
      style={{
        borderColor: "#FFFFFF",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
    >
      {/* 產品圖片 */}
      <div
        className="w-full h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${product.image})`,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      />

      {/* 卡片內容區 */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        {/* 標題 */}
        <h3
          className="font-bold text-center mb-4"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: "24px",
            color: "#000000",
            letterSpacing: "0.2em",
            lineHeight: "auto",
            WebkitTextStroke: "3px #FFFFFF",
            paintOrder: "stroke fill",
          }}
        >
          {product.title}
        </h3>

        {/* 描述 */}
        <p
          className="font-bold text-center mb-6"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: "15px",
            color: "#000000",
            letterSpacing: "0.08em",
            lineHeight: "1.5",
            maxWidth: "188px",
          }}
        >
          {product.description}
        </p>

        {/* 按鈕 */}
        <button
          className="w-[120px] h-[40px] bg-[#5A3211] border-[3px] rounded-[25px] font-bold transition-opacity hover:opacity-80"
          style={{
            borderColor: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "#FFFFFF",
            letterSpacing: "0.1em",
          }}
          onClick={() => {
            // 加入購物車
            addItem({
              id: product.id.toString(), // 轉成字串
              name: product.title,
              price:product.price,
              image_url: product.image,
              description:
              product.description || '',
            });
            alert(`${product.title} 已加入購物車！`);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
