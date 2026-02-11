"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeartGame from "./HeartGame";
import { playSound } from "./useSound";

export default function Game() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    playSound("/sounds/intro.wav");
  }, []);


  if (play) {
    return <HeartGame />;
  }
  return (
    <div className="text-center space-y-10 p-6"
    style={{ fontSize: "min(6vw, 48px)" }}

    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="pixel text-3xl text-pink-300"
      >
        💖 VALENTINE QUEST 💖
      </motion.h1>

      <p className="pixel text-sm">
        Only player: Leo 💖 💖 💖
        <br />
        Class: Old School Gamer 🎮
        <br />
        Special Skill: Stealing my heart 😏
      </p>

      {/* 🕹️ INSTRUCCIONES */}
      <div className="pixel text-xs space-y-2 border-4 border-pink-400 p-4 bg-black">
        <p className="text-pink-300">📜 HOW TO PLAY</p>
        <p>❤️ Hearts will fall from the sky</p>
        <p>🖱️ Click the hearts to catch them</p>
        <p>🎯 Catch 10 hearts to win</p>
        <p>💥 Each heart = true love points</p>
        <p className="text-pink-400 animate-pulse">
          PRO TIP: Love never misses 😉
        </p>
      </div>

      <motion.button
        onClick={() => {
         // playSound("/sounds/coin.wav");
          setPlay(true);
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="pixel text-pink-400"
      >
        PRESS HERE ❤️ TO CONTINUE
      </motion.button>
    </div>
  );

}


