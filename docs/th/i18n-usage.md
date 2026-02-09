# การใช้งาน i18n ใน OpenClaw

คู่มือสำหรับนักพัฒนาที่ต้องการใช้ระบบ i18n (Internationalization) ใน OpenClaw

## ภาพรวม

ระบบ i18n ของ OpenClaw อยู่ใน `src/i18n/` และรองรับหลายภาษา:

- 🇺🇸 English (`en`)
- 🇹🇭 Thai (`th`)
- 🇨🇳 Chinese (`zh-CN`)

## การใช้งานพื้นฐาน

### การนำเข้า (Import)

```typescript
import { t, setLocale, getLocale, initI18n } from "@/i18n";
```

### การตั้งค่า Locale

```typescript
// ตั้งค่าภาษาไทย
setLocale("th");

// ตรวจสอบ locale ปัจจุบัน
const currentLocale = getLocale(); // "th"
```

### การแปลข้อความ

```typescript
// การแปลพื้นฐาน
const welcomeMessage = t("welcome");
// ภาษาไทย: "ยินดีต้อนรับสู่ OpenClaw"
// English: "Welcome to OpenClaw"

// การแปลแบบซ้อน (nested keys)
const statusText = t("commands.status");
// ภาษาไทย: "สถานะ"
// English: "Status"

// การแทนที่ค่า (placeholder replacement)
const startedMessage = t("gateway.started", { port: "18789" });
// ภาษาไทย: "Gateway เริ่มแล้วที่พอร์ต 18789"
// English: "Gateway started on port 18789"
```

## โครงสร้างไฟล์แปล

ไฟล์แปลอยู่ใน `src/i18n/locales/`:

```
src/i18n/
├── index.ts          # โมดูลหลัก i18n
├── index.test.ts     # การทดสอบ
└── locales/
    ├── en.json       # ภาษาอังกฤษ
    └── th.json       # ภาษาไทย
```

### โครงสร้าง JSON

```json
{
  "welcome": "ยินดีต้อนรับสู่ OpenClaw",
  "commands": {
    "status": "สถานะ",
    "reset": "รีเซ็ต"
  },
  "messages": {
    "error": "เกิดข้อผิดพลาด",
    "success": "สำเร็จ"
  }
}
```

## การเพิ่มภาษาใหม่

### 1. สร้างไฟล์แปลใหม่

สร้างไฟล์ `src/i18n/locales/{code}.json`:

```json
{
  "welcome": "Bienvenue à OpenClaw",
  "commands": {
    "status": "Statut",
    "reset": "Réinitialiser"
  }
}
```

### 2. อัปเดต Type Definition

แก้ไข `src/i18n/index.ts`:

```typescript
export type Locale = "en" | "th" | "zh-CN" | "fr"; // เพิ่ม "fr"
```

### 3. อัปเดตรายการภาษาที่รองรับ

```typescript
export function getSupportedLocales(): Locale[] {
  return ["en", "th", "zh-CN", "fr"]; // เพิ่ม "fr"
}
```

## การใช้งานใน CLI

```typescript
import { t } from "@/i18n";

export function statusCommand() {
  console.log(t("commands.status"));
  console.log(t("messages.connecting"));
  
  // แสดงข้อความหลังจากเชื่อมต่อ
  console.log(t("messages.connected"));
}
```

## การใช้งานใน UI

```typescript
import { t, setLocale } from "@/i18n";

// ตั้งค่าภาษาตามการตั้งค่าผู้ใช้
const userLocale = getUserPreference(); // "th", "en", etc.
setLocale(userLocale);

// ใช้ในคอมโพเนนต์
function WelcomeMessage() {
  return <h1>{t("welcome")}</h1>;
}

function StatusButton() {
  return <button>{t("commands.status")}</button>;
}
```

## การใช้งานใน Gateway

```typescript
import { t, initI18n } from "@/i18n";
import { config } from "@/config";

// เริ่มต้น i18n ด้วย locale จาก config
initI18n(config.locale);

// ใช้ในข้อความ log
console.log(t("gateway.starting"));

// ส่งข้อความแปลไปยังช่องทาง
async function sendStatusMessage(channel: string) {
  const status = t("status.online");
  await sendMessage(channel, status);
}
```

## การทดสอบ

```typescript
import { describe, it, expect } from "vitest";
import { setLocale, t } from "@/i18n";

describe("My Feature", () => {
  it("should display Thai message", () => {
    setLocale("th");
    const message = getWelcomeMessage();
    expect(message).toBe("ยินดีต้อนรับ");
  });

  it("should display English message", () => {
    setLocale("en");
    const message = getWelcomeMessage();
    expect(message).toBe("Welcome");
  });
});
```

## Best Practices

### 1. ใช้ Keys ที่มีความหมาย

❌ แย่:
```typescript
t("msg1")
t("txt.a")
```

✅ ดี:
```typescript
t("messages.success")
t("errors.not_found")
```

### 2. จัดกลุ่ม Keys ตามหมวดหมู่

```json
{
  "commands": { ... },
  "messages": { ... },
  "errors": { ... },
  "channels": { ... }
}
```

### 3. ใช้ Placeholders สำหรับค่าไดนามิก

❌ แย่:
```typescript
const message = `Gateway started on port ${port}`;
```

✅ ดี:
```typescript
const message = t("gateway.started", { port: port.toString() });
```

### 4. Fallback เป็นภาษาอังกฤษ

ระบบจะ fallback เป็นภาษาอังกฤษอัตโนมัติหาก key ไม่พบในภาษาปัจจุบัน

### 5. ตรวจสอบ Locale ก่อนใช้

```typescript
import { isLocaleSupported, setLocale } from "@/i18n";

const userLocale = getUserLocale();
if (isLocaleSupported(userLocale)) {
  setLocale(userLocale);
} else {
  setLocale("en"); // Fallback
}
```

## การกำหนดค่า Locale

### ใน Configuration File

```json
{
  "locale": "th-TH",
  "language": "th",
  "timezone": "Asia/Bangkok"
}
```

### ผ่าน Environment Variable

```bash
export OPENCLAW_LOCALE=th
export LANG=th_TH.UTF-8
```

### ใน Code

```typescript
import { initI18n } from "@/i18n";

// จาก config
initI18n(config.language);

// จาก environment
initI18n(process.env.OPENCLAW_LOCALE);

// ค่าเริ่มต้น
initI18n(); // จะตรวจสอบจาก environment อัตโนมัติ
```

## ตัวอย่างการใช้งานจริง

### ตัวอย่างที่ 1: Status Command

```typescript
import { t } from "@/i18n";

export async function showStatus() {
  console.log(`\n${t("commands.status")}:\n`);
  
  const channels = getActiveChannels();
  channels.forEach(channel => {
    const status = channel.connected 
      ? t("status.online")
      : t("status.offline");
    console.log(`  ${t(`channels.${channel.name}`)}: ${status}`);
  });
}
```

### ตัวอย่างที่ 2: Error Messages

```typescript
import { t } from "@/i18n";

export function handleError(error: Error) {
  let message: string;
  
  switch (error.code) {
    case "NOT_FOUND":
      message = t("errors.not_found");
      break;
    case "UNAUTHORIZED":
      message = t("errors.unauthorized");
      break;
    default:
      message = t("errors.internal_error");
  }
  
  console.error(message);
}
```

### ตัวอย่างที่ 3: Pairing Messages

```typescript
import { t } from "@/i18n";

export function sendPairingRequest(sender: string, code: string) {
  const message = t("pairing.request", { sender, code });
  // ภาษาไทย: "คำขอการจับคู่จาก user123 รหัส: ABC123"
  // English: "Pairing request from user123. Code: ABC123"
  
  return message;
}
```

## การแก้ไขปัญหา

### ข้อความไม่แปล

1. ตรวจสอบว่า locale ตั้งค่าถูกต้อง:
```typescript
console.log(getLocale()); // ควรเป็น "th", "en", etc.
```

2. ตรวจสอบว่า key มีอยู่ในไฟล์แปล:
```typescript
import translations from "@/i18n/locales/th.json";
console.log(translations.commands.status); // ควรแสดงค่า
```

3. ลองใช้ fallback เป็นภาษาอังกฤษ:
```typescript
setLocale("en");
console.log(t("your.key")); // ตรวจสอบว่ามีในภาษาอังกฤษหรือไม่
```

### Placeholder ไม่ทำงาน

ตรวจสอบว่าใช้รูปแบบถูกต้อง:

❌ แย่:
```json
{
  "message": "Port: $port"  // ผิด
}
```

✅ ดี:
```json
{
  "message": "Port: {port}"  // ถูก
}
```

## เอกสารเพิ่มเติม

- [เอกสาร i18n Tests](../src/i18n/index.test.ts)
- [ตัวอย่าง Configuration](../examples/th/)
- [คู่มือการพัฒนา](../../CONTRIBUTING.th.md)

## การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:

- 💬 [Discord](https://discord.gg/clawd)
- 🐛 [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- 📚 [เอกสาร](https://docs.openclaw.ai)
