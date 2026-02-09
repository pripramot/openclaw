# 🦞 OpenClaw — ผู้ช่วย AI ส่วนตัว

> **[🇺🇸 English](README.md)** · **[🇨🇳 中文](docs/zh-CN/index.md)**

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**OpenClaw** คือ _ผู้ช่วย AI ส่วนตัว_ ที่คุณสามารถรันบนอุปกรณ์ของคุณเอง
โปรแกรมสามารถตอบคำถามผ่านแชนแนลที่คุณใช้อยู่แล้ว (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, WebChat) รวมถึงแชนแนลส่วนขยายอย่าง BlueBubbles, Matrix, Zalo และ Zalo Personal สามารถพูดและฟังบน macOS/iOS/Android และสามารถแสดงผล Canvas แบบสดที่คุณควบคุมได้ Gateway เป็นเพียงส่วนควบคุม — ผลิตภัณฑ์คือผู้ช่วย

หากคุณต้องการผู้ช่วยส่วนตัวสำหรับผู้ใช้คนเดียวที่รู้สึกเหมือนอยู่ในเครื่อง รวดเร็ว และพร้อมใช้งานตลอดเวลา นี่คือสิ่งที่คุณต้องการ

[เว็บไซต์](https://openclaw.ai) · [เอกสาร](https://docs.openclaw.ai) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [เริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started) · [การอัปเดต](https://docs.openclaw.ai/install/updating) · [ตัวอย่าง](https://docs.openclaw.ai/start/showcase) · [คำถามที่พบบ่อย](https://docs.openclaw.ai/start/faq) · [วิซาร์ด](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-clawdbot) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

**การตั้งค่าที่แนะนำ:** รันวิซาร์ดการตั้งค่าเบื้องต้น (`openclaw onboard`) วิซาร์ดจะแนะนำคุณผ่าน gateway, workspace, channels และ skills วิซาร์ด CLI เป็นวิธีที่แนะนำและใช้งานได้บน **macOS, Linux และ Windows (ผ่าน WSL2 ซึ่งแนะนำอย่างยิ่ง)**
ใช้งานได้กับ npm, pnpm หรือ bun
ติดตั้งใหม่? เริ่มที่นี่: [เริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started)

**การสมัครสมาชิก (OAuth):**

- **[Anthropic](https://www.anthropic.com/)** (Claude Pro/Max)
- **[OpenAI](https://openai.com/)** (ChatGPT/Codex)

หมายเหตุเกี่ยวกับโมเดล: แม้ว่าโมเดลใดๆ ก็ได้รับการสนับสนุน ผมขอแนะนำอย่างยิ่ง **Anthropic Pro/Max (100/200) + Opus 4.5** สำหรับความแข็งแกร่งในบริบทยาวและการต้านทานการฉีด prompt ที่ดีกว่า ดู [การตั้งค่าเบื้องต้น](https://docs.openclaw.ai/start/onboarding)

## โมเดล (การเลือกและการยืนยันตัวตน)

- การตั้งค่าโมเดลและ CLI: [โมเดล](https://docs.openclaw.ai/concepts/models)
- การหมุนเวียนโปรไฟล์การยืนยันตัวตน (OAuth vs API keys) + การสำรอง: [Model failover](https://docs.openclaw.ai/concepts/model-failover)

## การติดตั้ง (แนะนำ)

ความต้องการ: **Node ≥22**

```bash
npm install -g openclaw@latest
# หรือ: pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

วิซาร์ดจะติดตั้ง Gateway daemon (launchd/systemd user service) เพื่อให้ทำงานต่อเนื่อง

## เริ่มต้นอย่างรวดเร็ว (TL;DR)

ความต้องการ: **Node ≥22**

คู่มือสำหรับผู้เริ่มต้นแบบเต็ม (auth, pairing, channels): [เริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# ส่งข้อความ
openclaw message send --to +1234567890 --message "สวัสดีจาก OpenClaw"

# พูดคุยกับผู้ช่วย (สามารถส่งกลับไปยังช่องทางที่เชื่อมต่อได้: WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat)
openclaw agent --message "Ship checklist" --thinking high
```

กำลังอัปเกรด? [คู่มือการอัปเดต](https://docs.openclaw.ai/install/updating) (และรัน `openclaw doctor`)

## ช่องทางการพัฒนา

- **stable**: รุ่นที่มีแท็ก (`vYYYY.M.D` หรือ `vYYYY.M.D-<patch>`), npm dist-tag `latest`
- **beta**: แท็ก prerelease (`vYYYY.M.D-beta.N`), npm dist-tag `beta` (อาจไม่มีแอป macOS)
- **dev**: head ที่เคลื่อนไหวของ `main`, npm dist-tag `dev` (เมื่อเผยแพร่)

สลับช่องทาง (git + npm): `openclaw update --channel stable|beta|dev`
รายละเอียด: [ช่องทางการพัฒนา](https://docs.openclaw.ai/install/development-channels)

## จากซอร์สโค้ด (การพัฒนา)

แนะนำให้ใช้ `pnpm` สำหรับการ build จากซอร์ส Bun เป็นตัวเลือกสำหรับการรัน TypeScript โดยตรง

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # ติดตั้ง UI deps อัตโนมัติในการรันครั้งแรก
pnpm build

pnpm openclaw onboard --install-daemon

# Dev loop (รีโหลดอัตโนมัติเมื่อมีการเปลี่ยนแปลง TS)
pnpm gateway:watch
```

หมายเหตุ: `pnpm openclaw ...` รัน TypeScript โดยตรง (ผ่าน `tsx`) `pnpm build` สร้าง `dist/` สำหรับการรันผ่าน Node / ไบนารี `openclaw` ที่แพ็กเกจแล้ว

## ค่าเริ่มต้นด้านความปลอดภัย (การเข้าถึง DM)

OpenClaw เชื่อมต่อกับแพลตฟอร์มข้อความจริง ให้ถือว่า DM ขาเข้าเป็น **อินพุตที่ไม่น่าเชื่อถือ**

คู่มือความปลอดภัยแบบเต็ม: [ความปลอดภัย](https://docs.openclaw.ai/gateway/security)

พฤติกรรมเริ่มต้นบน Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack:

- **การจับคู่ DM** (`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`): ผู้ส่งที่ไม่รู้จักจะได้รับรหัสการจับคู่สั้นๆ และบอทจะไม่ประมวลผลข้อความของพวกเขา
- อนุมัติด้วย: `openclaw pairing approve <channel> <code>` (จากนั้นผู้ส่งจะถูกเพิ่มเข้าในรายการอนุญาตในเครื่อง)
- DM ขาเข้าสาธารณะต้องเลือกเข้าร่วมอย่างชัดเจน: ตั้ง `dmPolicy="open"` และรวม `"*"` ในรายการอนุญาตช่องทาง (`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`)

รัน `openclaw doctor` เพื่อตรวจหานโยบาย DM ที่มีความเสี่ยงหรือตั้งค่าผิดพลาด

## ไฮไลต์

- **[Gateway แบบ Local-first](https://docs.openclaw.ai/gateway)** — ระนาบควบคุมเดียวสำหรับเซสชัน, ช่องทาง, เครื่องมือ และเหตุการณ์
- **[Multi-channel inbox](https://docs.openclaw.ai/channels)** — WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, BlueBubbles, Microsoft Teams, Matrix, Zalo, Zalo Personal, WebChat, macOS, iOS/Android
- **[การกำหนดเส้นทางหลายเอเจนต์](https://docs.openclaw.ai/gateway/configuration)** — กำหนดเส้นทางช่องทาง/บัญชี/เพียร์ขาเข้าไปยังเอเจนต์ที่แยกกัน (workspaces + เซสชันต่อเอเจนต์)
- **[Voice Wake](https://docs.openclaw.ai/nodes/voicewake) + [Talk Mode](https://docs.openclaw.ai/nodes/talk)** — เสียงพูดที่เปิดใช้งานตลอดเวลาสำหรับ macOS/iOS/Android พร้อม ElevenLabs
- **[Live Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — พื้นที่ทำงานด้วยภาพที่ขับเคลื่อนโดยเอเจนต์พร้อม [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)
- **[เครื่องมือชั้นหนึ่ง](https://docs.openclaw.ai/tools)** — browser, canvas, nodes, cron, sessions และการดำเนินการ Discord/Slack
- **[แอปเสริม](https://docs.openclaw.ai/platforms/macos)** — แอป macOS menu bar + [nodes](https://docs.openclaw.ai/nodes) บน iOS/Android
- **[การตั้งค่าเบื้องต้น](https://docs.openclaw.ai/start/wizard) + [skills](https://docs.openclaw.ai/tools/skills)** — การตั้งค่าด้วยวิซาร์ดพร้อม skills ที่รวมอยู่/จัดการ/workspace

## ประวัติดาว

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## ทุกสิ่งที่เราสร้างมาจนถึงตอนนี้

### แพลตฟอร์มหลัก

- [Gateway WS control plane](https://docs.openclaw.ai/gateway) พร้อม sessions, presence, config, cron, webhooks, [Control UI](https://docs.openclaw.ai/web) และ [Canvas host](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)
- [พื้นผิว CLI](https://docs.openclaw.ai/tools/agent-send): gateway, agent, send, [wizard](https://docs.openclaw.ai/start/wizard) และ [doctor](https://docs.openclaw.ai/gateway/doctor)
- [Pi agent runtime](https://docs.openclaw.ai/concepts/agent) ในโหมด RPC พร้อมการสตรีมเครื่องมือและการสตรีมบล็อก
- [โมเดลเซสชัน](https://docs.openclaw.ai/concepts/session): `main` สำหรับแชทโดยตรง, การแยกกลุ่ม, โหมดการเปิดใช้งาน, โหมดคิว, ตอบกลับ กฎกลุ่ม: [กลุ่ม](https://docs.openclaw.ai/concepts/groups)
- [ไปป์ไลน์สื่อ](https://docs.openclaw.ai/nodes/images): รูปภาพ/เสียง/วิดีโอ, hooks สำหรับการถอดความ, ขีดจำกัดขนาด, วงจรชีวิตไฟล์ชั่วคราว รายละเอียดเสียง: [เสียง](https://docs.openclaw.ai/nodes/audio)

### ช่องทาง

- [ช่องทาง](https://docs.openclaw.ai/channels): [WhatsApp](https://docs.openclaw.ai/channels/whatsapp) (Baileys), [Telegram](https://docs.openclaw.ai/channels/telegram) (grammY), [Slack](https://docs.openclaw.ai/channels/slack) (Bolt), [Discord](https://docs.openclaw.ai/channels/discord) (discord.js), [Google Chat](https://docs.openclaw.ai/channels/googlechat) (Chat API), [Signal](https://docs.openclaw.ai/channels/signal) (signal-cli), [iMessage](https://docs.openclaw.ai/channels/imessage) (imsg), [BlueBubbles](https://docs.openclaw.ai/channels/bluebubbles) (extension), [Microsoft Teams](https://docs.openclaw.ai/channels/msteams) (extension), [Matrix](https://docs.openclaw.ai/channels/matrix) (extension), [Zalo](https://docs.openclaw.ai/channels/zalo) (extension), [Zalo Personal](https://docs.openclaw.ai/channels/zalouser) (extension), [WebChat](https://docs.openclaw.ai/web/webchat)
- [การกำหนดเส้นทางกลุ่ม](https://docs.openclaw.ai/concepts/group-messages): การควบคุมการกล่าวถึง, แท็กการตอบกลับ, การแบ่งส่วนต่อช่องทางและการกำหนดเส้นทาง กฎช่องทาง: [ช่องทาง](https://docs.openclaw.ai/channels)

### แอปและโหนด

- [แอป macOS](https://docs.openclaw.ai/platforms/macos): แอป menu bar พร้อม Voice Wake, Talk Mode, Canvas และการควบคุม gateway
- [โหนด iOS](https://docs.openclaw.ai/platforms/ios): แอปเสริมพร้อม Canvas, Voice Wake, Talk Mode
- [โหนด Android](https://docs.openclaw.ai/platforms/android): แอปเสริมพร้อม Canvas, Voice Wake, Talk Mode, กล้อง

### เครื่องมือและทักษะ

- [เครื่องมือ](https://docs.openclaw.ai/tools): browser, canvas, nodes, sessions, cron, webhooks, Discord/Slack actions
- [Skills](https://docs.openclaw.ai/tools/skills): ระบบปลั๊กอิน TypeScript สำหรับเอเจนต์
- [Skill creation](https://docs.openclaw.ai/tools/skill-creation): คู่มือการสร้าง skill

### การตั้งค่าและการจัดการ

- [วิซาร์ดการตั้งค่าเบื้องต้น](https://docs.openclaw.ai/start/wizard): ตัวช่วยแบบโต้ตอบสำหรับการตั้งค่า
- [การกำหนดค่า](https://docs.openclaw.ai/gateway/configuration): คู่มือการกำหนดค่าแบบเต็ม
- [Doctor](https://docs.openclaw.ai/gateway/doctor): เครื่องมือวินิจฉัยและซ่อมแซม
- [การจับคู่](https://docs.openclaw.ai/start/pairing): ระบบการจับคู่ DM ที่ปลอดภัย

## การมีส่วนร่วม

ยินดีต้อนรับการมีส่วนร่วม! โปรดอ่าน [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับคำแนะนำ

สำหรับนักพัฒนาชาวไทย: [CONTRIBUTING.th.md](CONTRIBUTING.th.md)

## การสนับสนุน

- 💬 [Discord](https://discord.gg/clawd) — ชุมชนและการสนับสนุน
- 🐛 [GitHub Issues](https://github.com/openclaw/openclaw/issues) — รายงานบั๊กและคำขอฟีเจอร์
- 📧 Email: [openclaw@openclaw.ai](mailto:openclaw@openclaw.ai)

## สิทธิ์การใช้งาน

MIT — เป็นอิสระเหมือนกุ้งมังกรในมหาสมุทร 🦞

---

_"เราทุกคนแค่เล่นกับ prompts ของเรา"_ — AI ที่มี token มากเกินไปอาจจะพูด
