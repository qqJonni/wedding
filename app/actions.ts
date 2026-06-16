"use server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

async function sendToTelegram(text: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("[RSVP] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы");
    throw new Error("telegram not configured");
  }

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[RSVP] Telegram error:", body);
    throw new Error("telegram send failed");
  }
}

export async function submitRsvp(
  _prev: { status: string } | null,
  formData: FormData
): Promise<{ status: "success" | "error"; message?: string }> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const hp   = formData.get("_hp") as string;

    if (hp) return { status: "success" }; // honeypot

    if (!name) return { status: "error", message: "Введите имя" };

    const attending = formData.get("attending") as string;
    const allergy   = (formData.get("allergy") as string)?.trim() || "—";
    const alcohol   = formData.getAll("alcohol").join(", ") || "—";
    const comment   = (formData.get("comment") as string)?.trim() || "—";
    const created   = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    const text =
      `<b>Новый ответ на приглашение</b>\n` +
      `${created}\n\n` +
      `<b>Имя:</b> ${escapeHtml(name)}\n` +
      `<b>Придёт:</b> ${attending === "yes" ? "Буду" : "Не смогу"}\n` +
      `<b>Аллергия:</b> ${escapeHtml(allergy)}\n` +
      `<b>Алкоголь:</b> ${escapeHtml(alcohol)}\n` +
      `<b>Пожелания:</b> ${escapeHtml(comment)}`;

    await sendToTelegram(text);

    return { status: "success" };
  } catch (e) {
    console.error("[RSVP]", e);
    return { status: "error", message: "Ошибка сервера" };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
