"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { playSound } from "./useSound";

export default function HeartGame() {
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [prizeUnlocked, setPrizeUnlocked] = useState(false);
  const screenControls = useAnimation();
  const [floatingMessage, setFloatingMessage] = useState<string | null>(null)


  const handleCatch = async () => {
    playSound("/sounds/blip.wav");

    // 💥 screen shake
    await screenControls.start({
      x: [0, -4, 4, -2, 2, 0],
      transition: { duration: 0.25 },
    });

    setScore((prev) => {
      const next = prev + 1;

      const messages = [
        "Te quiero mucho💕",
        "Eres mi persona favorita 🥹",
        "Amo tu sonrisa 🥰",
        "Dudu & Bubu x 100pre💖",
        "Eres mi lugar seguro ✨",
        "Amo tu pielcita y olorcito🤩",
        "Amo abracito y besito 💘",
        "Siempre eres tu 💞",
        "Mantita Dudu y Bubu 💓",
        "Tu amor es mi todo 💓",
        "Amo que seas tu ❤️"
      ]
      setFloatingMessage(messages[next - 1] || "💖")

      setTimeout(() => {
        setFloatingMessage(null);
      }, 1200);


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


        {!prizeUnlocked ? (
          <>
            <motion.h2
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="leading-none text-pink-400 font-black pixel text-center"
              style={{ fontSize: "min(6vw, 150px)" }}
            >
              🎉 YOU WIN 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-pink-300 text-center items-center mt-14 mb-14"
              style={{ fontSize: "min(6vw, 48px)" }}

            >
              Leo unlocked:
              <br />
              <br />
              💖 Rosi's Forever Love 💖
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-pink-300 animate-pulse text-center mt-14 mb-14"
              style={{ fontSize: "min(6vw, 48px)" }}
            >
              Achievement unlocked:
              <br />
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

            <div className="flex items-center justify-center min-h-screen w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="relative min-w-[600px] min-h-[1200px] aspect-[4/3] rounded-lg overflow-hidden border-4 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.6)]"
              >
                <Image
                  src="/valentines-gift/prize.png"
                  alt="Victory - Leo unlocked: My Valentine"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

          </>
        )}
      </motion.div>
    );
  }

  const items = [
    { type: "heart", emoji: "❤️", duration: 3.2 },
    { type: "bubu", emoji: "🐻", duration: 2 },
    { type: "dudu", emoji: "🐻‍❄️", duration: 2 },
  ];

  return (
    <>
      {/* SCORE arriba */}
      <p
        className="absolute top-4 left-0 right-0 text-center text-pink-200 pixel z-20"
        style={{ fontSize: "min(6vw, 48px)" }}
      >
        SCORE: {score} / 10
      </p>

      {/* Área de juego full screen */}
      <motion.div
        animate={screenControls}
        className="relative w-screen h-screen overflow-hidden pixel"
      >
        {[...Array(6)].map((_, i) => {
          const item = items[i % items.length];
          return (
            <motion.button
              key={`${i}-${score}`}
              onClick={handleCatch}
              initial={{
                y: -100,
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 300),
              }}
              animate={{
                y: (typeof window !== "undefined" ? window.innerHeight : 400) + 100,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
              whileTap={{ scale: 0.8 }}
              className="absolute drop-shadow-[0_0_15px_hotpink]"
              style={{ fontSize: "min(10vw, 120px)" }}
            >
              {item.emoji}
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {floatingMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="
        fixed inset-0
        flex items-center justify-center
        text-pink-200 pixel z-50 text-center
        drop-shadow-[0_0_25px_hotpink]
        pointer-events-none
      "
            style={{ fontSize: "min(6vw, 60px)" }}
          >
            {floatingMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </>

  );
}
