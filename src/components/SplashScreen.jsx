import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState("logo");

  useEffect(() => {
    // LOGO 階段
    const logoTimer = setTimeout(() => {
      setStage("hero");
    }, 3000);

    // HERO 階段結束 → 播 exit → 再 onComplete
    const heroTimer = setTimeout(() => {
      setStage("done");
      // 延遲與 exit 動畫時間相同，確保動畫播完
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 5800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(heroTimer);
    };
  }, [onComplete]);

  // 點擊跳過
  const handleSkip = () => {
    setStage("done");
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key={stage} // ✅ 加上 key 才能觸發 exit
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#FFF0DD" }}
          // ✅ 拉開幕簾的離場動畫
          exit={{
            scale: 0.2,
            originX: 0.5,
            originY: 0.25,
            opacity: 0.75,
          }}
          transition={{ duration: 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* LOGO */}
          {stage === "logo" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <img
                src="/logo.png"
                alt="笑忘咖啡"
                className="w-40 h-40 lg:w-56 lg:h-56"
              />
              <motion.p
                className="mt-6 text-2xl tracking-widest flex"
                style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  color: "#5A3211",
                }}
              >
                {["i", "s", "C", "a", "f", "e"].map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.1, // 每個字母依序延遲
                      duration: 0.8,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          )}

          {/* HERO */}
          {stage === "hero" && (
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              <img
                src="/in.webp"
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <h1
                  className="text-white text-4xl lg:text-6xl font-bold text-center tracking-widest"
                  style={{
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  放下喧囂，進來坐坐!
                </h1>
              </motion.div>
            </motion.div>
          )}

          {/* SKIP 按鈕 */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            跳過 →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
