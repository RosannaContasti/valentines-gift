"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Game from "./Game";
import { playSound } from "./useSound";


export default function Home() {
  const [start, setStart] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center crt">
      {!start ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playSound("/sounds/coin.wav");
            setStart(true);
          }}
          className="pixel bg-pink-500 px-6 py-4 border-4 border-black text-xl"
          style={{ fontSize: "min(6vw, 72px)" }}

        >
          ▶ INSERT COIN
        </motion.button>
      ) : (
        <Game />
      )}
    </main>
  );
}
