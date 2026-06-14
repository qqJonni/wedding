# Свадебный сайт-приглашение

Одностраничный сайт с RSVP-формой. Стек: Next.js 15 + TypeScript + Tailwind CSS.

---

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # заполните переменные (см. ниже)
npm run dev
```

Открыть: http://localhost:3000

---

## Где менять контент

Все тексты, имена, даты и ссылки — в одном файле:

```
content.ts
```

Переменные:
- `names` — имена жениха и невесты
- `date`, `time` — дата и время
- `venue` — название площадки, адрес, ссылка на карты (`mapUrl`)
- `inviteText` — короткий текст приглашения
- `showSchedule` — показывать/скрывать тайминг (`true`/`false`)
- `schedule` — пункты программы дня
- `contact` — телефон/ссылка в футере
- `seo` — заголовок, описание и путь к OG-картинке

**OG-картинка:** положите файл в `public/og-image.jpg` (рекомендуемый размер 1200×630 px).

---

## Настройка RSVP

Скопируйте `.env.example` в `.env.local` и заполните нужные значения.  
Можно использовать **Google Sheets**, **Email**, или оба варианта одновременно.

### Вариант A — Google Sheets

1. Откройте [Google Cloud Console](https://console.cloud.google.com/).
2. Создайте проект → включите **Google Sheets API**.
3. IAM → Сервисные аккаунты → Создать аккаунт → скачайте JSON с ключом.
4. Создайте Google Таблицу. Дайте доступ (Редактор) email сервисного аккаунта.
5. Скопируйте ID таблицы из URL: `spreadsheets/d/<ЭТОТ_ID>/edit`.

```env
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

> Значение `GOOGLE_SERVICE_ACCOUNT_JSON` — это содержимое JSON-файла одной строкой.

### Вариант B — Email (Gmail)

1. Включите двухфакторную аутентификацию на Gmail.
2. Откройте [App Passwords](https://myaccount.google.com/apppasswords) → создайте пароль для «Mail».
3. Заполните переменные:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx   # App Password (без пробелов)
SMTP_FROM=your@gmail.com
RSVP_EMAIL_TO=your@gmail.com    # куда приходят уведомления
```

> Если оба варианта настроены — ответы сохраняются в таблицу **и** приходят на почту.  
> Если ни один не настроен — в режиме разработки ответы выводятся в консоль сервера.

---

## Деплой на Vercel

1. Залейте проект на GitHub.
2. Войдите на [vercel.com](https://vercel.com) → **Add New Project** → выберите репозиторий.
3. В настройках проекта → **Environment Variables** — добавьте все переменные из `.env.local`.
4. Нажмите **Deploy**.

После деплоя Vercel даст вам URL — вставьте его в QR-код.

---

## Структура файлов

```
content.ts          ← весь редактируемый контент
app/
  layout.tsx        ← шрифты, metadata
  page.tsx          ← главная страница
  globals.css       ← цвета, анимации
  api/rsvp/
    route.ts        ← API: сохранение ответов
components/
  RsvpForm.tsx      ← форма с валидацией
  DecorCircles.tsx  ← декоративные круги
public/
  og-image.jpg      ← замените на реальную картинку
.env.local          ← ваши секреты (не коммитить!)
.env.example        ← шаблон переменных
```
