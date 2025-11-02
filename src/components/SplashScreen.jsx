import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState('logo'); 

  useEffect(() => {
    //LOGO
    const logoTimer = setTimeout(() => {
      setStage('hero');
    }, 3000);

    //滿版
    const heroTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 5800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(heroTimer);
    };
  }, [onComplete]);

  //點擊跳過
  const handleSkip = () => {
    setStage('done');
    onComplete();
  };

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#FFF0DD' }}  
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* LOGO */}
          {stage === 'logo' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <img 
                src="/logo.png" 
                alt="笑忘咖啡" 
                className="w-40 h-40 lg:w-56 lg:h-56"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-2xl tracking-wider"
                style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  color: '#5A3211'
                }}
              >
                isCafe
              </motion.p>
            </motion.div>
          )}

          {/* 滿版 */}
          {stage === 'hero' && (
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
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
                  className="text-white text-4xl lg:text-6xl font-bold text-center"
                  style={{
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  放下喧囂，進來坐坐!
                </h1>
              </motion.div>
            </motion.div>
          )}

          {/* SKIP */}
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