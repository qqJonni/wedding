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
  { name: "Олива",   src: "/swatch-khaki.png" },
  { name: "Чёрный",  src: "/swatch-black.png" },
];

export default function DressCode() {
  const { dressCode } = config;

  return (
    <section className="w-full mb-10 sm:mb-14 animate-fade-up animate-delay-400">
      {/* Заголовок — 10px×1.5=15px */}
      <p
        className="text-[15px] sm:text-[18px] tracking-[0.2em] uppercase text-center mb-4"
        style={{ color: C.accent }}
      >
        Дресс-код
      </p>

      {/* Подзаголовок — 12px×1.5=18px */}
      <p
        className="text-[18px] sm:text-[21px] text-center leading-relaxed mb-8 sm:mb-10 max-w-xs mx-auto"
        style={{ color: C.dark, opacity: 0.7 }}
      >
        Пожалуйста, соблюдайте дресс-код. Мы будем очень рады, если вы поддержите атмосферу вечера своим нарядом.
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
            {/* 9px×1.5=14px */}
            <span
              className="text-[14px] sm:text-[15px] tracking-wide uppercase"
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
              className="text-[14px] sm:text-[15px] tracking-wide uppercase"
              style={{ color: C.accent }}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Пометка — 12px×1.5=18px */}
      {dressCode.note && (
        <p
          className="text-[18px] text-center mb-8"
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

      {/* Lady / Men */}
      <div className="flex flex-col gap-5">
        {[
          { label: "Lady", src: "/lady.jpg", alt: "Пример женского образа" },
          { label: "Men",  src: "/men.jpg",  alt: "Пример мужского образа" },
        ].map(({ label, src, alt }) => (
          <div key={label} className="flex flex-col gap-2">
            {/* 10px×1.5=15px */}
            <p
              className="text-[15px] tracking-[0.2em] uppercase text-center"
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

      {/* Пожелания */}
      <div
        className="mt-8 sm:mt-10 px-4 py-5 text-center"
        style={{ borderTop: "1px solid rgba(138,147,127,0.35)" }}
      >
        <p
          className="text-[15px] sm:text-[18px] tracking-[0.2em] uppercase text-center mb-4"
          style={{ color: C.accent }}
        >
          Пожелания
        </p>
        <p
          className="text-[18px] sm:text-[21px] leading-loose"
          style={{ color: C.dark, opacity: 0.75 }}
        >
          Дорогие гости, ваше присутствие — главный подарок для нас. Если вы хотите поздравить нас материально, мы будем благодарны за денежный вклад в наш семейный бюджет. От цветов, пожалуйста, воздержитесь — мы очень ценим ваше внимание и понимание.
        </p>
      </div>
    </section>
  );
}
