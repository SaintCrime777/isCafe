function Secone() {
  return (
    <div className="relative w-[1400px] h-[600px] overflow-hidden">
      
      {/* 底圖 - 左右預留20px，blur:3 */}
      <div 
        className="absolute top-0 left-5 right-5 h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("/layout.png")',
          filter: 'blur(3px)',
          zIndex: 1
        }}
      />

      {/* 遮罩層 - w:875/h:360，置中，blur:20，邊線#FBED69，drop shadow */}
      <div 
        className="absolute top-1/2 left-1/2 w-[875px] h-[360px] bg-white/85 border-4"
        style={{
          transform: 'translate(-50%, -50%)',
          borderColor: '#FBED69',
          filter: 'blur(12px)',
          boxShadow: '10px 18px 4px rgba(251, 237, 105, 0.25)',
          zIndex: 2
        }}
      />

      {/* 文字層 - 必須在遮罩之上，不受blur影響 */}
      <div 
        className="absolute top-1/2 left-1/2 w-[875px] h-[360px] flex items-center justify-center text-center px-10"
        style={{
          transform: 'translate(-50%, -50%)',
          zIndex: 3
        }}
      >
        <h1 
          className="font-bold m-0"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            fontSize: '48px',
            color: '#5A3211',
            letterSpacing: '0.02em',
            WebkitTextStroke: '5px #F4F0F0',
            paintOrder: 'stroke fill'
          }}
        >
          When the world is too loud,<br/>
          sip a moment of quiet!
        </h1>
      </div>
      {/* 底部線 */}
      <div 
        className="absolute bottom-4 left-5 right-5"
        style={{
          height: '4px',
          backgroundColor: '#EFEDD9',
          zIndex: 999
        }}
      />
    </div>
  );
}

export default Secone;