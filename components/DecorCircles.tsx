"use client";

// Декоративные круги — на мобиле меньше, чтобы не перекрывать контент
export default function DecorCircles() {
  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      {/* Верхний левый — Pine Smoke */}
      <div
        className="absolute -top-16 -left-16 w-40 h-40 sm:w-64 sm:h-64 sm:-top-24 sm:-left-24 rounded-full opacity-50"
        style={{ background: "#8A937F" }}
      />
      {/* Верхний правый — Iron Grey */}
      <div
        className="absolute -top-8 -right-10 w-28 h-28 sm:w-44 sm:h-44 sm:-top-12 sm:-right-16 rounded-full opacity-30"
        style={{ background: "#3F4244" }}
      />
      {/* Нижний левый — Nordic Linen */}
      <div
        className="absolute -bottom-10 -left-8 w-36 h-36 sm:w-52 sm:h-52 sm:-bottom-16 sm:-left-10 rounded-full opacity-60"
        style={{ background: "#EDEAE3" }}
      />
      {/* Нижний правый — Iron Grey */}
      <div
        className="absolute -bottom-6 -right-14 w-40 h-40 sm:w-56 sm:h-56 sm:-bottom-8 sm:-right-20 rounded-full opacity-25"
        style={{ background: "#3F4244" }}
      />
    </div>
  );
}
