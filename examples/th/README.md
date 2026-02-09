# ตัวอย่างการกำหนดค่าภาษาไทย

ไดเรกทอรีนี้มีตัวอย่างไฟล์การกำหนดค่าสำหรับผู้ใช้ไทย

## ไฟล์

### basic-config.json

การกำหนดค่าพื้นฐานสำหรับผู้ใช้ใหม่ รวมถึง:

- 🌏 Locale และ timezone ไทย
- 📱 การตั้งค่า WhatsApp พื้นฐาน
- 🤖 โมเดลเริ่มต้น (Claude Opus)
- 🔒 การตั้งค่าความปลอดภัยพื้นฐาน

### advanced-config.json

การกำหนดค่าขั้นสูงสำหรับผู้ใช้ที่มีประสบการณ์ รวมถึง:

- 🌏 Locale และ timezone ไทย
- 📱 การตั้งค่าหลายช่องทาง (WhatsApp, Telegram, Discord, Slack)
- 🤖 การกำหนดเส้นทางหลายเอเจนต์
- ⏰ Cron jobs สำหรับงานอัตโนมัติ
- 🔗 Webhooks
- 🔧 การตั้งค่าขั้นสูง

## วิธีใช้งาน

### 1. คัดลอกไฟล์การกำหนดค่า

```bash
# สำหรับผู้ใช้ใหม่
cp examples/th/basic-config.json ~/.openclaw/openclaw.json

# สำหรับผู้ใช้ขั้นสูง
cp examples/th/advanced-config.json ~/.openclaw/openclaw.json
```

### 2. แก้ไขการกำหนดค่า

แก้ไขไฟล์ `~/.openclaw/openclaw.json` และเปลี่ยน:

- `your-secure-token-here` → โทเค็นที่ปลอดภัยของคุณ
- `+66812345678` → หมายเลขโทรศัพท์ไทยของคุณ
- `YOUR_TELEGRAM_BOT_TOKEN` → โทเค็นบอท Telegram ของคุณ
- `YOUR_DISCORD_BOT_TOKEN` → โทเค็นบอท Discord ของคุณ

### 3. สร้างโทเค็นที่ปลอดภัย

```bash
# สำหรับ Gateway token
openssl rand -hex 32

# สำหรับ Webhook token
openssl rand -hex 32
```

### 4. ตั้งค่าช่องทาง

#### WhatsApp

```bash
openclaw channels login
```

#### Telegram

1. สร้างบอทผ่าน [@BotFather](https://t.me/botfather)
2. เพิ่มโทเค็นในการกำหนดค่า

#### Discord

1. สร้างแอปที่ [Discord Developer Portal](https://discord.com/developers/applications)
2. เพิ่มโทเค็นในการกำหนดค่า

### 5. เริ่ม Gateway

```bash
openclaw gateway --port 18789 --verbose
```

## ตัวเลือกการกำหนดค่าภาษาไทย

### Locale

```json
{
  "locale": "th-TH",
  "language": "th",
  "timezone": "Asia/Bangkok"
}
```

### รูปแบบการกล่าวถึง

```json
{
  "messages": {
    "groupChat": {
      "mentionPatterns": ["@openclaw", "@บอท"]
    }
  }
}
```

### Cron Jobs (ตัวอย่าง)

```json
{
  "automation": {
    "cron": {
      "enabled": true,
      "jobs": [
        {
          "name": "daily-summary",
          "schedule": "0 9 * * *",
          "timezone": "Asia/Bangkok",
          "command": "openclaw agent --message 'สรุปข่าววันนี้'"
        }
      ]
    }
  }
}
```

## เอกสารเพิ่มเติม

- [การกำหนดค่า](../../docs/th/gateway/configuration.md)
- [คู่มือเริ่มต้นใช้งาน](../../docs/th/start/getting-started.md)
- [การติดตั้ง](../../docs/th/install/installation.md)
- [ช่องทาง](../../docs/th/channels/README.md)

## การแก้ไขปัญหา

หากคุณพบปัญหา:

```bash
# ตรวจสอบไวยากรณ์ JSON
cat ~/.openclaw/openclaw.json | jq .

# รัน doctor
openclaw doctor

# ตรวจสอบ logs
tail -f ~/.openclaw/logs/gateway.log
```

## การสนับสนุน

- 💬 [Discord](https://discord.gg/clawd)
- 🐛 [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- 📚 [เอกสาร](https://docs.openclaw.ai)
