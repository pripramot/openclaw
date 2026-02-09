# เริ่มต้นใช้งาน OpenClaw

คู่มือนี้จะแนะนำคุณผ่านขั้นตอนการตั้งค่า OpenClaw ตั้งแต่เริ่มต้น

## ✅ ความต้องการ

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าคุณมี:

- **Node.js ≥ 22** - [ดาวน์โหลด Node.js](https://nodejs.org/)
- **npm, pnpm หรือ bun** - ตัวจัดการแพ็คเกจ
- **บัญชี Anthropic หรือ OpenAI** - สำหรับ AI models
- **ระบบปฏิบัติการที่รองรับ:**
  - macOS (แนะนำ)
  - Linux
  - Windows (ผ่าน WSL2)

## 🚀 การติดตั้งอย่างรวดเร็ว

### ขั้นตอนที่ 1: ติดตั้ง OpenClaw

เปิด terminal และรันคำสั่ง:

```bash
npm install -g openclaw@latest
```

หรือด้วย pnpm:

```bash
pnpm add -g openclaw@latest
```

### ขั้นตอนที่ 2: รันตัวช่วยติดตั้งเบื้องต้น

```bash
openclaw onboard --install-daemon
```

ตัวช่วยจะแนะนำคุณผ่าน:
- ✅ การตั้งค่า Gateway
- ✅ การยืนยันตัวตน AI models
- ✅ การตั้งค่าช่องทาง (Channels)
- ✅ การติดตั้ง daemon

### ขั้นตอนที่ 3: เริ่ม Gateway

หลังจากการติดตั้งเบื้องต้น Gateway จะเริ่มโดยอัตโนมัติ

ตรวจสอบสถานะ:

```bash
openclaw gateway status
```

เริ่มด้วยตนเอง (ถ้าจำเป็น):

```bash
openclaw gateway --port 18789 --verbose
```

### ขั้นตอนที่ 4: เชื่อมต่อช่องทาง

เชื่อมต่อกับช่องทางที่คุณต้องการ:

#### WhatsApp
```bash
openclaw channels login whatsapp
```
สแกน QR code ด้วยแอป WhatsApp ของคุณ

#### Telegram
```bash
openclaw channels login telegram
```
ป้อน bot token ของคุณ

#### Discord
```bash
openclaw channels login discord
```
ป้อน bot token ของคุณ

### ขั้นตอนที่ 5: ทดสอบ

ส่งข้อความทดสอบ:

```bash
openclaw agent --message "สวัสดี! คุณทำงานไหม?" --thinking high
```

## 🎯 ขั้นตอนต่อไป

### ตั้งค่าช่องทางเพิ่มเติม

- [Telegram Bot](../channels/telegram.md)
- [Discord Bot](../channels/discord.md)
- [WhatsApp Web](../channels/whatsapp.md)
- [LINE Official Account](../channels/line.md)

### ปรับแต่งการตั้งค่า

แก้ไขไฟล์การตั้งค่าของคุณที่ `~/.openclaw/openclaw.json`:

```json5
{
  // ตั้งค่า locale เป็นภาษาไทย
  locale: "th-TH",
  timezone: "Asia/Bangkok",
  
  // การตั้งค่า Agent
  agent: {
    model: "anthropic/claude-opus-4-5",
  },
  
  // การตั้งค่าช่องทาง
  channels: {
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN,
    },
    whatsapp: {
      allowFrom: ["+66812345678"], // เบอร์โทรศัพท์ของคุณ
    },
  },
}
```

ดูรายละเอียดเพิ่มเติม: [คู่มือการตั้งค่า](configuration.md)

### ติดตั้งแอปพลิเคชันสหาย

- **macOS**: ดาวน์โหลดแอป menu bar จาก [Releases](https://github.com/openclaw/openclaw/releases)
- **iOS**: สร้างจาก source หรือรอ TestFlight
- **Android**: สร้างจาก source

## 🔧 การแก้ไขปัญหาทั่วไป

### Gateway ไม่เริ่มทำงาน

```bash
# ตรวจสอบพอร์ต
ss -ltnp | grep 18789

# หยุด process ที่มีอยู่
pkill -f openclaw-gateway

# เริ่มใหม่
openclaw gateway --port 18789 --verbose
```

### ไม่สามารถเชื่อมต่อ WhatsApp

1. ตรวจสอบว่า WhatsApp Web ไม่ได้เปิดในที่อื่น
2. ลบเซสชัน: `rm -rf ~/.openclaw/sessions/whatsapp`
3. ลองเข้าสู่ระบบอีกครั้ง: `openclaw channels login whatsapp`

### Model API ใช้งานไม่ได้

1. ตรวจสอบ API keys ของคุณ
2. รัน `openclaw doctor` เพื่อตรวจสอบการตั้งค่า
3. ตรวจสอบไฟล์ auth: `~/.openclaw/auth-profiles.json`

## 📚 แหล่งข้อมูลเพิ่มเติม

- [คู่มือการติดตั้ง](installation.md) - คำแนะนำการติดตั้งโดยละเอียด
- [สถาปัตยกรรม](architecture.md) - เข้าใจวิธีการทำงานของ OpenClaw
- [การแก้ไขปัญหา](troubleshooting.md) - วิธีแก้ไขปัญหาทั่วไป
- [API Reference](api/cli.md) - คำสั่ง CLI ทั้งหมด

## 💬 ต้องการความช่วยเหลือ?

- 💬 [Discord](https://discord.gg/clawd) - ชุมชนและการสนับสนุน
- 🐛 [GitHub Issues](https://github.com/openclaw/openclaw/issues) - รายงานบั๊ก
- 📖 [เอกสารเต็ม](https://docs.openclaw.ai) - เอกสารภาษาอังกฤษ

---

**เริ่มต้นแล้ว? ลองส่งข้อความถึง OpenClaw ของคุณ!** 🦞
