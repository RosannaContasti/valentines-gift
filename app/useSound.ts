// "use client";

// export function playSound(src: string, volume = 0.5) {
//   const audio = new Audio(src);
//   audio.volume = volume;
//   audio.currentTime = 0;

//   audio.play().catch(() => {
//     // evita errores si el browser bloquea autoplay
//   });
// }


"use client";

export function playSound(src: string, volume = 0.5) {
  // En producción añade el basePath, en desarrollo no
  const basePath = process.env.NODE_ENV === 'production' ? '/valentines-gift' : '';
  const audio = new Audio(`${basePath}${src}`);
  audio.volume = volume;
  audio.currentTime = 0;

  audio.play().catch((error) => {
    // evita errores si el browser bloquea autoplay
    console.log('Audio bloqueado por el navegador:', error);
  });
}