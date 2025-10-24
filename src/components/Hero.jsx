import Navbar from "./Navbar";
function Hero() {
  return (
    <section className="w-full">
      <Navbar/>
      {/* 第一段 */}
      <div className="w-full h-[714px] mx-auto bg-[#EFEDD9] flex items-center justify-center">
      </div>

      {/* 第二段 */}
      <div className="w-full h-[720px] mx-auto bg-[#FFF0DD] flex items-center justify-center">
        {/* 第二段内容 */}
      </div>

      {/* 第三段 */}
      <div className="w-full h-[614px] mx-auto bg-[#EFEDD9] flex items-center justify-center">
        {/* 第三段内容 */}
      </div>
    </section>
  );
}

export default Hero;