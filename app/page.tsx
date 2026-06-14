import { config } from "@/content";
import RsvpForm from "@/components/RsvpForm";
import DecorCircles from "@/components/DecorCircles";

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-dvh">
      <DecorCircles />

      <div className="relative z-10 flex flex-col items-center px-6 py-16 max-w-lg mx-auto">

        {/* ── 1. HERO ── */}
        <section className="w-full text-center mb-14 animate-fade-up">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-10"
            style={{ color: "#44492B" }}
          >
            Save the date
          </p>

          <h1 className="text-5xl sm:text-6xl font-medium leading-none mb-4"
              style={{ color: "#252922" }}>
            {config.names.groom}
          </h1>

          <p className="text-xl font-medium my-3" style={{ color: "#44492B" }}>
            и
          </p>

          <h1 className="text-5xl sm:text-6xl font-medium leading-none mb-10"
              style={{ color: "#252922" }}>
            {config.names.bride}
          </h1>

          <div className="h-px w-16 mx-auto" style={{ background: "#44492B" }} />
        </section>

        {/* ── 2. ДАТА И ВРЕМЯ ── */}
        <section className="w-full text-center mb-14 animate-fade-up animate-delay-100">
          <p className="text-xs tracking-[0.2em] uppercase mb-3"
             style={{ color: "#44492B" }}>
            Дата
          </p>
          <p className="text-4xl sm:text-5xl font-medium" style={{ color: "#252922" }}>
            {config.date}
          </p>
          <p className="text-lg mt-2 tracking-widest" style={{ color: "#252922" }}>
            {config.time}
          </p>
        </section>

        {/* ── 3. ПЛОЩАДКА ── */}
        <section className="w-full text-center mb-14 animate-fade-up animate-delay-200">
          <p className="text-xs tracking-[0.2em] uppercase mb-3"
             style={{ color: "#44492B" }}>
            Место
          </p>
          <p className="text-2xl sm:text-3xl font-medium mb-1"
             style={{ color: "#252922" }}>
            {config.venue.name}
          </p>
          <p className="text-sm mb-6" style={{ color: "#252922", opacity: 0.7 }}>
            {config.venue.address}
          </p>
          <a
            href={config.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase border transition-all duration-200 hover:opacity-70"
            style={{
              borderColor: "#252922",
              color: "#252922",
            }}
          >
            Построить маршрут
          </a>
        </section>

        {/* ── 4. ТЕКСТ ПРИГЛАШЕНИЯ ── */}
        <section className="w-full text-center mb-14 animate-fade-up animate-delay-300">
          <div className="h-px w-16 mx-auto mb-10" style={{ background: "#44492B" }} />
          <p className="text-base leading-relaxed max-w-sm mx-auto"
             style={{ color: "#252922" }}>
            {config.inviteText}
          </p>
          <div className="h-px w-16 mx-auto mt-10" style={{ background: "#44492B" }} />
        </section>

        {/* ── 5. ТАЙМИНГ ── */}
        {config.showSchedule && (
          <section className="w-full mb-14 animate-fade-up animate-delay-400">
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-8"
               style={{ color: "#44492B" }}>
              Программа
            </p>
            <div className="space-y-4">
              {config.schedule.map((item) => (
                <div
                  key={item.time}
                  className="flex items-baseline justify-between border-b pb-3"
                  style={{ borderColor: "rgba(68,73,43,0.3)" }}
                >
                  <span className="text-sm tracking-widest"
                        style={{ color: "#44492B" }}>
                    {item.time}
                  </span>
                  <span className="text-sm" style={{ color: "#252922" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 6. RSVP ── */}
        <section className="w-full animate-fade-up animate-delay-500" id="rsvp">
          <p className="text-xs tracking-[0.2em] uppercase text-center mb-8"
             style={{ color: "#44492B" }}>
            Подтвердить присутствие
          </p>
          <RsvpForm />
        </section>

        {/* ── 7. ФУТЕР ── */}
        <footer className="w-full text-center mt-16 pt-8 animate-fade-up animate-delay-600"
                style={{ borderTop: "1px solid rgba(68,73,43,0.3)" }}>
          <p className="text-sm font-medium mb-1" style={{ color: "#252922" }}>
            {config.names.groom} &amp; {config.names.bride}
          </p>
          <p className="text-xs tracking-widest mb-4" style={{ color: "#44492B" }}>
            {config.date}
          </p>
          <p className="text-xs" style={{ color: "#252922", opacity: 0.6 }}>
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
