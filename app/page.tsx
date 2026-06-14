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

      {/* Контейнер: узкий на мобиле, чуть шире на планшете */}
      <div className="relative z-10 flex flex-col items-center w-full px-5 sm:px-8 py-12 sm:py-16 max-w-md sm:max-w-lg mx-auto">

        {/* ── 1. HERO ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up">
          <p
            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-8 sm:mb-10"
            style={{ color: C.accent }}
          >
            Save the date
          </p>

          <h1
            className="text-[2.75rem] leading-[1] sm:text-6xl font-medium mb-3"
            style={{ color: C.dark }}
          >
            {config.names.groom}
          </h1>

          <p className="text-lg sm:text-xl font-medium my-2 sm:my-3" style={{ color: C.accent }}>
            и
          </p>

          <h1
            className="text-[2.75rem] leading-[1] sm:text-6xl font-medium mb-8 sm:mb-10"
            style={{ color: C.dark }}
          >
            {config.names.bride}
          </h1>

          <div className="h-px w-12 sm:w-16 mx-auto" style={{ background: C.accent }} />
        </section>

        {/* ── 2. ДАТА И ВРЕМЯ ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up animate-delay-100">
          <p
            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: C.accent }}
          >
            Дата
          </p>
          <p
            className="text-[2.25rem] sm:text-5xl font-medium leading-none"
            style={{ color: C.dark }}
          >
            {config.date}
          </p>
          <p
            className="text-base sm:text-lg mt-2 tracking-widest"
            style={{ color: C.dark }}
          >
            {config.time}
          </p>
        </section>

        {/* ── 3. ПЛОЩАДКА ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up animate-delay-200">
          <p
            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: C.accent }}
          >
            Место
          </p>
          <p
            className="text-xl sm:text-3xl font-medium mb-1"
            style={{ color: C.dark }}
          >
            {config.venue.name}
          </p>
          <p
            className="text-sm mb-5 sm:mb-6 leading-relaxed"
            style={{ color: C.dark, opacity: 0.65 }}
          >
            {config.venue.address}
          </p>
          {/* На мобиле кнопка — во всю ширину для удобного тапа */}
          <a
            href={config.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:inline-block w-full sm:w-auto px-8 py-4 sm:py-3 text-xs tracking-widest uppercase border transition-all duration-200 active:opacity-60 hover:opacity-70"
            style={{ borderColor: C.dark, color: C.dark }}
          >
            Построить маршрут
          </a>
        </section>

        {/* ── 4. ТЕКСТ ПРИГЛАШЕНИЯ ── */}
        <section className="w-full text-center mb-10 sm:mb-14 animate-fade-up animate-delay-300">
          <div className="h-px w-12 sm:w-16 mx-auto mb-8 sm:mb-10" style={{ background: C.accent }} />
          <p
            className="text-sm sm:text-base leading-loose sm:leading-relaxed"
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
              className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center mb-6 sm:mb-8"
              style={{ color: C.accent }}
            >
              Программа дня
            </p>
            <div className="space-y-0">
              {config.schedule.map((item, i) => (
                <div
                  key={item.time}
                  className="flex items-center justify-between py-3 sm:py-3"
                  style={{
                    borderBottom: i < config.schedule.length - 1
                      ? "1px solid rgba(138,147,127,0.3)"
                      : "none",
                  }}
                >
                  {/* Время — фиксированная ширина, чтобы выравнивание не плыло */}
                  <span
                    className="text-xs sm:text-sm tracking-widest w-12 shrink-0"
                    style={{ color: C.accent }}
                  >
                    {item.time}
                  </span>
                  <div
                    className="h-px flex-1 mx-4"
                    style={{ background: "rgba(138,147,127,0.2)" }}
                  />
                  <span
                    className="text-xs sm:text-sm text-right"
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
            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center mb-6 sm:mb-8"
            style={{ color: C.accent }}
          >
            Подтвердить присутствие
          </p>
          <RsvpForm />
        </section>

        {/* ── 7. ФУТЕР ── */}
        <footer
          className="w-full text-center mt-12 sm:mt-16 pt-6 sm:pt-8 animate-fade-up animate-delay-600"
          style={{ borderTop: "1px solid rgba(138,147,127,0.4)" }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: C.dark }}>
            {config.names.groom} &amp; {config.names.bride}
          </p>
          <p className="text-[10px] tracking-widest mb-4" style={{ color: C.accent }}>
            {config.date}
          </p>
          <p className="text-xs" style={{ color: C.dark, opacity: 0.6 }}>
            Вопросы:{" "}
            <a
              href={`tel:${config.contact.replace(/\D/g, "")}`}
              className="underline underline-offset-2"
            >
              {config.contact}
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
