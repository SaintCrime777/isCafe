import Navbar from "./Navbar";
import Secone from "./Secone";
import Sectwo from "./Sectwo";
import Secthree from "./Secthree";
function Hero() {
  return (
    <section className="w-full">
      <Navbar/>
      {/* 第一段 */}
      <div className="w-full h-[650px] mx-auto bg-[#EFEDD9] flex items-center justify-center">
      <Secone/>
      </div>

      {/* 第二段 */}
      <div className="w-full h-[720px] mx-auto bg-[#FFF0DD] flex items-center justify-center">
        <Sectwo/>
      </div>

      {/* 第三段 */}
      <div className="w-full h-[614px] mx-auto bg-[#EFEDD9] flex items-center justify-center">
        <Secthree/>
      </div>
    </section>
  );
}

export default Hero;