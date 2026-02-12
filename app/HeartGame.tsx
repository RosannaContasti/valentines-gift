"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { playSound } from "./useSound";

export default function HeartGame() {
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [prizeUnlocked, setPrizeUnlocked] = useState(false);
  const screenControls = useAnimation();

  const handleCatch = async () => {
    playSound("/sounds/blip.wav");

    // 💥 screen shake
    await screenControls.start({
      x: [0, -4, 4, -2, 2, 0],
      transition: { duration: 0.25 },
    });

    setScore((prev) => {
      const next = prev + 1;
      if (next >= 10) {
        playSound("/sounds/win.wav");
        setFinished(true);
      }
      return next;
    });
  };

  const handleUnlockPrize = () => {
    playSound("/sounds/coin.wav");
    setPrizeUnlocked(true);
  };

  if (finished) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-black pixel z-50 p-4 overflow-y-auto"
      >
        <motion.h2
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          className="leading-none text-pink-400 font-black pixel text-center"
          style={{ fontSize: "min(6vw, 150px)" }}
        >
          🎉 YOU WIN 🎉
        </motion.h2>

        {!prizeUnlocked ? (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-pink-300 text-center items-center"
              style={{ fontSize: "min(6vw, 48px)" }}

            >
              Leo unlocked:
              <br />
              💖 Rosi's Forever Love 💖
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-pink-300 animate-pulse text-center mt-4"
              style={{ fontSize: "min(6vw, 48px)" }}
            >
              Achievement unlocked:
              <br />
              ⚔️ LEGENDARY LOVE ⚔️
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnlockPrize}
              className="my-8 px-8 py-4 bg-pink-500 border-4 border-pink-300 text-pink-100 font-bold text-lg rounded-none shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-shadow pixel"
              style={{ fontSize: "min(6vw, 78px)" }}
            >
              🏆 WATCH THE PRIZE 🏆
            </motion.button>
          </>
        ) : (
          <>
            {/* Contenedor de imagen + corazones flotantes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.5 }}
              className="relative my-6 w-full max-w-[320px]"
            >
              <div className="relative w-full min-h-[200px] aspect-4/3 rounded-lg overflow-hidden border-4 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <Image
                  src="win.png"  // ✅ Simplemente así, sin condicional
                  alt="Victory - Leo unlocked: My Valentine"
                  fill
                  className="object-contain"
                  sizes="(max-width: 400px) 100vw, 320px"
                  priority
                  unoptimized
                />
              </div>

<div className="relative w-full max-w-[320px]">
  <img 
    src="/images/prize.png" 
    alt="Victory - Leo unlocked: My Valentine"
    className="w-full h-auto object-contain rounded-lg border-4 border-pink-500"
  />
</div>
            </motion.div>
          </>
        )}
      </motion.div>
    );
  }

  // Ritmo más tranquilo: caída más lenta y más espacio entre corazones
  const fallDuration = Math.max(1.4, 3.5 - score * 0.2);
  const heartDelay = Math.max(0.5, 1.1 - score * 0.06);

  return (
    <>
      <p
        className="absolute top-0 left-0 right-0 text-center py-2 text-pink-300 z-10 pixel"
        style={{ fontSize: "min(6vw, 48px)" }}
      >
        SCORE: {score} / 10
      </p>
      <motion.div
        animate={screenControls}
        className="relative w-[300px] h-[400px] border-4 border-pink-400 bg-black pixel overflow-hidden"
      >

        {[...Array(3)].map((_, i) => (
          <motion.button
            key={`${i}-${score}`}
            onClick={handleCatch}
            initial={{ y: -60, x: Math.random() * 240, scale: 1 }}
            animate={{
              y: 350,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: fallDuration + (i % 2) * 0.15,
              repeat: Infinity,
              delay: i * heartDelay,
              ease: "linear",
            }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.8 }}
            className="absolute text-10xl drop-shadow-[0_0_8px_hotpink]"
            style={{ fontSize: "min(6vw, 100px)" }}
          >
            ❤️
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
