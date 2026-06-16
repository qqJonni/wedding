import { config } from "@/content";
import RsvpForm from "@/components/RsvpForm";
import DecorCircles from "@/components/DecorCircles";
import DressCode from "@/components/DressCode";

const C = {
  bg: "#D7D1C6",
  light: "#EDEAE3",
  accent: "#8A937F",
  dark: "#3F4244",
  frost: "#F7F7F5",
};

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-dvh">
      <DecorCircles />

      <div className="relative z-10 flex flex-col items-center w-full px-5 sm:px-8 py-12 sm:py-16 max-w-md sm:max-w-lg mx-auto">

        {/* ── 1. HERO ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up">
          {/* "Save the date" — 10px×1.5=15px */}
          <p
            className="text-[15px] sm:text-[18px] tracking-[0.25em] uppercase mb-8 sm:mb-10"
            style={{ color: C.accent }}
          >
            Save the date
          </p>

          {/* Имена — НЕ масштабируем */}
          <h1
            className="text-[3.5rem] leading-[1.1] sm:text-7xl mb-3"
            style={{
              color: C.dark,
              fontFamily: "var(--font-script), cursive",
              fontWeight: "normal",
            }}
          >
            {config.names.groom}
          </h1>

          <p className="text-[27px] sm:text-[30px] font-medium my-2 sm:my-3" style={{ color: C.accent }}>
            и
          </p>

          <h1
            className="text-[3.5rem] leading-[1.1] sm:text-7xl mb-8 sm:mb-10"
            style={{
              color: C.dark,
              fontFamily: "var(--font-script), cursive",
              fontWeight: "normal",
            }}
          >
            {config.names.bride}
          </h1>

          <div className="h-px w-12 sm:w-16 mx-auto" style={{ background: C.accent }} />
        </section>

        {/* ── 2. ДАТА И ВРЕМЯ ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up animate-delay-100">
          {/* label — 10px×1.5=15px */}
          <p
            className="text-[15px] sm:text-[18px] tracking-[0.2em] uppercase mb-3"
            style={{ color: C.accent }}
          >
            Дата
          </p>
          {/* Дата — НЕ масштабируем */}
          <p
            className="text-[2.25rem] sm:text-5xl leading-none"
            style={{
              color: C.dark,
              fontFamily: "var(--font-script), cursive",
              fontWeight: "normal",
            }}
          >
            {config.date}
          </p>
          {/* Время — 16px×1.5=24px */}
          <p
            className="text-[24px] sm:text-[27px] mt-2 tracking-widest"
            style={{ color: C.dark }}
          >
            {config.time}
          </p>
        </section>

        {/* ── 3. ПЛОЩАДКА ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up animate-delay-200">
          <p
            className="text-[15px] sm:text-[18px] tracking-[0.2em] uppercase mb-3"
            style={{ color: C.accent }}
          >
            Место
          </p>
          {/* Название площадки — НЕ масштабируем */}
          <p
            className="text-xl sm:text-3xl font-medium mb-1"
            style={{ color: C.dark }}
          >
            {config.venue.name}
          </p>
          {/* Адрес — 14px×1.5=21px */}
          <p
            className="text-[21px] mb-5 sm:mb-6 leading-relaxed"
            style={{ color: C.dark, opacity: 0.65 }}
          >
            {config.venue.address}
          </p>
          {/* Кнопка — 12px×1.5=18px */}
          <a
            href={config.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:inline-block w-full sm:w-auto px-8 py-4 sm:py-3 text-[18px] tracking-widest uppercase border transition-all duration-200 active:opacity-60 hover:opacity-70"
            style={{ borderColor: C.dark, color: C.dark }}
          >
            Построить маршрут
          </a>
        </section>

        {/* ── 4. ТЕКСТ ПРИГЛАШЕНИЯ ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up animate-delay-300">
          <div className="h-px w-12 sm:w-16 mx-auto mb-8 sm:mb-10" style={{ background: C.accent }} />
          {/* 14px×1.5=21px */}
          <p
            className="text-[21px] sm:text-[24px] leading-loose sm:leading-relaxed"
            style={{ color: C.dark }}
          >
            {config.inviteText}
          </p>
          <div className="h-px w-12 sm:w-16 mx-auto mt-8 sm:mt-10" style={{ background: C.accent }} />
        </section>

        {/* ── 5. ТАЙМИНГ ── */}
        {config.showSchedule && (
          <section className="w-full mb-10 sm:mb-14 animate-fade-up animate-delay-400">
            <p
              className="text-[15px] sm:text-[18px] tracking-[0.2em] uppercase text-center mb-6 sm:mb-8"
              style={{ color: C.accent }}
            >
              Программа дня
            </p>
            <div className="space-y-0">
              {config.schedule.map((item, i) => (
                <div
                  key={item.time}
                  className="flex items-center justify-between py-3"
                  style={{
                    borderBottom: i < config.schedule.length - 1
                      ? "1px solid rgba(138,147,127,0.3)"
                      : "none",
                  }}
                >
                  <span
                    className="text-[18px] sm:text-[21px] tracking-widest w-14 shrink-0"
                    style={{ color: C.accent }}
                  >
                    {item.time}
                  </span>
                  <div
                    className="h-px flex-1 mx-4"
                    style={{ background: "rgba(138,147,127,0.2)" }}
                  />
                  <span
                    className="text-[18px] sm:text-[21px] text-right"
                    style={{ color: C.dark }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 6. ДРЕСС-КОД ── */}
        {config.dressCode.show && <DressCode />}

        {/* ── 7. RSVP ── */}
        <section className="w-full animate-fade-up animate-delay-500" id="rsvp">
          <p
            className="text-[15px] sm:text-[18px] tracking-[0.2em] uppercase text-center mb-4"
            style={{ color: C.accent }}
          >
            Подтвердить присутствие
          </p>
          <p
            className="text-[18px] sm:text-[21px] text-center leading-relaxed mb-6 sm:mb-8 max-w-xs mx-auto"
            style={{ color: C.dark, opacity: 0.7 }}
          >
            Мы ждём вас и хотим, чтобы вам было комфортно. Пожалуйста, заполните анкету ниже.
          </p>
          <RsvpForm />
        </section>

        {/* ── 7.5. VK ЧАТ ── */}
        <section className="w-full text-center mt-12 sm:mt-16 animate-fade-up">
          <p
            className="text-[18px] sm:text-[21px] mb-4"
            style={{ color: C.dark, opacity: 0.8 }}
          >
            Переходите в наш групповой чат
          </p>
          <a
            href="https://vk.me/join/dG_8Xr_GEVAIoH8BXp2STj6j2KzaGXyw_YU="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr.jpg"
              alt="QR-код группового чата ВКонтакте"
              className="mx-auto"
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
          </a>
        </section>

        {/* ── 8. ФУТЕР ── */}
        <footer
          className="w-full text-center mt-12 sm:mt-16 pt-6 sm:pt-8 animate-fade-up animate-delay-600"
          style={{ borderTop: "1px solid rgba(138,147,127,0.4)" }}
        >
          <p className="text-[21px] font-medium mb-1" style={{ color: C.dark }}>
            {config.names.groom} &amp; {config.names.bride}
          </p>
          <p className="text-[15px] tracking-widest" style={{ color: C.accent }}>
            {config.date}
          </p>
        </footer>
      </div>
    </main>
  );
}
