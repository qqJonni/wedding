"use client";

// Декоративные геометрические круги по краям экрана (как на печатном приглашении)
export default function DecorCircles() {
  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      {/* Верхний левый — большой оливковый */}
      <div
        className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-60"
        style={{ background: "#44492B" }}
      />
      {/* Верхний правый — средний тёмный */}
      <div
        className="absolute -top-12 -right-16 w-44 h-44 rounded-full opacity-40"
        style={{ background: "#252922" }}
      />
      {/* Нижний левый — тёплый таупе */}
      <div
        className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full opacity-50"
        style={{ background: "#C2A19B" }}
      />
      {/* Нижний правый — оливковый маленький */}
      <div
        className="absolute -bottom-8 -right-20 w-56 h-56 rounded-full opacity-30"
        style={{ background: "#44492B" }}
      />
      {/* Центральный правый — светлый акцент */}
      <div
        className="absolute top-1/2 -right-28 w-40 h-40 rounded-full opacity-25 -translate-y-1/2"
        style={{ background: "#252922" }}
      />
    </div>
  );
}
