// src/components/DrinkCard.jsx
function DrinkCard({ product, isCenter }) {  // ✅ 改成接收 product 物件
  const cardWidth = isCenter ? 320 : 260;
  const cardHeight = isCenter ? 680 : 580;
  const scale = isCenter ? 1 : 0.81;

  return (
    <div 
      className="relative flex-shrink-0 transition-all duration-300"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* 襯底灰色 */}
      {isCenter && (
        <div
          className="absolute"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            borderRadius: '80px',
            backgroundColor: '#D9D9D9',
            top: '-16px',
            right: '-16px',
            zIndex: 0
          }}
        />
      )}

      {/* 卡片主體 */}
      <div
        className="relative bg-[#FFF0DD] overflow-visible"
        style={{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          borderRadius: '80px',
          border: '5px solid #5A3211',
          boxShadow: '10px -5px 15px rgba(0, 0, 0, 0.15)',
          zIndex: 1
        }}
      >
        {/* 圖片區域 */}
        <div className="relative w-full pt-16 px-4">
          <div
            className="w-full overflow-hidden"
            style={{
              height: `${272 * scale}px`,
              borderRadius: '8px',
              border: '6px solid #FFFFFF'
            }}
          >
            <img
              src={product.image_url}  
              alt={product.name}  
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop';
              }}
            />
          </div>
        </div>

        {/* 上方分隔線 */}
        <div
          className="mx-auto mt-4"
          style={{
            width: '90%',
            height: '3px',
            backgroundColor: '#FFFFFF'
          }}
        />

        {/* INFO區域 */}
        <div className="flex flex-col items-center px-6 pt-6">
          {/* 產品名稱 */}
          <h3
            className="font-bold text-center mb-3"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: `${isCenter ? '32px' : '26px'}`,
              color: '#5A3211',
              letterSpacing: '0.2em',
              textShadow: '2px 2px 0px #FFFFFF, -2px -2px 0px #FFFFFF, 2px -2px 0px #FFFFFF, -2px 2px 0px #FFFFFF'
            }}
          >
            {product.name}  {/* ✅ 改用 name */}
          </h3>

          {/* 價格 */}
          <p
            className="font-medium mb-4"
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: `${isCenter ? '28px' : '24px'}`,
              color: '#000000',
              letterSpacing: '0.2em',
              fontStyle: 'italic'
            }}
          >
            {product.price}  {/* ✅ 改用 price（已經是數字） */}
          </p>

          {/* 下方分隔線 */}
          <div
            className="mb-4"
            style={{
              width: '80%',
              height: '2px',
              backgroundColor: '#FFFFFF'
            }}
          />

          {/* 成分說明 */}
          <div className="text-center pt-6">
            <p
              className="font-bold"
              style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: `${isCenter ? '16px' : '14px'}`,
                color: '#000000',
                letterSpacing: '0.2em'
              }}
            >
              {product.description}  {/* ✅ 改用 description */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;