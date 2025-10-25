function ProductCard({ image, title, description, buttonText = "加入清單" }) {
  return (
    <div 
      className="w-[380px] h-[480px] bg-[#EFEDD9] border-[3px] flex flex-col"
      style={{
        borderColor: '#FFFFFF',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
      }}
    >
      {/* 產品圖片 */}
      <div 
        className="w-full h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px'
        }}
      />

      {/* 卡片內容區 */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        {/* 標題 */}
        <h3 
          className="font-bold text-center mb-4"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '24px',
            color: '#000000',
            letterSpacing: '0.2em',
            lineHeight: 'auto',
            WebkitTextStroke: '3px #FFFFFF',
            paintOrder: 'stroke fill'
          }}
        >
          {title}
        </h3>

        {/* 描述 */}
        <p 
          className="font-bold text-center mb-6"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '12px',
            color: '#000000',
            letterSpacing: '0.08em',
            lineHeight: '1.5'
          }}
        >
          {description}
        </p>

        {/* 按鈕 */}
        <button 
          className="w-[120px] h-[40px] bg-[#5A3211] border-[3px] rounded-[25px] font-bold transition-opacity hover:opacity-80"
          style={{
            borderColor: '#FFFFFF',
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#FFFFFF'
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;