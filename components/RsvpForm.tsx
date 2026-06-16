"use client";

import { useActionState, useState } from "react";
import { submitRsvp } from "@/app/actions";

const C = {
  light:  "#EDEAE3",
  accent: "#8A937F",
  dark:   "#3F4244",
  taupe:  "#C2A19B",
  bg:     "#D7D1C6",
};

const ALCOHOL_OPTIONS = [
  "Вино белое",
  "Вино красное",
  "Шампанское",
  "Водка",
  "Коньяк",
  "Не буду пить",
];

export default function RsvpForm() {
  const [state, action, pending] = useActionState(submitRsvp, null);
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [alcohol, setAlcohol]     = useState<string[]>([]);

  function toggleAlcohol(opt: string) {
    setAlcohol((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  }

  if (state?.status === "success") {
    return (
      <div className="w-full text-center py-10 px-6 animate-fade-up" style={{ background: C.light }}>
        <p className="text-[30px] sm:text-[36px] font-medium mb-3" style={{ color: C.dark }}>
          Спасибо!
        </p>
        <p className="text-[21px] leading-relaxed" style={{ color: C.dark, opacity: 0.75 }}>
          Ваш ответ записан. Мы очень ждём вас.
        </p>
      </div>
    );
  }

  const btnStyle = (active: boolean) => ({
    borderColor: active ? C.dark : C.accent,
    background:  active ? C.dark : "transparent",
    color:       active ? C.light : C.dark,
    minHeight:   "52px",
    border:      `1px solid ${active ? C.dark : C.accent}`,
    cursor:      "pointer",
    transition:  "all 0.15s",
  });

  return (
    <form action={action} noValidate className="w-full space-y-6" style={{ background: C.light, padding: "1.5rem 1.25rem" }}>
      {/* Honeypot */}
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

      {/* Имя */}
      <div>
        <label htmlFor="rsvp-name" className="block text-[15px] sm:text-[18px] tracking-[0.15em] uppercase mb-2" style={{ color: C.accent }}>
          Имя и фамилия <span aria-hidden>*</span>
        </label>
        <input
          id="rsvp-name"
          name="name"
          type="text"
          required
          placeholder="Иван Иванов"
          autoComplete="name"
          className="w-full px-0 py-3 text-[18px] sm:text-[21px] border-b bg-transparent placeholder:opacity-40"
          style={{ borderColor: C.accent, color: C.dark, outline: "none" }}
        />
      </div>

      {/* Придёте? */}
      <div>
        <p className="text-[15px] sm:text-[18px] tracking-[0.15em] uppercase mb-3" style={{ color: C.accent }}>
          Придёте? <span aria-hidden>*</span>
        </p>
        {/* hidden input carries the value */}
        <input type="hidden" name="attending" value={attending} />
        <div className="grid grid-cols-2 gap-2">
          {(["yes", "no"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAttending(v)}
              className="py-4 text-[21px] text-center"
              style={btnStyle(attending === v)}
            >
              {v === "yes" ? "Буду" : "Не смогу"}
            </button>
          ))}
        </div>
      </div>

      {/* Аллергия */}
      <div>
        <label htmlFor="rsvp-allergy" className="block text-[15px] sm:text-[18px] tracking-[0.15em] uppercase mb-2" style={{ color: C.accent }}>
          Есть ли аллергия? На что?
        </label>
        <input
          id="rsvp-allergy"
          name="allergy"
          type="text"
          placeholder="Например: орехи, цитрусовые, нет"
          className="w-full px-0 py-3 text-[18px] sm:text-[21px] border-b bg-transparent placeholder:opacity-40"
          style={{ borderColor: C.accent, color: C.dark, outline: "none" }}
        />
      </div>

      {/* Алкоголь */}
      <div>
        <p className="text-[15px] sm:text-[18px] tracking-[0.15em] uppercase mb-3" style={{ color: C.accent }}>
          Предпочтения по алкоголю
        </p>
        {/* multiple hidden inputs for alcohol */}
        {alcohol.map((opt) => (
          <input key={opt} type="hidden" name="alcohol" value={opt} />
        ))}
        <div className="grid grid-cols-2 gap-2">
          {ALCOHOL_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleAlcohol(opt)}
              className="py-3 px-2 text-[18px] text-center leading-tight"
              style={btnStyle(alcohol.includes(opt))}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Комментарий */}
      <div>
        <label htmlFor="rsvp-comment" className="block text-[15px] sm:text-[18px] tracking-[0.15em] uppercase mb-2" style={{ color: C.accent }}>
          Пожелания (необязательно)
        </label>
        <textarea
          id="rsvp-comment"
          name="comment"
          placeholder="Особые пожелания…"
          rows={3}
          className="w-full px-0 py-3 text-[18px] sm:text-[21px] border-b bg-transparent resize-none placeholder:opacity-40"
          style={{ borderColor: C.accent, color: C.dark, outline: "none" }}
        />
      </div>

      {state?.status === "error" && (
        <p className="text-[18px] text-center" style={{ color: C.taupe }}>
          {state.message ?? "Что-то пошло не так. Попробуйте ещё раз."}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full text-[18px] sm:text-[21px] tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-50"
        style={{ background: C.dark, color: C.light, height: "56px", border: "none", cursor: "pointer" }}
      >
        {pending ? "Отправляем…" : "Подтвердить"}
      </button>
    </form>
  );
}
