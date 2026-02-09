# การติดตั้ง

## ข้อกำหนดระบบ

- **Node.js**: เวอร์ชัน 22 หรือสูงกว่า
- **ระบบปฏิบัติการ**: macOS, Linux, Windows (ผ่าน WSL2)
- **หน่วยความจำ**: แนะนำอย่างน้อย 2GB RAM
- **พื้นที่ดิสก์**: อย่างน้อย 500MB สำหรับการติดตั้งพื้นฐาน

## วิธีการติดตั้ง

### วิธีที่ 1: สคริปต์ติดตั้งอัตโนมัติ (แนะนำ)

#### macOS และ Linux

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

สคริปต์จะ:
- ติดตั้ง OpenClaw
- ตั้งค่าตัวแปรสภาพแวดล้อม
- เพิ่ม `openclaw` เข้าไปใน PATH

#### Windows (PowerShell)

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

**หมายเหตุ**: สำหรับ Windows แนะนำอย่างยิ่งให้ใช้ WSL2 เนื่องจากมีความเข้ากันได้และประสิทธิภาพที่ดีกว่า

### วิธีที่ 2: ติดตั้งผ่าน npm (Global)

```bash
npm install -g openclaw@latest
```

หรือใช้ pnpm:

```bash
pnpm add -g openclaw@latest
```

### วิธีที่ 3: ติดตั้งจากซอร์สโค้ด (สำหรับนักพัฒนา)

```bash
# โคลนพื้นที่เก็บข้อมูล
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# ติดตั้ง dependencies
pnpm install

# Build UI
pnpm ui:build

# Build โปรเจกต์
pnpm build

# รันการตั้งค่าเบื้องต้น
pnpm openclaw onboard --install-daemon
```

## การตั้งค่าเบื้องต้น

หลังจากติดตั้ง ให้รันวิซาร์ดการตั้งค่าเบื้องต้น:

```bash
openclaw onboard --install-daemon
```

วิซาร์ดจะแนะนำคุณผ่าน:

1. **การเลือกโมเดล**: เลือกโมเดล AI (Claude, GPT ฯลฯ)
2. **การยืนยันตัวตน**: ตั้งค่า OAuth หรือ API keys
3. **การตั้งค่า Gateway**: กำหนดค่าพอร์ตและการผูก
4. **ช่องทาง**: เชื่อมต่อ WhatsApp, Telegram, Discord ฯลฯ
5. **ความปลอดภัย**: ตั้งค่านโยบาย DM และการจับคู่
6. **บริการ**: ติดตั้ง daemon (launchd/systemd)

## การติดตั้ง Daemon

### macOS (launchd)

```bash
openclaw onboard --install-daemon
```

ตรวจสอบสถานะ:

```bash
launchctl print gui/$UID/ai.openclaw.gateway
```

### Linux (systemd)

```bash
openclaw onboard --install-daemon
```

ตรวจสอบสถานะ:

```bash
systemctl --user status openclaw-gateway
```

### Windows (WSL2 + systemd)

```bash
# เปิดใช้งาน systemd ใน WSL2 ก่อน
# เพิ่มใน /etc/wsl.conf:
# [boot]
# systemd=true

openclaw onboard --install-daemon
```

## การยืนยันการติดตั้ง

ตรวจสอบว่าติดตั้งสำเร็จ:

```bash
# ตรวจสอบเวอร์ชัน
openclaw --version

# รัน doctor เพื่อตรวจสอบสภาพ
openclaw doctor

# ตรวจสอบสถานะ
openclaw status
```

## การกำหนดค่าหลังการติดตั้ง

### ตั้งค่าภาษาไทย

แก้ไข `~/.openclaw/openclaw.json`:

```json
{
  "locale": "th-TH",
  "language": "th",
  "timezone": "Asia/Bangkok"
}
```

### การเชื่อมต่อช่องทาง

#### WhatsApp

```bash
openclaw channels login
```

สแกน QR code เพื่อเชื่อมต่อบัญชี WhatsApp ของคุณ

#### Telegram

1. สร้างบอทผ่าน [@BotFather](https://t.me/botfather)
2. เพิ่มโทเค็นในการกำหนดค่า:

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

#### Discord

1. สร้างแอปที่ [Discord Developer Portal](https://discord.com/developers/applications)
2. เพิ่มโทเค็นในการกำหนดค่า:

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

## การถอนการติดตั้ง

### ถอนการติดตั้ง npm global

```bash
npm uninstall -g openclaw
```

หรือ pnpm:

```bash
pnpm remove -g openclaw
```

### ถอนการติดตั้ง daemon

macOS:

```bash
launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist
rm ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

Linux:

```bash
systemctl --user disable openclaw-gateway
systemctl --user stop openclaw-gateway
rm ~/.config/systemd/user/openclaw-gateway.service
systemctl --user daemon-reload
```

### ลบไฟล์การกำหนดค่า

```bash
rm -rf ~/.openclaw
```

**คำเตือน**: การดำเนินการนี้จะลบการกำหนดค่า เซสชัน และข้อมูลทั้งหมดของคุณ

## การแก้ไขปัญหาการติดตั้ง

### ปัญหาการติดตั้ง npm

หาก npm install ล้มเหลว:

```bash
# ล้างแคช npm
npm cache clean --force

# ลองอีกครั้ง
npm install -g openclaw@latest
```

### ปัญหาสิทธิ์

หากคุณพบปัญหาสิทธิ์:

```bash
# ใช้ sudo (ไม่แนะนำ แต่อาจจำเป็น)
sudo npm install -g openclaw@latest

# หรือแก้ไขสิทธิ์ npm directory
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### ปัญหา Node.js version

หาก Node.js เวอร์ชันของคุณต่ำเกินไป:

```bash
# ติดตั้ง nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# ติดตั้ง Node.js 22
nvm install 22
nvm use 22
nvm alias default 22
```

### ปัญหา WSL2

หากใช้ WSL2:

1. ตรวจสอบว่า WSL2 ติดตั้งแล้ว: `wsl --version`
2. อัปเดต WSL: `wsl --update`
3. เปิดใช้งาน systemd ใน `/etc/wsl.conf`

## ขั้นตอนถัดไป

- อ่าน [คู่มือเริ่มต้นใช้งาน](../start/getting-started.md)
- ตั้งค่า [การกำหนดค่า](../gateway/configuration.md)
- เชื่อมต่อ [ช่องทาง](../channels/README.md)
- สำรวจ [คำสั่ง CLI](https://docs.openclaw.ai/cli)

## ทรัพยากร

- [เอกสารอย่างเป็นทางการ](https://docs.openclaw.ai)
- [GitHub Repository](https://github.com/openclaw/openclaw)
- [Discord Community](https://discord.gg/clawd)
- [คำถามที่พบบ่อย](https://docs.openclaw.ai/start/faq)
