# การติดตั้ง OpenClaw

คู่มือการติดตั้ง OpenClaw แบบละเอียดสำหรับแพลตฟอร์มต่างๆ

## 📋 ความต้องการของระบบ

### ความต้องการขั้นต่ำ

- **Node.js**: เวอร์ชัน 22 หรือสูงกว่า
- **RAM**: 512 MB ขั้นต่ำ (แนะนำ 2 GB)
- **พื้นที่ดิสก์**: 500 MB สำหรับการติดตั้ง
- **เครือข่าย**: การเชื่อมต่ออินเทอร์เน็ต

### ระบบปฏิบัติการที่รองรับ

- ✅ **macOS** 12+ (Monterey หรือใหม่กว่า)
- ✅ **Linux** (Ubuntu 20.04+, Debian 11+, Fedora 35+)
- ✅ **Windows** 10/11 ผ่าน WSL2

## 🚀 วิธีการติดตั้ง

### วิธีที่ 1: การติดตั้ง Global ผ่าน npm (แนะนำ)

```bash
npm install -g openclaw@latest
```

ตรวจสอบการติดตั้ง:

```bash
openclaw --version
```

### วิธีที่ 2: การติดตั้งผ่าน pnpm

```bash
pnpm add -g openclaw@latest
```

### วิธีที่ 3: การติดตั้งผ่าน bun

```bash
bun add -g openclaw@latest
```

### วิธีที่ 4: จาก Source Code

เหมาะสำหรับนักพัฒนาและผู้ที่ต้องการเวอร์ชันล่าสุด:

```bash
# โคลน repository
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# ติดตั้ง dependencies
pnpm install

# สร้าง UI
pnpm ui:build

# สร้างโปรเจกต์
pnpm build

# รัน OpenClaw
pnpm openclaw --version
```

## 🔧 การตั้งค่าหลังการติดตั้ง

### ขั้นตอนที่ 1: รันตัวช่วยติดตั้งเบื้องต้น

```bash
openclaw onboard --install-daemon
```

ตัวช่วยจะทำ:
1. สร้างไดเรกทอรีการตั้งค่า (`~/.openclaw/`)
2. สร้างไฟล์การตั้งค่าเริ่มต้น
3. ติดตั้ง Gateway daemon
4. ตั้งค่าการยืนยันตัวตน

### ขั้นตอนที่ 2: ตั้งค่า locale เป็นภาษาไทย

แก้ไข `~/.openclaw/openclaw.json`:

```json5
{
  // ตั้งค่าภาษาไทย
  locale: "th-TH",
  timezone: "Asia/Bangkok",
  dateFormat: "DD/MM/YYYY",
}
```

### ขั้นตอนที่ 3: ตั้งค่า AI Models

#### Anthropic (Claude)

```bash
# เข้าสู่ระบบด้วย OAuth
openclaw login anthropic

# หรือใช้ API key
export ANTHROPIC_API_KEY="sk-ant-..."
```

#### OpenAI

```bash
# เข้าสู่ระบบด้วย OAuth
openclaw login openai

# หรือใช้ API key
export OPENAI_API_KEY="sk-..."
```

## 🐳 การติดตั้งด้วย Docker

### ใช้ Docker Compose

สร้าง `docker-compose.yml`:

```yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw-gateway
    ports:
      - "18789:18789"
    volumes:
      - ./openclaw-data:/root/.openclaw
    environment:
      - LOCALE=th-TH
      - TZ=Asia/Bangkok
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    restart: unless-stopped
```

รัน:

```bash
docker-compose up -d
```

## 🍎 การติดตั้งบน macOS

### ผ่าน Homebrew (เร็วๆ นี้)

```bash
# จะมีเร็วๆ นี้
brew install openclaw
```

### ติดตั้งแอป macOS

1. ดาวน์โหลด `OpenClaw.dmg` จาก [Releases](https://github.com/openclaw/openclaw/releases)
2. เปิด DMG และลากไปที่ Applications
3. เปิด OpenClaw จาก Applications
4. อนุญาต accessibility permissions ถ้าถูกถาม

## 🐧 การติดตั้งบน Linux

### Ubuntu/Debian

```bash
# อัปเดตแพ็คเกจ
sudo apt update

# ติดตั้ง Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# ติดตั้ง OpenClaw
sudo npm install -g openclaw@latest
```

### Fedora/RHEL

```bash
# ติดตั้ง Node.js
sudo dnf module install nodejs:22

# ติดตั้ง OpenClaw
sudo npm install -g openclaw@latest
```

### Arch Linux

```bash
# ติดตั้ง Node.js
sudo pacman -S nodejs npm

# ติดตั้ง OpenClaw
sudo npm install -g openclaw@latest
```

## 🪟 การติดตั้งบน Windows (WSL2)

### ขั้นตอนที่ 1: ติดตั้ง WSL2

เปิด PowerShell ในฐานะ Administrator:

```powershell
wsl --install -d Ubuntu
```

รีสตาร์ทคอมพิวเตอร์

### ขั้นตอนที่ 2: ติดตั้งใน WSL2

เปิด Ubuntu terminal:

```bash
# อัปเดตแพ็คเกจ
sudo apt update && sudo apt upgrade -y

# ติดตั้ง Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# ติดตั้ง OpenClaw
npm install -g openclaw@latest

# รันการติดตั้งเบื้องต้น
openclaw onboard --install-daemon
```

## 🔄 การอัปเกรด

### อัปเกรดเวอร์ชันล่าสุด

```bash
# ใช้ npm
npm update -g openclaw

# หรือ pnpm
pnpm update -g openclaw

# ตรวจสอบเวอร์ชัน
openclaw --version
```

### อัปเกรดด้วยคำสั่ง OpenClaw

```bash
openclaw update --channel stable
```

### ย้อนกลับเวอร์ชัน

```bash
npm install -g openclaw@2026.1.15
```

## 🧹 การถอนการติดตั้ง

### ถอนการติดตั้ง npm package

```bash
npm uninstall -g openclaw
```

### ลบไฟล์การตั้งค่า

```bash
rm -rf ~/.openclaw
```

### หยุดและลบ daemon

```bash
# macOS (launchd)
openclaw daemon uninstall

# Linux (systemd)
systemctl --user stop openclaw-gateway
systemctl --user disable openclaw-gateway
rm ~/.config/systemd/user/openclaw-gateway.service
```

## 🔧 การแก้ไขปัญหาการติดตั้ง

### ปัญหา: คำสั่ง 'openclaw' ไม่พบ

**วิธีแก้:**
```bash
# ตรวจสอบ PATH
echo $PATH

# เพิ่ม npm global bin ใน PATH
export PATH="$PATH:$(npm config get prefix)/bin"

# เพิ่มใน ~/.bashrc หรือ ~/.zshrc
echo 'export PATH="$PATH:$(npm config get prefix)/bin"' >> ~/.bashrc
```

### ปัญหา: Permission denied

**วิธีแก้:**
```bash
# ใช้ --unsafe-perm สำหรับ npm
sudo npm install -g openclaw --unsafe-perm

# หรือแก้ไข npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### ปัญหา: Node.js เวอร์ชันเก่า

**วิธีแก้:**
```bash
# ใช้ nvm เพื่ออัปเกรด Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

### ปัญหา: การติดตั้งช้ามาก

**วิธีแก้:**
```bash
# ใช้ registry ที่เร็วขึ้น (สำหรับไทย)
npm config set registry https://registry.npmmirror.com/

# หรือกลับไปใช้ registry เริ่มต้น
npm config set registry https://registry.npmjs.org/
```

## 📚 ขั้นตอนต่อไป

หลังจากติดตั้งแล้ว:

1. 📖 อ่าน [คู่มือเริ่มต้นใช้งาน](getting-started.md)
2. ⚙️ ตั้งค่า [การตั้งค่า](configuration.md)
3. 📱 เชื่อมต่อ [ช่องทาง](channels/README.md)
4. 🎨 ติดตั้ง [แอปพลิเคชันสหาย](platforms/macos.md)

## 💬 ต้องการความช่วยเหลือ?

- 💬 [Discord Community](https://discord.gg/clawd)
- 🐛 [รายงานปัญหา](https://github.com/openclaw/openclaw/issues)
- 📖 [เอกสารเต็ม](https://docs.openclaw.ai)

---

**ติดตั้งสำเร็จ? เริ่มใช้งาน OpenClaw ของคุณได้เลย!** 🦞
