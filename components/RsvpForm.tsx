"use client";

import { useState } from "react";

const C = {
  light: "#EDEAE3",
  accent: "#8A937F",
  dark: "#3F4244",
  frost: "#F7F7F5",
  taupe: "#C2A19B",
};

type FormState = "idle" | "submitting" | "success" | "error";
type Attending = "yes" | "no" | "";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [guestCount, setGuestCount] = useState(0);
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Пожалуйста, введите ваше имя";
    if (!attending) e.attending = "Выберите вариант ответа";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setFormState("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          guestCount: attending === "yes" ? guestCount : 0,
          comment: comment.trim(),
          _hp: honeypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.alreadySubmitted) { setFormState("success"); return; }
        throw new Error("server error");
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div
        className="w-full text-center py-10 sm:py-12 px-6 animate-fade-up"
        style={{ background: C.light }}
      >
        <p className="text-xl sm:text-2xl font-medium mb-3" style={{ color: C.dark }}>
          Спасибо!
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: C.dark, opacity: 0.75 }}
        >
          Ваш ответ записан. Мы очень ждём вас.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full space-y-5 sm:space-y-6"
      style={{ background: C.light, padding: "1.5rem 1.25rem" }}
    >
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="hp_field">Не заполняйте это поле</label>
        <input
          id="hp_field"
          name="hp_field"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Имя */}
      <div>
        <label
          htmlFor="name"
          className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-2"
          style={{ color: C.accent }}
        >
          Имя и фамилия <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
          placeholder="Иван Иванов"
          autoComplete="name"
          /* text-base предотвращает авто-зум на iOS (шрифт < 16px = зум) */
          className="w-full px-0 py-3 text-base sm:text-sm border-b bg-transparent transition-colors placeholder:opacity-40"
          style={{ borderColor: errors.name ? C.taupe : C.accent, color: C.dark, outline: "none" }}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-xs mt-1" style={{ color: C.taupe }}>{errors.name}</p>
        )}
      </div>

      {/* Придёте? */}
      <div>
        <p
          className="text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-3"
          style={{ color: C.accent }}
          id="attending-label"
        >
          Придёте? <span aria-hidden="true">*</span>
        </p>
        {/* Стекаем кнопки на совсем маленьких экранах */}
        <div
          className="grid grid-cols-2 gap-2 sm:gap-3"
          role="radiogroup"
          aria-labelledby="attending-label"
        >
          {[
            { value: "yes", label: "Буду" },
            { value: "no", label: "Не смогу" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center justify-center py-4 sm:py-3 px-2 sm:px-4 text-sm cursor-pointer border transition-all duration-150 text-center leading-tight"
              style={{
                borderColor: attending === opt.value ? C.dark : C.accent,
                background: attending === opt.value ? C.dark : "transparent",
                color: attending === opt.value ? C.light : C.dark,
                /* Минимум 44px для комфортного тапа */
                minHeight: "44px",
              }}
            >
              <input
                type="radio"
                name="attending"
                value={opt.value}
                checked={attending === opt.value}
                onChange={() => {
                  setAttending(opt.value as Attending);
                  setErrors((p) => ({ ...p, attending: "" }));
                }}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.attending && (
          <p className="text-xs mt-1" style={{ color: C.taupe }}>{errors.attending}</p>
        )}
      </div>

      {/* Кол-во гостей */}
      {attending === "yes" && (
        <div className="animate-fade-up">
          <label
            htmlFor="guest-count"
            className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-2"
            style={{ color: C.accent }}
          >
            Гостей с вами (кроме вас)
          </label>
          <select
            id="guest-count"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full px-0 py-3 text-base sm:text-sm border-b bg-transparent appearance-none cursor-pointer"
            style={{ borderColor: C.accent, color: C.dark, outline: "none" }}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n} style={{ background: C.light }}>
                {n === 0 ? "Приду один(а)" : `+${n} человек`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Комментарий */}
      <div>
        <label
          htmlFor="comment"
          className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-2"
          style={{ color: C.accent }}
        >
          Пожелания (необязательно)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Предпочтения по меню, особые пожелания…"
          rows={3}
          className="w-full px-0 py-3 text-base sm:text-sm border-b bg-transparent resize-none placeholder:opacity-40"
          style={{ borderColor: C.accent, color: C.dark, outline: "none" }}
        />
      </div>

      {formState === "error" && (
        <p className="text-sm text-center" style={{ color: C.taupe }}>
          Что-то пошло не так. Попробуйте ещё раз.
        </p>
      )}

      {/* Кнопка — высота 52px для удобного тапа на мобиле */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-50 active:opacity-70"
        style={{
          background: C.dark,
          color: C.light,
          height: "52px",
        }}
        onMouseEnter={(e) => {
          if (formState !== "submitting")
            (e.currentTarget as HTMLButtonElement).style.background = C.accent;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = C.dark;
        }}
      >
        {formState === "submitting" ? "Отправляем…" : "Подтвердить"}
      </button>
    </form>
  );
}
