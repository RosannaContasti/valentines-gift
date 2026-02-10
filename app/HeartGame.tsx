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
      if (next >= 5) {
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
              ⚔️ LEGENDARY LOVE FOR ROSI 💘 ⚔️
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
              {/* Corazones flotantes alrededor de la imagen */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2 + Math.PI / 2;
                const x = 50 + Math.cos(angle) * 48;
                const y = 50 + Math.sin(angle) * 48;
                const hearts = ["❤️", "💖", "💗", "💕", "💘"];
                return (
                  <motion.span
                    key={i}
                    className="absolute text-2xl md:text-3xl pointer-events-none"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [0.8, 1.2, 0.8],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2 + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  >
                    {hearts[i % hearts.length]}
                  </motion.span>
                );
              })}

              <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden border-4 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <Image
                  src="/images/win.png"
                  alt="Victory - Leo unlocked: My Valentine"
                  fill
                  className="object-contain"
                  sizes="(max-width: 400px) 100vw, 320px"
                  priority
                />
              </div>
            </motion.div>


          </>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={screenControls}
      className="relative w-[300px] h-[400px] border-4 border-pink-400 bg-black overflow-hidden pixel"
    >
      <motion.p
        key={score}
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        className="text-xs text-center py-2 text-pink-300"
        style={{ fontSize: "min(6vw, 48px)" }}
      >
        SCORE: {score} / 5
      </motion.p>

      {[...Array(3)].map((_, i) => (
        <motion.button
          key={i}
          onClick={handleCatch}
          initial={{ y: -60, x: Math.random() * 240, scale: 1 }}
          animate={{
            y: 350,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.6,
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
  );
}

// "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useState } from "react";
// import { playSound } from "./useSound";

// const LEVELS = [
//   { goal: 3, message: "💖 Te quiero 💖" },
//   { goal: 4, message: "✨ Sos mi persona ✨" },
//   { goal: 5, message: "💘 Leo… ¿querés ser mi San Valentín? 💘" },
// ];

// export default function HeartGame() {
//   const [level, setLevel] = useState(0);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);

//   const screenControls = useAnimation();

//   const handleCatch = async () => {
//     playSound("/sounds/blip.wav");

//     await screenControls.start({
//       x: [0, -4, 4, -2, 2, 0],
//       transition: { duration: 0.25 },
//     });

//     setScore((prev) => {
//       const next = prev + 1;

//       if (next >= LEVELS[level].goal) {
//         playSound("/sounds/levelup.wav");
//         setShowMessage(true);

//         setTimeout(() => {
//           setShowMessage(false);
//           setScore(0);

//           if (level === LEVELS.length - 1) {
//             playSound("/sounds/win.wav");
//             setFinished(true);
//           } else {
//             setLevel((l) => l + 1);
//           }
//         }, 1800);
//       }

//       return next;
//     });
//   };

//   // 🏆 FINAL
//   if (finished) {
//     return (
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 180 }}
//         className="fixed inset-0 flex flex-col items-center justify-center bg-black pixel z-50 p-4"
//       >
//         <motion.h2
//           animate={{ scale: [1, 1.15, 1] }}
//           transition={{ repeat: Infinity, duration: 0.9 }}
//           className="leading-none text-pink-400 text-center"
//           style={{ fontSize: "min(25vw, 120px)" }}
//         >
//           🎉 YOU WIN 🎉
//         </motion.h2>

//         <p className="text-xl md:text-2xl text-pink-300 text-center mt-8">
//           Leo unlocked:
//           <br />
//           💖 My Valentine 💖
//         </p>

//         <p className="text-base md:text-lg text-pink-300 animate-pulse text-center mt-6">
//           Achievement unlocked:
//           <br />
//           LEGENDARY LOVE 💘
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       animate={screenControls}
//       className="relative w-[300px] h-[400px] border-4 border-pink-400 bg-black overflow-hidden pixel"
//     >
//       {/* HUD */}
//       <div className="text-xs text-center py-2 text-pink-300">
//         LEVEL {level + 1} · SCORE {score}/{LEVELS[level].goal}
//       </div>

//       {/* MENSAJE DE NIVEL */}
//       {showMessage && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 text-pink-400 text-lg text-center px-6"
//         >
//           {LEVELS[level].message}
//         </motion.div>
//       )}

//       {/* CORAZONES */}
//       {[...Array(3)].map((_, i) => (
//         <motion.button
//           key={`${level}-${i}`}
//           onClick={handleCatch}
//           initial={{ y: -60, x: Math.random() * 240 }}
//           animate={{ y: 350, scale: [1, 1.2, 1] }}
//           transition={{
//             duration: 2 - level * 0.3,
//             repeat: Infinity,
//             delay: i * 0.6,
//             ease: "linear",
//           }}
//           whileHover={{ scale: 1.4 }}
//           whileTap={{ scale: 0.8 }}
//           className="absolute text-10xl drop-shadow-[0_0_12px_hotpink]"
//         >
//           ❤️
//         </motion.button>
//       ))}
//     </motion.div>
//   );
// }
