function Secthree() {
  return (
    <div
      id="brand"
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-5 
                 flex flex-col md:flex-row items-center 
                 gap-8 md:gap-12 scroll-mt-[100px]"
    >
      {/* 左側 - 理念圖示 */}
      <div className="relative overflow-hidden w-full md:w-1/2 lg:max-w-[792px]">
        <img src="/think.webp" alt="品牌理念" className="max-w-full h-auto" />
      </div>

      {/* 右側 - 四宮格圖示 */}
      <div
        className="w-full md:w-1/2 md:flex-shrink-0 rounded-xl overflow-hidden"
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
