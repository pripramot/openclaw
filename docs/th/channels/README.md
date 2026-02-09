# ช่องทาง OpenClaw

OpenClaw รองรับช่องทางการสื่อสารหลากหลาย ทำให้คุณสามารถโต้ตอบกับ AI assistant ผ่านแพลตฟอร์มที่คุณใช้อยู่แล้ว

## 🌐 ช่องทางที่รองรับ

### ช่องทางหลัก (Built-in)

- ✅ **[WhatsApp](whatsapp.md)** - ผ่าน WhatsApp Web (Baileys)
- ✅ **[Telegram](telegram.md)** - Telegram Bot API
- ✅ **[Discord](discord.md)** - Discord Bot
- ✅ **[Slack](../channels/slack.md)** - Slack App
- ✅ **[iMessage](../channels/imessage.md)** - macOS เท่านั้น
- ✅ **[Signal](../channels/signal.md)** - ผ่าน signal-cli
- ✅ **[LINE](line.md)** - LINE Official Account (เร็วๆ นี้)

### ช่องทางส่วนขยาย (Extensions)

- 📦 **Microsoft Teams** - Teams Bot
- 📦 **Matrix** - Matrix Protocol
- 📦 **BlueBubbles** - iMessage relay
- 📦 **Zalo** - Zalo Official Account
- 📦 **Google Chat** - Google Chat API

### ช่องทางเว็บ

- 🌐 **WebChat** - Web UI แบบฝังตัว
- 🌐 **Control UI** - Dashboard สำหรับจัดการ

## 🚀 เริ่มต้นใช้งาน

### 1. ติดตั้ง OpenClaw

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### 2. เชื่อมต่อช่องทาง

#### WhatsApp
```bash
openclaw channels login whatsapp
# สแกน QR code ด้วยแอป WhatsApp
```

#### Telegram
```bash
openclaw channels login telegram
# ป้อน bot token จาก @BotFather
```

#### Discord
```bash
openclaw channels login discord
# ป้อน bot token จาก Discord Developer Portal
```

#### LINE
```bash
openclaw channels login line
# ป้อน Channel Access Token และ Channel Secret
```

### 3. ตรวจสอบสถานะ

```bash
openclaw channels status
```

## ⚙️ การตั้งค่าช่องทาง

### ไฟล์การตั้งค่า

แก้ไข `~/.openclaw/openclaw.json`:

```json5
{
  channels: {
    // WhatsApp
    whatsapp: {
      enabled: true,
      allowFrom: ["+66812345678"], // เบอร์ที่อนุญาต
      groups: {
        "*": {
          requireMention: true, // ต้องแท็กบอทในกลุ่ม
        },
      },
    },
    
    // Telegram
    telegram: {
      enabled: true,
      botToken: process.env.TELEGRAM_BOT_TOKEN,
      dmPolicy: "pairing", // pairing | open | closed
    },
    
    // Discord
    discord: {
      enabled: true,
      botToken: process.env.DISCORD_BOT_TOKEN,
      dm: {
        policy: "pairing",
        allowFrom: ["123456789"], // Discord User IDs
      },
    },
    
    // LINE
    line: {
      enabled: true,
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    },
  },
}
```

### นโยบายการเข้าถึง

#### DM Policy (Direct Message)

- **`pairing`** (แนะนำ): ผู้ใช้ต้องได้รับการอนุมัติก่อน
- **`open`**: ยอมรับข้อความจากทุกคน
- **`closed`**: ปิดการรับข้อความ DM

#### Group Policy

- **`requireMention: true`**: ต้องแท็กบอทในกลุ่ม
- **`requireMention: false`**: ตอบทุกข้อความในกลุ่ม

### การกำหนดสิทธิ์

```json5
{
  channels: {
    whatsapp: {
      // อนุญาตเฉพาะเบอร์เหล่านี้
      allowFrom: [
        "+66812345678",
        "+66898765432",
      ],
      
      // การตั้งค่ากลุ่ม
      groups: {
        // กลุ่มเฉพาะ
        "120363123456789@g.us": {
          requireMention: false,
          allowFrom: "*",
        },
        
        // กลุ่มอื่นๆ
        "*": {
          requireMention: true,
        },
      },
    },
  },
}
```

## 🔐 ความปลอดภัย

### แนวทางความปลอดภัย

1. **ใช้ DM Policy แบบ pairing**: ป้องกันผู้ใช้ที่ไม่ได้รับอนุญาต
2. **จำกัด allowFrom**: ระบุรายการเบอร์/ID ที่อนุญาต
3. **เปิด requireMention ในกลุ่ม**: หลีกเลี่ยงการตอบข้อความทั้งหมด
4. **เก็บ tokens ปลอดภัย**: ใช้ environment variables
5. **ตรวจสอบสถานะ**: รัน `openclaw doctor` เป็นประจำ

### การจัดการ Tokens

```bash
# ใช้ environment variables
export TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ"
export DISCORD_BOT_TOKEN="MTIzNDU2Nzg5MA.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQr"

# หรือเก็บในไฟล์ .env
echo 'TELEGRAM_BOT_TOKEN="..."' >> ~/.openclaw/.env
echo 'DISCORD_BOT_TOKEN="..."' >> ~/.openclaw/.env
```

## 📊 คุณสมบัติแต่ละช่องทาง

| ช่องทาง | DM | กลุ่ม | สื่อ | เสียง | ตำแหน่ง |
|---------|:--:|:-----:|:----:|:-----:|:-------:|
| WhatsApp | ✅ | ✅ | ✅ | ✅ | ✅ |
| Telegram | ✅ | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ | ❌ |
| Slack | ✅ | ✅ | ✅ | ❌ | ❌ |
| LINE | ✅ | ✅ | ✅ | ✅ | ✅ |
| Signal | ✅ | ✅ | ✅ | ❌ | ❌ |
| iMessage | ✅ | ✅ | ✅ | ❌ | ❌ |

## 🔄 การจัดการหลายช่องทาง

### เชื่อมต่อหลายช่องทาง

```bash
# เชื่อมต่อทุกช่องทาง
openclaw channels login whatsapp
openclaw channels login telegram
openclaw channels login discord
openclaw channels login line

# ตรวจสอบสถานะทั้งหมด
openclaw channels status --all
```

### การกำหนดเส้นทาง (Routing)

```json5
{
  // กำหนดเส้นทางตาม agent
  routing: {
    rules: [
      {
        // Telegram -> Agent A
        from: { channel: "telegram" },
        to: { agentId: "agent-a" },
      },
      {
        // WhatsApp -> Agent B
        from: { channel: "whatsapp" },
        to: { agentId: "agent-b" },
      },
    ],
  },
}
```

## 🛠️ คำสั่ง CLI

```bash
# ดูช่องทางทั้งหมด
openclaw channels list

# เข้าสู่ระบบช่องทาง
openclaw channels login <channel>

# ออกจากระบบ
openclaw channels logout <channel>

# ตรวจสอบสถานะ
openclaw channels status

# ตรวจสอบสถานะแบบละเอียด
openclaw channels status --probe

# รีสตาร์ทช่องทาง
openclaw channels restart <channel>
```

## 🐛 การแก้ไขปัญหา

### ปัญหาทั่วไป

#### ช่องทางไม่เชื่อมต่อ

```bash
# ตรวจสอบ logs
openclaw logs --channel whatsapp --tail 100

# รีสตาร์ท Gateway
openclaw gateway restart
```

#### ข้อความไม่ถูกส่ง

```bash
# ตรวจสอบการตั้งค่า
openclaw config get channels

# ตรวจสอบสิทธิ์
openclaw pairing list
```

#### Token หมดอายุ

```bash
# ล็อกอินใหม่
openclaw channels logout <channel>
openclaw channels login <channel>
```

### ดู Logs

```bash
# Logs ของช่องทางเฉพาะ
openclaw logs --channel telegram

# Logs ทั้งหมด
openclaw logs --all

# ติดตาม logs แบบเรียลไทม์
openclaw logs --channel whatsapp --follow
```

## 📚 เรียนรู้เพิ่มเติม

### คู่มือแต่ละช่องทาง

- [WhatsApp](whatsapp.md) - ตั้งค่า WhatsApp Web
- [Telegram](telegram.md) - สร้าง Telegram Bot
- [Discord](discord.md) - ตั้งค่า Discord Bot
- [LINE](line.md) - ตั้งค่า LINE Official Account

### หัวข้ออื่นๆ

- [การตั้งค่า](../configuration.md) - การตั้งค่าขั้นสูง
- [ความปลอดภัย](../security.md) - แนวทางความปลอดภัย
- [การแก้ไขปัญหา](../troubleshooting.md) - วิธีแก้ไขปัญหา

## 💬 ต้องการความช่วยเหลือ?

- 💬 [Discord Community](https://discord.gg/clawd)
- 🐛 [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- 📖 [เอกสารภาษาอังกฤษ](https://docs.openclaw.ai/channels)

---

**เชื่อมต่อทุกช่องทางแล้ว? เริ่มใช้งาน OpenClaw!** 🦞
