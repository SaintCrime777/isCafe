function Secthree() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-5 flex items-center gap-12">
      {/* 左側 - 理念圖示 */}
      <div className="relative overflow-hidden w-full max-w-[792px]">
        <img src="/think.webp" alt="品牌理念" className="max-w-full h-auto"
        />
      </div>

      {/* 右側 - 四宮格圖示 */}
<div 
  className="rounded-xl overflow-hidden"
  style={{
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  }}
>
  <img 
    src="/advantage.png" 
    alt="優勢"
    className="w-full h-full rounded-xl"
  />
</div>
        </div>
    
  );
}

export default Secthree;