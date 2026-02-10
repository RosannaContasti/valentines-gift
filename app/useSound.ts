"use client";

export function playSound(src: string, volume = 0.5) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.currentTime = 0;

  audio.play().catch(() => {
    // evita errores si el browser bloquea autoplay
  });
}
