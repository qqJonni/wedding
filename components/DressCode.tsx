import Image from "next/image";
import { config } from "@/content";

const C = {
  accent: "#8A937F",
  dark:   "#3F4244",
  light:  "#EDEAE3",
};

const swatches = [
  { name: "Шалфей",  src: "/swatch-sage-v2.png" },
  { name: "Шампань", src: "/swatch-champagne.png" },
  { name: "Айвори",  src: "/swatch-ivory.png" },
  { name: "Хаки",    src: "/swatch-khaki.png" },
  { name: "Чёрный",  src: "/swatch-black.png" },
];

export default function DressCode() {
  const { dressCode } = config;

  return (
    <section className="w-full mb-10 sm:mb-14 animate-fade-up animate-delay-400">
      {/* Заголовок */}
      <p
        className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center mb-8 sm:mb-10"
        style={{ color: C.accent }}
      >
        Дресс-код
      </p>

      {/* Ряд 1 — 3 кружка */}
      <div className="flex justify-center gap-5 sm:gap-7 mb-5 sm:mb-6">
        {swatches.slice(0, 3).map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src={s.src}
                alt={s.name}
                fill
                className="object-cover rounded-full"
                style={{ boxShadow: "0 2px 10px rgba(63,66,68,0.18)" }}
                sizes="96px"
              />
            </div>
            <span
              className="text-[9px] sm:text-[10px] tracking-wide uppercase"
              style={{ color: C.accent }}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Ряд 2 — 2 кружка */}
      <div className="flex justify-center gap-5 sm:gap-7 mb-6 sm:mb-8">
        {swatches.slice(3).map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src={s.src}
                alt={s.name}
                fill
                className="object-cover rounded-full"
                style={{ boxShadow: "0 2px 10px rgba(63,66,68,0.18)" }}
                sizes="96px"
              />
            </div>
            <span
              className="text-[9px] sm:text-[10px] tracking-wide uppercase"
              style={{ color: C.accent }}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Пометка */}
      {dressCode.note && (
        <p
          className="text-xs text-center mb-8"
          style={{ color: C.dark, opacity: 0.5 }}
        >
          {dressCode.note}
        </p>
      )}

      {/* Разделитель */}
      <div
        className="h-px w-12 mx-auto mb-8"
        style={{ background: C.accent, opacity: 0.5 }}
      />

      {/* Lady / Men — в одну колонку, фото целиком */}
      <div className="flex flex-col gap-5">
        {[
          { label: "Lady", src: "/lady.jpg", alt: "Пример женского образа" },
          { label: "Men",  src: "/men.jpg",  alt: "Пример мужского образа" },
        ].map(({ label, src, alt }) => (
          <div key={label} className="flex flex-col gap-2">
            <p
              className="text-[10px] tracking-[0.2em] uppercase text-center"
              style={{ color: C.accent }}
            >
              {label}
            </p>
            <div className="relative w-full" style={{ aspectRatio: "1280/860" }}>
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 90vw, 450px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
