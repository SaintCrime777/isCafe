function Secone() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[650px]">
      {/* 底圖 */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: 'url("/layout.png")' }}
      />

      {/* 內容區 */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        {/* 遮罩 */}
        <div 
          className="absolute w-[90%] max-w-[875px] h-[280px] md:h-[360px] 
                     bg-white/85 border-4 border-[#FBED69]"
          style={{
            filter: 'blur(12px)',
            boxShadow: '10px 18px 4px rgba(251, 237, 105, 0.25)',
          }}
        />
        
        {/* 文字 */}
        <h1 
          className="relative z-10 font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl 
                     text-center px-6 leading-tight"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            color: '#5A3211',
            letterSpacing: '0.02em',
            WebkitTextStroke: '3px #F4F0F0',
            paintOrder: 'stroke fill'
          }}
        >
          When the world is too loud,<br/>
          sip a moment of quiet!
        </h1>
      </div>

      {/* 底線 */}
      <div className="absolute bottom-4 inset-x-0 h-1 bg-[#EFEDD9] z-10" />
    </div>
  );
}

export default Secone;