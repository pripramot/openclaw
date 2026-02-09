# เริ่มต้นใช้งาน

เป้าหมาย: ไปจาก **ศูนย์** → **การแชทที่ใช้งานได้ครั้งแรก** (ด้วยค่าเริ่มต้นที่สมเหตุสมผล) ให้เร็วที่สุด

การแชทเร็วที่สุด: เปิด Control UI (ไม่ต้องตั้งค่าช่องทาง) รัน `openclaw dashboard`
และแชทในเบราว์เซอร์ หรือเปิด `http://127.0.0.1:18789/` บนโฮสต์ gateway

เส้นทางที่แนะนำ: ใช้ **วิซาร์ดการตั้งค่าเบื้องต้น CLI** (`openclaw onboard`) ซึ่งจะตั้งค่า:

- โมเดล/การยืนยันตัวตน (แนะนำ OAuth)
- การตั้งค่า gateway
- ช่องทาง (WhatsApp/Telegram/Discord/...)
- ค่าเริ่มต้นการจับคู่ (DM ที่ปลอดภัย)
- การเริ่มต้น workspace + skills
- บริการพื้นหลังที่เลือกได้

หากคุณต้องการหน้าอ้างอิงที่ลึกขึ้น ไปที่: วิซาร์ด, การตั้งค่า, การจับคู่, ความปลอดภัย

## 0) ข้อกำหนดเบื้องต้น

- Node `>=22`
- `pnpm` (ตัวเลือก แนะนำหากคุณ build จากซอร์ส)
- **แนะนำ:** Brave Search API key สำหรับการค้นหาเว็บ เส้นทางที่ง่ายที่สุด:
  `openclaw configure --section web` (จัดเก็บ `tools.web.search.apiKey`)

macOS: หากคุณวางแผนที่จะ build แอป ให้ติดตั้ง Xcode / CLT สำหรับ CLI + gateway เพียงอย่างเดียว Node ก็เพียงพอ
Windows: ใช้ **WSL2** (แนะนำ Ubuntu) WSL2 แนะนำอย่างยิ่ง Windows แบบ native ไม่ได้รับการทดสอบ มีปัญหามากขึ้น และมีความเข้ากันได้ของเครื่องมือที่แย่กว่า ติดตั้ง WSL2 ก่อน จากนั้นรันขั้นตอน Linux ภายใน WSL

## 1) ติดตั้ง CLI (แนะนำ)

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

ตัวเลือกตัวติดตั้ง (วิธีการติดตั้ง, ไม่มีการโต้ตอบ, จาก GitHub): ติดตั้ง

Windows (PowerShell):

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

ทางเลือก (ติดตั้งแบบ global):

```bash
npm install -g openclaw@latest
```

```bash
pnpm add -g openclaw@latest
```

## 2) รันวิซาร์ดการตั้งค่าเบื้องต้น (และติดตั้งบริการ)

```bash
openclaw onboard --install-daemon
```

สิ่งที่คุณจะเลือก:

- **Local vs Remote** gateway
- **การยืนยันตัวตน**: การสมัครสมาชิก OpenAI Code (Codex) (OAuth) หรือ API keys สำหรับ Anthropic เราแนะนำ API key `claude setup-token` ก็รองรับด้วย
- **ผู้ให้บริการ**: การเข้าสู่ระบบ WhatsApp QR, โทเค็นบอท Telegram/Discord, โทเค็นปลั๊กอิน Mattermost ฯลฯ
- **Daemon**: การติดตั้งพื้นหลัง (launchd/systemd; WSL2 ใช้ systemd)
  - **Runtime**: Node (แนะนำ จำเป็นสำหรับ WhatsApp/Telegram) ไม่แนะนำ Bun
- **โทเค็น Gateway**: วิซาร์ดสร้างหนึ่งโดยค่าเริ่มต้น (แม้ใน loopback) และจัดเก็บใน `gateway.auth.token`

## 3) เชื่อมต่อช่องทาง

### WhatsApp

```bash
openclaw channels login
```

สแกน QR code ด้วยแอป WhatsApp ของคุณ (ตั้งค่า > อุปกรณ์ที่เชื่อมโยง)

### Telegram

1. สร้างบอทผ่าน [@BotFather](https://t.me/botfather)
2. คัดลอกโทเค็นบอท
3. เพิ่มในการกำหนดค่า:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN"
    }
  }
}
```

### Discord

1. สร้างแอปที่ [Discord Developer Portal](https://discord.com/developers/applications)
2. สร้างบอทและคัดลอกโทเค็น
3. เปิดใช้งาน intents ที่จำเป็น
4. เพิ่มในการกำหนดค่า:

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN"
    }
  }
}
```

## 4) เริ่ม Gateway

```bash
openclaw gateway --port 18789 --verbose
```

หรือหาก daemon ติดตั้งแล้ว จะเริ่มโดยอัตโนมัติ

## 5) ส่งข้อความทดสอบ

```bash
openclaw message send --to +1234567890 --message "สวัสดีจาก OpenClaw"
```

## 6) พูดคุยกับผู้ช่วย

```bash
openclaw agent --message "สวัสดี คุณช่วยอะไรฉันได้บ้าง?" --thinking high
```

## การตั้งค่าความปลอดภัย

โดยค่าเริ่มต้น OpenClaw ใช้โหมดจับคู่สำหรับ DM เพื่อป้องกันการเข้าถึงที่ไม่ได้รับอนุญาต

เพื่ออนุมัติผู้ส่งใหม่:

```bash
openclaw pairing approve <channel> <code>
```

รหัสจะถูกส่งไปยังผู้ส่งเมื่อพวกเขาพยายามส่งข้อความครั้งแรก

## การกำหนดค่า

ไฟล์กำหนดค่าอยู่ที่ `~/.openclaw/openclaw.json`

ตัวอย่างการกำหนดค่าพื้นฐาน:

```json
{
  "gateway": {
    "port": 18789,
    "auth": {
      "token": "your-gateway-token"
    }
  },
  "channels": {
    "whatsapp": {
      "enabled": true,
      "allowFrom": ["+66812345678"]
    },
    "telegram": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN"
    }
  },
  "locale": "th-TH",
  "timezone": "Asia/Bangkok"
}
```

## ขั้นตอนถัดไป

- ปรับแต่ง [การกำหนดค่า](../gateway/configuration.md)
- ตั้งค่า [ช่องทางเพิ่มเติม](../channels/README.md)
- เรียนรู้เกี่ยวกับ [skills](https://docs.openclaw.ai/tools/skills)
- สำรวจ [คำสั่ง CLI](https://docs.openclaw.ai/cli)

## การแก้ไขปัญหา

หากคุณพบปัญหา:

1. รัน `openclaw doctor` เพื่อตรวจสอบปัญหาทั่วไป
2. ตรวจสอบ logs: `~/.openclaw/logs/`
3. ตรวจสอบว่า Gateway กำลังทำงาน: `openclaw status`
4. เยี่ยมชม [เอกสารการแก้ไขปัญหา](https://docs.openclaw.ai/gateway/troubleshooting)
5. ถามใน [Discord](https://discord.gg/clawd)

## การอัปเดต

เพื่ออัปเดต OpenClaw:

```bash
openclaw update --channel stable
```

หรือ:

```bash
npm update -g openclaw@latest
```

จากนั้นรัน:

```bash
openclaw doctor
```

เพื่อให้แน่ใจว่าทุกอย่างยังคงทำงานอย่างถูกต้อง
