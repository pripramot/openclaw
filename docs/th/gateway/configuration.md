# การกำหนดค่า

คู่มือฉบับสมบูรณ์สำหรับการกำหนดค่า OpenClaw Gateway

## ตำแหน่งไฟล์การกำหนดค่า

ไฟล์การกำหนดค่าหลักอยู่ที่:

```
~/.openclaw/openclaw.json
```

คุณสามารถใช้ตำแหน่งอื่นได้โดยการตั้งค่าตัวแปรสภาพแวดล้อม:

```bash
export OPENCLAW_CONFIG_PATH=/path/to/config.json
```

## โครงสร้างการกำหนดค่าพื้นฐาน

```json
{
  "locale": "th-TH",
  "language": "th",
  "timezone": "Asia/Bangkok",
  "gateway": {
    "mode": "local",
    "port": 18789,
    "bind": "loopback",
    "auth": {
      "token": "your-secure-token-here"
    }
  },
  "channels": {
    "whatsapp": {
      "enabled": true,
      "allowFrom": ["+66812345678"]
    },
    "telegram": {
      "enabled": true,
      "token": "YOUR_TELEGRAM_BOT_TOKEN"
    },
    "discord": {
      "enabled": false,
      "token": "YOUR_DISCORD_BOT_TOKEN"
    }
  },
  "agents": {
    "defaults": {
      "provider": "anthropic",
      "model": "claude-opus-4-5"
    }
  }
}
```

## การตั้งค่า Locale และภาษา

### Locale ที่รองรับ

- `en-US` — อังกฤษ (สหรัฐอเมริกา) [ค่าเริ่มต้น]
- `th-TH` — ไทย (ประเทศไทย)
- `zh-CN` — จีน (จีน)

### การกำหนดค่าภาษาไทย

```json
{
  "locale": "th-TH",
  "language": "th",
  "timezone": "Asia/Bangkok"
}
```

## การตั้งค่า Gateway

### โหมด

- `local` — Gateway ทำงานบนเครื่องเดียวกัน (แนะนำ)
- `remote` — Gateway สามารถเข้าถึงได้จากเครื่องอื่น

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789
  }
}
```

### การผูก (Bind)

- `loopback` — ฟังที่ 127.0.0.1 เท่านั้น (ปลอดภัยที่สุด)
- `tailnet` — ฟังบน Tailscale network
- `lan` — ฟังบนเครือข่ายท้องถิ่นทั้งหมด
- `all` — ฟังบนอินเทอร์เฟซทั้งหมด (ไม่แนะนำ)

```json
{
  "gateway": {
    "bind": "loopback"
  }
}
```

### การยืนยันตัวตน

สร้างโทเค็นที่ปลอดภัย:

```bash
openssl rand -hex 32
```

เพิ่มในการกำหนดค่า:

```json
{
  "gateway": {
    "auth": {
      "token": "your-secure-64-character-hex-token"
    }
  }
}
```

## การตั้งค่าช่องทาง

### WhatsApp

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "allowFrom": ["+66812345678", "+66887654321"],
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

### Telegram

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
      "allowFrom": ["@username", "123456789"],
      "dm": {
        "policy": "pairing"
      }
    }
  }
}
```

### Discord

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_DISCORD_BOT_TOKEN",
      "dm": {
        "policy": "pairing",
        "allowFrom": ["user_id_1", "user_id_2"]
      },
      "guilds": {
        "guild_id_here": {
          "enabled": true,
          "channels": ["channel_id_1", "channel_id_2"]
        }
      }
    }
  }
}
```

## การตั้งค่าความปลอดภัย

### นโยบาย DM

- `pairing` — ต้องการการจับคู่สำหรับผู้ส่งใหม่ (แนะนำ)
- `open` — ยอมรับข้อความจากทุกคน (ไม่แนะนำ)
- `closed` — ปฏิเสธข้อความทั้งหมด

```json
{
  "channels": {
    "telegram": {
      "dm": {
        "policy": "pairing"
      }
    }
  }
}
```

### รายการอนุญาต (Allowlist)

จำกัดการเข้าถึงเฉพาะผู้ใช้เฉพาะ:

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+66812345678", "+66887654321"]
    },
    "telegram": {
      "allowFrom": ["@username", "123456789"]
    }
  }
}
```

## การตั้งค่าเอเจนต์

### ผู้ให้บริการ

- `anthropic` — Claude (แนะนำ)
- `openai` — GPT
- `google` — Gemini

```json
{
  "agents": {
    "defaults": {
      "provider": "anthropic",
      "model": "claude-opus-4-5",
      "apiKey": "your-api-key-here"
    }
  }
}
```

### OAuth (แนะนำ)

สำหรับ Anthropic และ OpenAI:

```json
{
  "agents": {
    "defaults": {
      "provider": "anthropic",
      "auth": {
        "type": "oauth"
      }
    }
  }
}
```

## การตั้งค่าเซสชัน

```json
{
  "session": {
    "mainKey": "main",
    "groupIsolation": true,
    "maxHistory": 100
  }
}
```

## การตั้งค่า Workspace

```json
{
  "routing": {
    "agents": {
      "main": {
        "workspace": "~/.openclaw/workspace",
        "sandbox": {
          "mode": "off"
        }
      }
    }
  }
}
```

## การตั้งค่า Cron Jobs

```json
{
  "automation": {
    "cron": {
      "enabled": true,
      "jobs": [
        {
          "name": "daily-summary",
          "schedule": "0 9 * * *",
          "command": "openclaw agent --message 'สรุปข่าววันนี้'"
        }
      ]
    }
  }
}
```

## การตั้งค่า Webhooks

```json
{
  "automation": {
    "webhooks": {
      "enabled": true,
      "port": 18790,
      "endpoints": [
        {
          "path": "/webhook/alert",
          "method": "POST",
          "action": "send-message"
        }
      ]
    }
  }
}
```

## ตัวแปรสภาพแวดล้อม

```bash
# ตำแหน่งการกำหนดค่า
export OPENCLAW_CONFIG_PATH=~/.openclaw/openclaw.json

# ไดเรกทอรีสถานะ
export OPENCLAW_STATE_DIR=~/.openclaw

# ระดับ log
export OPENCLAW_LOG_LEVEL=debug

# โหมด
export NODE_ENV=production
```

## คำสั่ง CLI สำหรับการกำหนดค่า

```bash
# ดูการกำหนดค่าปัจจุบัน
openclaw config get

# ตั้งค่า
openclaw config set gateway.port 18789
openclaw config set locale th-TH
openclaw config set timezone Asia/Bangkok

# แก้ไขการกำหนดค่าในตัวแก้ไข
openclaw config edit

# ตรวจสอบการกำหนดค่า
openclaw doctor
```

## ตัวอย่างการกำหนดค่าแบบเต็ม

ดู `examples/th/` สำหรับการกำหนดค่าตัวอย่างภาษาไทยที่สมบูรณ์

## การแก้ไขปัญหาการกำหนดค่า

### การกำหนดค่าไม่โหลด

```bash
# ตรวจสอบไวยากรณ์ JSON
cat ~/.openclaw/openclaw.json | jq .

# รัน doctor
openclaw doctor
```

### การตั้งค่าถูกละเว้น

```bash
# ตรวจสอบว่าตัวแปรสภาพแวดล้อมไม่ได้แทนที่
env | grep OPENCLAW

# ตรวจสอบลำดับความสำคัญการกำหนดค่า
openclaw config get --verbose
```

## เอกสารเพิ่มเติม

- [ตัวอย่างการกำหนดค่า](https://docs.openclaw.ai/gateway/configuration-examples)
- [ความปลอดภัย](https://docs.openclaw.ai/gateway/security)
- [การกำหนดเส้นทางหลายเอเจนต์](https://docs.openclaw.ai/concepts/multi-agent)
