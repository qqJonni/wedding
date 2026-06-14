"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type Attending = "yes" | "no" | "";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [guestCount, setGuestCount] = useState(0);
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState(""); // антиспам

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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

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
          _hp: honeypot, // honeypot для серверной проверки
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Если сервер вернул «уже отправлено» — считаем успехом
        if (data?.alreadySubmitted) {
          setFormState("success");
          return;
        }
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
        className="w-full text-center py-12 px-6 rounded-sm animate-fade-up"
        style={{ background: "#DDCEBC" }}
      >
        <p className="text-2xl font-medium mb-3" style={{ color: "#252922" }}>
          Спасибо!
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#252922", opacity: 0.8 }}>
          Ваш ответ записан. Мы очень ждём вас.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full space-y-6"
      style={{ background: "#DDCEBC", padding: "2rem 1.5rem", borderRadius: "2px" }}
    >
      {/* Honeypot — скрытое поле, боты заполняют его, люди нет */}
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
          className="block text-xs tracking-[0.15em] uppercase mb-2"
          style={{ color: "#44492B" }}
        >
          Имя и фамилия <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          placeholder="Иван Иванов"
          autoComplete="name"
          className="w-full px-4 py-3 text-sm border-b bg-transparent transition-colors placeholder:opacity-40"
          style={{
            borderColor: errors.name ? "#C2A19B" : "#44492B",
            color: "#252922",
            outline: "none",
          }}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" className="text-xs mt-1" style={{ color: "#C2A19B" }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Придёте? */}
      <div>
        <p
          className="text-xs tracking-[0.15em] uppercase mb-3"
          style={{ color: "#44492B" }}
          id="attending-label"
        >
          Придёте? <span aria-hidden="true">*</span>
        </p>
        <div
          className="grid grid-cols-2 gap-3"
          role="radiogroup"
          aria-labelledby="attending-label"
        >
          {[
            { value: "yes", label: "Буду" },
            { value: "no", label: "К сожалению, не смогу" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center justify-center py-3 px-4 text-sm cursor-pointer border transition-all duration-150"
              style={{
                borderColor: attending === opt.value ? "#252922" : "#44492B",
                background: attending === opt.value ? "#252922" : "transparent",
                color: attending === opt.value ? "#DDCEBC" : "#252922",
              }}
            >
              <input
                type="radio"
                name="attending"
                value={opt.value}
                checked={attending === opt.value}
                onChange={() => {
                  setAttending(opt.value as Attending);
                  setErrors((prev) => ({ ...prev, attending: "" }));
                }}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.attending && (
          <p className="text-xs mt-1" style={{ color: "#C2A19B" }}>
            {errors.attending}
          </p>
        )}
      </div>

      {/* Количество гостей (только если «Буду») */}
      {attending === "yes" && (
        <div className="animate-fade-up">
          <label
            htmlFor="guest-count"
            className="block text-xs tracking-[0.15em] uppercase mb-2"
            style={{ color: "#44492B" }}
          >
            Гостей с вами (кроме вас)
          </label>
          <select
            id="guest-count"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full px-4 py-3 text-sm border-b bg-transparent appearance-none cursor-pointer"
            style={{ borderColor: "#44492B", color: "#252922", outline: "none" }}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n} style={{ background: "#DDCEBC" }}>
                {n === 0 ? "Приду один(а)" : `+${n}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Комментарий / пожелание */}
      <div>
        <label
          htmlFor="comment"
          className="block text-xs tracking-[0.15em] uppercase mb-2"
          style={{ color: "#44492B" }}
        >
          Пожелания (необязательно)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Предпочтения по меню, особые пожелания…"
          rows={3}
          className="w-full px-4 py-3 text-sm border-b bg-transparent resize-none placeholder:opacity-40"
          style={{ borderColor: "#44492B", color: "#252922", outline: "none" }}
        />
      </div>

      {/* Ошибка сервера */}
      {formState === "error" && (
        <p className="text-sm text-center" style={{ color: "#C2A19B" }}>
          Что-то пошло не так. Попробуйте ещё раз.
        </p>
      )}

      {/* Кнопка */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-50"
        style={{
          background: "#252922",
          color: "#DDCEBC",
        }}
        onMouseEnter={(e) => {
          if (formState !== "submitting") {
            (e.currentTarget as HTMLButtonElement).style.background = "#44492B";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#252922";
        }}
      >
        {formState === "submitting" ? "Отправляем…" : "Подтвердить"}
      </button>
    </form>
  );
}
