import Secone from "./Secone";
import Sectwo from "./Sectwo";
import Secthree from "./Secthree";
function Hero() {
  return (
   <section className="w-full">
      {/* 第一段 */}
      <div className="w-full min-h-[400px] md:min-h-[500px] lg:h-[650px] mx-auto bg-[#EFEDD9] flex items-center justify-center py-8 md:py-0">
        <Secone />
      </div>

      {/* 第二段 */}
      <div className="w-full min-h-[600px] md:min-h-[720px] mx-auto bg-[#FFF0DD] flex items-center justify-center py-12 md:py-16">
        <Sectwo />
      </div>

      {/* 第三段 */}
      <div className="w-full min-h-[800px] md:min-h-[614px] mx-auto bg-[#EFEDD9] flex items-center justify-center py-12 md:py-0">
        <Secthree />
      </div>
    </section>
  );
}

export default Hero;