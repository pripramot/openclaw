# ช่องทาง

OpenClaw รองรับช่องทางการส่งข้อความหลายช่องทาง ทำให้คุณสามารถโต้ตอบกับผู้ช่วย AI ผ่านแพลตฟอร์มที่คุณใช้อยู่แล้ว

## ช่องทางที่รองรับ

### ช่องทางหลัก (Built-in)

- 📱 **WhatsApp** — ผ่าน WhatsApp Web (Baileys)
- ✈️ **Telegram** — Bot API (grammY)
- 💬 **Discord** — Bot API (discord.js)
- 🗨️ **Slack** — Bot API (Bolt)
- 📧 **Google Chat** — Chat API
- 🔐 **Signal** — signal-cli
- 💬 **iMessage** — imsg CLI (macOS)
- 🌐 **WebChat** — อินเทอร์เฟซเว็บในตัว

### ช่องทางส่วนขยาย (Extensions)

- 💙 **BlueBubbles** — ข้อความ iOS ผ่าน BlueBubbles
- 🎮 **Matrix** — โปรโตคอล Matrix
- 👥 **Microsoft Teams** — Teams Bot API
- 🇻🇳 **Zalo** — Zalo Bot API
- 👤 **Zalo Personal** — บัญชี Zalo ส่วนตัว

## WhatsApp

### คุณสมบัติ

- ✅ การส่งและรับข้อความ
- ✅ รูปภาพ เสียง วิดีโอ
- ✅ การแชทกลุ่ม
- ✅ การตอบกลับและการอ้างอิง
- ✅ การแจ้งเตือนการพิมพ์

### การตั้งค่า

```bash
openclaw channels login
```

สแกน QR code ด้วยแอป WhatsApp ของคุณ:

1. เปิด WhatsApp
2. ไปที่ **ตั้งค่า** > **อุปกรณ์ที่เชื่อมโยง**
3. แตะ **เชื่อมโยงอุปกรณ์**
4. สแกน QR code ที่แสดงในเทอร์มินัล

### การกำหนดค่า

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "allowFrom": ["+66812345678"],
      "groups": {
        "*": {
          "requireMention": true
        },
        "120363XXXXX@g.us": {
          "requireMention": false
        }
      }
    }
  }
}
```

### การแก้ไขปัญหา

- **QR code หมดอายุ**: รันอีกครั้ง `openclaw channels login`
- **การเชื่อมต่อขาดหาย**: ตรวจสอบ `~/.openclaw/sessions/whatsapp/`
- **ไม่ได้รับข้อความกลุ่ม**: ตรวจสอบ `requireMention` setting

## Telegram

### คุณสมบัติ

- ✅ บอทแบบกำหนดเอง
- ✅ การแชทส่วนตัว
- ✅ กลุ่มและ supergroups
- ✅ ไฟล์และสื่อ
- ✅ Inline keyboards
- ✅ คำสั่งบอท

### การตั้งค่า

1. **สร้างบอท**:
   - ไปที่ [@BotFather](https://t.me/botfather)
   - ส่ง `/newbot`
   - ตั้งชื่อบอทของคุณ
   - คัดลอกโทเค็น API

2. **กำหนดค่า OpenClaw**:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
      "allowFrom": ["@yourusername"],
      "dm": {
        "policy": "pairing"
      }
    }
  }
}
```

3. **เริ่มแชท**:
   - ค้นหาบอทของคุณบน Telegram
   - ส่ง `/start`

### คำสั่งบอท

- `/start` — เริ่มต้นใช้งานบอท
- `/status` — ดูสถานะ
- `/reset` — รีเซ็ตเซสชัน
- `/help` — แสดงความช่วยเหลือ

## Discord

### คุณสมบัติ

- ✅ บอทแบบกำหนดเอง
- ✅ ข้อความโดยตรง
- ✅ ช่องเซิร์ฟเวอร์
- ✅ เธรด
- ✅ Slash commands
- ✅ Embeds และปุ่ม

### การตั้งค่า

1. **สร้างแอป Discord**:
   - ไปที่ [Discord Developer Portal](https://discord.com/developers/applications)
   - คลิก **New Application**
   - ตั้งชื่อแอปพลิเคชันของคุณ

2. **สร้างบอท**:
   - ไปที่แท็บ **Bot**
   - คลิก **Add Bot**
   - คัดลอก **Token**

3. **เปิดใช้งาน Intents**:
   - เลื่อนลงไปที่ **Privileged Gateway Intents**
   - เปิดใช้งาน:
     - ✅ Presence Intent
     - ✅ Server Members Intent
     - ✅ Message Content Intent

4. **เชิญบอท**:
   - ไปที่แท็บ **OAuth2** > **URL Generator**
   - เลือก scope: `bot`, `applications.commands`
   - เลือก permissions: `Send Messages`, `Read Message History`, `Add Reactions`
   - คัดลอกและเปิด URL

5. **กำหนดค่า OpenClaw**:

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN",
      "dm": {
        "policy": "pairing",
        "allowFrom": ["user_id"]
      },
      "guilds": {
        "your_guild_id": {
          "enabled": true,
          "channels": ["channel_id"]
        }
      }
    }
  }
}
```

## Slack

### คุณสมบัติ

- ✅ บอทแบบกำหนดเอง
- ✅ ข้อความโดยตรง
- ✅ ช่อง
- ✅ เธรด
- ✅ Slash commands
- ✅ การดำเนินการเชิงโต้ตอบ

### การตั้งค่า

ติดตาม [เอกสาร Slack](https://docs.openclaw.ai/channels/slack)

## Signal

### คุณสมบัติ

- ✅ การเข้ารหัส end-to-end
- ✅ การแชทส่วนตัว
- ✅ กลุ่ม
- ✅ ไฟล์และสื่อ

### การตั้งค่า

ต้องการ signal-cli ติดตั้งบนระบบ

ติดตาม [เอกสาร Signal](https://docs.openclaw.ai/channels/signal)

## iMessage (macOS เท่านั้น)

### คุณสมบัติ

- ✅ การรวมเนทีฟ macOS
- ✅ การแชทส่วนตัว
- ✅ การแชทกลุ่ม
- ✅ ไฟล์และสื่อ

### การตั้งค่า

ต้องการ imsg CLI ติดตั้งบน macOS

ติดตาม [เอกสาร iMessage](https://docs.openclaw.ai/channels/imessage)

## WebChat

### คุณสมบัติ

- ✅ อินเทอร์เฟซเว็บในตัว
- ✅ ไม่ต้องการการตั้งค่าภายนอก
- ✅ การเข้าถึงในทันที

### การเข้าถึง

เปิดเบราว์เซอร์และไปที่:

```
http://127.0.0.1:18789/
```

หรือรัน:

```bash
openclaw dashboard
```

## การกำหนดค่าทั่วไป

### นโยบาย DM

กำหนดว่าจะจัดการกับข้อความโดยตรงอย่างไร:

```json
{
  "channels": {
    "telegram": {
      "dm": {
        "policy": "pairing"  // "pairing", "open", "closed"
      }
    }
  }
}
```

- **pairing**: ต้องการการอนุมัติสำหรับผู้ส่งใหม่ (แนะนำ)
- **open**: ยอมรับข้อความจากทุกคน (ใช้ด้วยความระมัดระวัง)
- **closed**: ปฏิเสธข้อความทั้งหมด

### รายการอนุญาต

จำกัดการเข้าถึงเฉพาะผู้ใช้เฉพาะ:

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+66812345678", "+66887654321"]
    }
  }
}
```

### การตั้งค่ากลุ่ม

กำหนดค่าพฤติกรรมกลุ่ม:

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "*": {
          "requireMention": true,
          "activation": "mention"
        }
      }
    }
  }
}
```

## การจัดการช่องทาง

### เปิดใช้งาน/ปิดใช้งานช่องทาง

```bash
# เปิดใช้งานช่องทาง
openclaw channels enable telegram

# ปิดใช้งานช่องทาง
openclaw channels disable telegram

# ตรวจสอบสถานะ
openclaw channels status
```

### การเข้าสู่ระบบ/ออกจากระบบ

```bash
# เข้าสู่ระบบ
openclaw channels login whatsapp

# ออกจากระบบ
openclaw channels logout whatsapp
```

### การตรวจสอบสถานะ

```bash
# ตรวจสอบสถานะช่องทางทั้งหมด
openclaw channels status --all

# ตรวจสอบช่องทางเฉพาะ
openclaw channels status telegram
```

## การแก้ไขปัญหาช่องทาง

### ช่องทางไม่ตอบสนอง

```bash
# รีสตาร์ท Gateway
openclaw gateway restart

# ตรวจสอบ logs
tail -f ~/.openclaw/logs/gateway.log

# รัน doctor
openclaw doctor
```

### ข้อความไม่ถูกส่ง

1. ตรวจสอบว่าช่องทางเปิดใช้งานอยู่
2. ตรวจสอบ allowlist
3. ตรวจสอบการเชื่อมต่อเครือข่าย
4. ดู logs สำหรับข้อผิดพลาด

### ข้อความไม่ถูกรับ

1. ตรวจสอบนโยบาย DM
2. ตรวจสอบการตั้งค่ากลุ่ม (requireMention)
3. ยืนยัน webhook/polling
4. ตรวจสอบสิทธิ์บอท

## เอกสารเพิ่มเติม

- [WhatsApp](https://docs.openclaw.ai/channels/whatsapp)
- [Telegram](https://docs.openclaw.ai/channels/telegram)
- [Discord](https://docs.openclaw.ai/channels/discord)
- [Slack](https://docs.openclaw.ai/channels/slack)
- [การแชทกลุ่ม](https://docs.openclaw.ai/concepts/groups)
- [ความปลอดภัย](https://docs.openclaw.ai/gateway/security)
