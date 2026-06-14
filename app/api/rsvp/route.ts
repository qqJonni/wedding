import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// ── Типы ──────────────────────────────────────────────────────────────────────

interface RsvpPayload {
  name: string;
  attending: "yes" | "no";
  guestCount: number;
  comment: string;
  _hp: string; // honeypot
}

// ── Защита от дублей (in-memory, сбрасывается при деплое) ─────────────────────
// Для продакшна — используйте Redis или колонку в таблице Google Sheets.
const submitted = new Set<string>();

// ── Хелпер: Google Sheets ─────────────────────────────────────────────────────
async function appendToSheet(data: RsvpPayload) {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
    data.name,
    data.attending === "yes" ? "Буду" : "Не смогу",
    data.attending === "yes" ? data.guestCount : "-",
    data.comment || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Лист1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ── Хелпер: Email ─────────────────────────────────────────────────────────────
async function sendEmail(data: RsvpPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const attendingText = data.attending === "yes"
    ? `✅ Буду (+${data.guestCount} гостей)`
    : "❌ Не смогу";

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: process.env.RSVP_EMAIL_TO,
    subject: `RSVP: ${data.name}`,
    text: [
      `Имя: ${data.name}`,
      `Ответ: ${attendingText}`,
      `Комментарий: ${data.comment || "—"}`,
    ].join("\n"),
  });
}

// ── Обработчик POST ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: RsvpPayload = await req.json();

    // Honeypot — спам-бот заполнил скрытое поле
    if (body._hp) {
      return NextResponse.json({ ok: true }); // притворяемся успехом
    }

    // Защита от дублей по имени (простая проверка)
    const key = body.name.toLowerCase().trim();
    if (submitted.has(key)) {
      return NextResponse.json({ alreadySubmitted: true }, { status: 409 });
    }

    // Определяем метод хранения по переменным окружения
    const useSheets =
      !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON && !!process.env.GOOGLE_SHEET_ID;
    const useEmail =
      !!process.env.SMTP_HOST && !!process.env.RSVP_EMAIL_TO;

    if (!useSheets && !useEmail) {
      // В режиме разработки без настроек — просто логируем
      console.log("[RSVP dev]", body);
    } else {
      await Promise.all([
        useSheets ? appendToSheet(body) : Promise.resolve(),
        useEmail ? sendEmail(body) : Promise.resolve(),
      ]);
    }

    submitted.add(key);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[RSVP error]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
