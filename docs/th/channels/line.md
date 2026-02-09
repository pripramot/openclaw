# การตั้งค่า LINE Official Account

เชื่อมต่อ OpenClaw กับ LINE Official Account เพื่อให้ผู้ใช้ไทยสามารถโต้ตอบผ่าน LINE ได้

## 🎯 ภาพรวม

LINE เป็นแอปส่งข้อความที่ได้รับความนิยมสูงสุดในประเทศไทย การเชื่อมต่อ OpenClaw กับ LINE จะทำให้ผู้ใช้ของคุณสามารถคุยกับ AI assistant ผ่าน LINE ได้โดยตรง

### คุณสมบัติที่รองรับ

- ✅ ข้อความตัวอักษร (Text messages)
- ✅ รูปภาพ (Images)
- ✅ เสียง (Audio)
- ✅ วิดีโอ (Video)
- ✅ ตำแหน่ง (Location)
- ✅ Stickers
- ✅ Rich menus
- ✅ การตอบกลับด่วน (Quick replies)

## 📋 ความต้องการเบื้องต้น

1. **บัญชี LINE Official Account** (สมัครฟรี)
2. **LINE Messaging API access**
3. **Webhook URL** (สามารถเข้าถึงได้จากอินเทอร์เน็ต)
4. **OpenClaw Gateway** ที่รันอยู่

## 🚀 การตั้งค่าขั้นตอนที่ 1: สร้าง LINE Official Account

### 1.1 สร้างบัญชี

1. ไปที่ [LINE Official Account Manager](https://manager.line.biz/)
2. คลิก "สร้างบัญชี"
3. กรอกข้อมูล:
   - ชื่อบัญชี (Account name)
   - หมวดหมู่ (Category)
   - คำอธิบาย (Description)
4. ยอมรับข้อตกลง และคลิก "สร้าง"

### 1.2 เปิดใช้งาน Messaging API

1. ไปที่ [LINE Developers Console](https://developers.line.biz/console/)
2. เลือก Provider ของคุณ (หรือสร้างใหม่)
3. คลิก "Create a new channel"
4. เลือก "Messaging API"
5. กรอกข้อมูล:
   - Channel name: ชื่อ channel
   - Channel description: คำอธิบาย
   - Category: หมวดหมู่
   - Subcategory: หมวดหมู่ย่อย
6. อ่านและยอมรับข้อตกลง
7. คลิก "Create"

### 1.3 รับ Credentials

หลังจากสร้าง channel แล้ว:

1. ไปที่ tab "Basic settings"
2. คัดลอก **Channel secret**
3. ไปที่ tab "Messaging API"
4. คัดลอก **Channel access token** (ถ้ายังไม่มี ให้คลิก "Issue")
5. บันทึก credentials เหล่านี้ไว้

## ⚙️ การตั้งค่าขั้นตอนที่ 2: ตั้งค่า OpenClaw

### 2.1 ตั้งค่า Environment Variables

```bash
# เพิ่มใน ~/.openclaw/.env หรือ export
export LINE_CHANNEL_ACCESS_TOKEN="your-channel-access-token"
export LINE_CHANNEL_SECRET="your-channel-secret"
```

### 2.2 แก้ไขไฟล์การตั้งค่า

แก้ไข `~/.openclaw/openclaw.json`:

```json5
{
  channels: {
    line: {
      enabled: true,
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
      
      // นโยบายการเข้าถึง
      dmPolicy: "pairing", // pairing | open | closed
      
      // รายการ User ID ที่อนุญาต
      allowFrom: [
        "U1234567890abcdef", // LINE User ID
      ],
      
      // การตั้งค่ากลุ่ม
      groups: {
        "*": {
          requireMention: true,
        },
      },
      
      // การตั้งค่า webhook
      webhookPath: "/__openclaw__/line/webhook",
      webhookPort: 18793, // หรือพอร์ตที่คุณต้องการ
    },
  },
}
```

### 2.3 เริ่ม Gateway

```bash
openclaw gateway --port 18789 --verbose
```

## 🌐 การตั้งค่าขั้นตอนที่ 3: ตั้งค่า Webhook

### 3.1 เปิดเผย Gateway ต่อสาธารณะ

LINE ต้องการ webhook URL ที่เข้าถึงได้จากอินเทอร์เน็ต มีหลายวิธี:

#### วิธีที่ 1: ใช้ ngrok (สำหรับทดสอบ)

```bash
# ติดตั้ง ngrok
brew install ngrok  # macOS
# หรือดาวน์โหลดจาก ngrok.com

# เริ่ม tunnel
ngrok http 18793

# คัดลอก HTTPS URL (เช่น https://abc123.ngrok.io)
```

#### วิธีที่ 2: ใช้ Tailscale Funnel

```bash
# ติดตั้ง Tailscale
tailscale up

# เปิด Funnel
tailscale funnel 18793
```

#### วิธีที่ 3: ใช้ VPS/Server

ถ้าคุณมี VPS หรือ server:

```bash
# ตั้งค่า nginx reverse proxy
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    location /__openclaw__/line/webhook {
        proxy_pass http://localhost:18793;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
```

### 3.2 ตั้งค่า Webhook URL ใน LINE

1. ไปที่ [LINE Developers Console](https://developers.line.biz/console/)
2. เลือก channel ของคุณ
3. ไปที่ tab "Messaging API"
4. ในส่วน "Webhook settings":
   - Webhook URL: `https://your-domain.com/__openclaw__/line/webhook`
   - เปิด "Use webhook"
   - คลิก "Verify" เพื่อทดสอบ
   - คลิก "Update"

### 3.3 ปิดใช้งาน Auto-reply

1. ยังอยู่ใน tab "Messaging API"
2. ในส่วน "LINE Official Account features":
   - คลิก "Edit" ถัดจาก "Auto-reply messages"
   - ปิด "Auto-reply messages"
   - ปิด "Greeting messages" (ถ้าต้องการ)

## 🧪 การทดสอบ

### 1. เพิ่มเพื่อนในแอป LINE

1. ไปที่ tab "Messaging API" ใน LINE Developers Console
2. สแกน QR code ด้วยแอป LINE ของคุณ
3. เพิ่มบัญชีเป็นเพื่อน

### 2. ส่งข้อความทดสอบ

ส่งข้อความใน LINE:

```
สวัสดี OpenClaw! คุณทำงานไหม?
```

หาก dmPolicy เป็น "pairing" คุณจะได้รับรหัสการจับคู่:

```
🔐 กรุณาอนุมัติรหัสนี้ในเครื่องของคุณ:
openclaw pairing approve line ABCD1234
```

### 3. อนุมัติการจับคู่

บนเครื่องที่รัน OpenClaw:

```bash
openclaw pairing approve line ABCD1234
```

### 4. ทดสอบอีกครั้ง

ส่งข้อความอีกครั้ง:

```
สวัสดี! ตอนนี้ฉันควรจะได้รับการตอบกลับแล้ว
```

## 📊 ฟีเจอร์ขั้นสูง

### Rich Menu

สร้าง rich menu สำหรับผู้ใช้:

```json5
{
  channels: {
    line: {
      richMenu: {
        size: {
          width: 2500,
          height: 1686,
        },
        selected: true,
        name: "OpenClaw Menu",
        chatBarText: "เมนู",
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 833,
              height: 843,
            },
            action: {
              type: "message",
              text: "/status",
            },
          },
          // เพิ่ม areas อื่นๆ
        ],
      },
    },
  },
}
```

### Quick Replies

ส่ง quick replies จาก agent:

```typescript
// ใน agent response
{
  quickReply: {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "ช่วยเหลือ",
          text: "/help"
        }
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "สถานะ",
          text: "/status"
        }
      }
    ]
  }
}
```

### Stickers

รับและส่ง LINE stickers:

```typescript
// การตั้งค่ารองรับ stickers
{
  channels: {
    line: {
      stickers: {
        enabled: true,
        packageId: "11537", // LINE sticker package
        stickerId: "52002734",
      },
    },
  },
}
```

## 🔐 ความปลอดภัย

### การตรวจสอบ Webhook Signature

OpenClaw จะตรวจสอบ signature โดยอัตโนมัติ:

```typescript
// การตั้งค่าเพิ่มเติม
{
  channels: {
    line: {
      security: {
        verifySignature: true, // เปิดอยู่ตามค่าเริ่มต้น
        trustProxy: false, // ตั้งเป็น true ถ้าอยู่หลัง proxy
      },
    },
  },
}
```

### การจำกัดการเข้าถึง

```json5
{
  channels: {
    line: {
      // จำกัดเฉพาะ User IDs เหล่านี้
      allowFrom: [
        "U1234567890abcdef",
        "Uabcdef1234567890",
      ],
      
      // หรือใช้ pairing mode
      dmPolicy: "pairing",
      
      // การตั้งค่ากลุ่ม
      groups: {
        // กลุ่มเฉพาะ
        "C1234567890abcdef": {
          requireMention: false,
        },
        // กลุ่มอื่นๆ ต้องแท็ก
        "*": {
          requireMention: true,
        },
      },
    },
  },
}
```

## 🔧 คำสั่ง CLI

```bash
# เข้าสู่ระบบ LINE
openclaw channels login line

# ตรวจสอบสถานะ
openclaw channels status line

# ดู logs
openclaw logs --channel line --tail 100

# ทดสอบส่งข้อความ
openclaw message send --channel line --to U1234567890abcdef --message "ทดสอบ"

# รีสตาร์ท LINE channel
openclaw channels restart line
```

## 🐛 การแก้ไขปัญหา

### Webhook ตอบกลับ 401/403

**สาเหตุ:** Signature verification ล้มเหลว

**วิธีแก้:**
```bash
# ตรวจสอบ channel secret ถูกต้อง
openclaw config get channels.line.channelSecret

# ดู webhook logs
openclaw logs --channel line --filter "webhook"
```

### ไม่ได้รับข้อความ

**วิธีแก้:**
```bash
# ตรวจสอบว่า webhook ทำงาน
curl -X POST https://your-domain.com/__openclaw__/line/webhook \
  -H "Content-Type: application/json" \
  -d '{"events":[]}'

# ตรวจสอบ Gateway กำลังรันอยู่
openclaw gateway status

# ตรวจสอบว่า LINE channel enabled
openclaw channels status line
```

### ข้อความส่งช้า

**วิธีแก้:**
```bash
# ตรวจสอบ latency
openclaw channels status --probe line

# ตรวจสอบ network
ping your-domain.com

# ดู queue status
openclaw queue status
```

## 📚 แหล่งข้อมูลเพิ่มเติม

- [LINE Messaging API Docs](https://developers.line.biz/en/docs/messaging-api/)
- [LINE Developers Console](https://developers.line.biz/console/)
- [LINE Official Account Manager](https://manager.line.biz/)

## 💬 ต้องการความช่วยเหลือ?

- 💬 [Discord Community](https://discord.gg/clawd)
- 🐛 [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- 📖 [เอกสารเต็ม](https://docs.openclaw.ai/channels/line)

---

**ตั้งค่า LINE เสร็จแล้ว? เริ่มแชทกับ OpenClaw ผ่าน LINE!** 🦞💚
