# 🦞 OpenClaw — ผู้ช่วย AI ส่วนตัว

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
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="สถานะ CI"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="เวอร์ชัน GitHub"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="สัญญาอนุญาต MIT"></a>
</p>

**OpenClaw** คือ _ผู้ช่วย AI ส่วนตัว_ ที่คุณสามารถรันบนอุปกรณ์ของคุณเอง
ตอบคำถามผ่านช่องทางที่คุณใช้อยู่แล้ว (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, WebChat) รวมถึงช่องทางเพิ่มเติมอย่าง BlueBubbles, Matrix, Zalo และ Zalo Personal สามารถพูดและฟังบน macOS/iOS/Android และแสดงผลแบบเรียลไทม์ผ่าน Canvas ที่คุณควบคุมได้ Gateway เป็นเพียงระบบควบคุมหลัก — ตัวผลิตภัณฑ์คือผู้ช่วย

หากคุณต้องการผู้ช่วยส่วนตัวที่รันบนเครื่องของคุณ รวดเร็ว และพร้อมใช้งานตลอดเวลา นี่คือคำตอบ

[เว็บไซต์](https://openclaw.ai) · [เอกสาร](https://docs.openclaw.ai) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [เริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started) · [อัปเดต](https://docs.openclaw.ai/install/updating) · [ตัวอย่างการใช้งาน](https://docs.openclaw.ai/start/showcase) · [คำถามที่พบบ่อย](https://docs.openclaw.ai/start/faq) · [ตัวช่วยติดตั้ง](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-clawdbot) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

วิธีแนะนำ: รันตัวช่วยติดตั้งเบื้องต้น (`openclaw onboard`) จะแนะนำผ่านขั้นตอน gateway, workspace, ช่องทาง และ skills ตัวช่วย CLI เป็นวิธีที่แนะนำและใช้งานได้บน **macOS, Linux และ Windows (ผ่าน WSL2 แนะนำอย่างยิ่ง)**
ใช้งานได้กับ npm, pnpm หรือ bun
ติดตั้งครั้งแรก? เริ่มที่นี่: [เริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started)

**การสมัครสมาชิก (OAuth):**

- **[Anthropic](https://www.anthropic.com/)** (Claude Pro/Max)
- **[OpenAI](https://openai.com/)** (ChatGPT/Codex)

หมายเหตุเกี่ยวกับโมเดล: แม้ว่าจะรองรับโมเดลใดก็ได้ แต่ผมแนะนำ **Anthropic Pro/Max (100/200) + Opus 4.5** อย่างยิ่งเพื่อความแข็งแกร่งด้าน context แบบยาวและป้องกัน prompt injection ได้ดีกว่า ดู [การติดตั้งเบื้องต้น](https://docs.openclaw.ai/start/onboarding)

## โมเดล (การเลือกและการยืนยันตัวตน)

- การตั้งค่าโมเดล + CLI: [โมเดล](https://docs.openclaw.ai/concepts/models)
- การหมุนเวียนโปรไฟล์การยืนยันตัวตน (OAuth กับ API keys) + การสำรอง: [Model failover](https://docs.openclaw.ai/concepts/model-failover)

## ติดตั้ง (แนะนำ)

ระบบรัน: **Node ≥22**

```bash
npm install -g openclaw@latest
# หรือ: pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

ตัวช่วยติดตั้งจะติดตั้ง Gateway daemon (launchd/systemd user service) เพื่อให้ทำงานต่อเนื่อง

## เริ่มต้นอย่างรวดเร็ว (TL;DR)

ระบบรัน: **Node ≥22**

คู่มือสำหรับผู้เริ่มต้น (การยืนยันตัวตน, การจับคู่, ช่องทาง): [เริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# ส่งข้อความ
openclaw message send --to +1234567890 --message "สวัสดีจาก OpenClaw"

# พูดคุยกับผู้ช่วย (สามารถส่งกลับไปยังช่องทางที่เชื่อมต่อใดก็ได้: WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat)
openclaw agent --message "รายการตรวจสอบการส่ง" --thinking high
```

กำลังอัปเกรด? [คู่มืออัปเดต](https://docs.openclaw.ai/install/updating) (และรัน `openclaw doctor`)

## ช่องทางการพัฒนา

- **stable**: รุ่นที่แท็กแล้ว (`vYYYY.M.D` หรือ `vYYYY.M.D-<patch>`), npm dist-tag `latest`
- **beta**: แท็กรุ่นก่อนเผยแพร่ (`vYYYY.M.D-beta.N`), npm dist-tag `beta` (อาจไม่มีแอป macOS)
- **dev**: head ล่าสุดของ `main`, npm dist-tag `dev` (เมื่อเผยแพร่แล้ว)

สลับช่องทาง (git + npm): `openclaw update --channel stable|beta|dev`
รายละเอียด: [ช่องทางการพัฒนา](https://docs.openclaw.ai/install/development-channels)

## จาก source code (การพัฒนา)

แนะนำ `pnpm` สำหรับการ build จาก source code ใช้ Bun เป็นตัวเลือกสำหรับรัน TypeScript โดยตรง

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # ติดตั้ง UI deps อัตโนมัติในครั้งแรก
pnpm build

pnpm openclaw onboard --install-daemon

# วงจรการพัฒนา (โหลดใหม่อัตโนมัติเมื่อ TS เปลี่ยนแปลง)
pnpm gateway:watch
```

หมายเหตุ: `pnpm openclaw ...` รัน TypeScript โดยตรง (ผ่าน `tsx`) `pnpm build` สร้าง `dist/` สำหรับรันผ่าน Node / ไบนารี `openclaw` ที่แพ็คเกจแล้ว

## ค่าเริ่มต้นด้านความปลอดภัย (การเข้าถึง DM)

OpenClaw เชื่อมต่อกับช่องทางการส่งข้อความจริง ถือว่า DM ขาเข้าเป็น **ข้อมูลที่ไม่น่าเชื่อถือ**

คู่มือความปลอดภัยแบบเต็ม: [ความปลอดภัย](https://docs.openclaw.ai/gateway/security)

พฤติกรรมเริ่มต้นบน Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack:

- **การจับคู่ DM** (`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`): ผู้ส่งที่ไม่รู้จักจะได้รับรหัสจับคู่สั้นๆ และบอทจะไม่ประมวลผลข้อความของพวกเขา
- อนุมัติด้วย: `openclaw pairing approve <channel> <code>` (จากนั้นผู้ส่งจะถูกเพิ่มเข้าในรายการอนุญาตในเครื่อง)
- DM ขาเข้าสาธารณะต้องมีการเลือกใช้แบบชัดเจน: ตั้ง `dmPolicy="open"` และใส่ `"*"` ในรายการอนุญาตของช่องทาง (`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`)

รัน `openclaw doctor` เพื่อตรวจสอบนโยบาย DM ที่มีความเสี่ยง/ตั้งค่าผิด

## จุดเด่น

- **[Gateway แบบ Local-first](https://docs.openclaw.ai/gateway)** — ระบบควบคุมหลักเดียวสำหรับเซสชัน, ช่องทาง, เครื่องมือ และเหตุการณ์
- **[กล่องข้อความหลายช่องทาง](https://docs.openclaw.ai/channels)** — WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, BlueBubbles, Microsoft Teams, Matrix, Zalo, Zalo Personal, WebChat, macOS, iOS/Android
- **[การกำหนดเส้นทางหลายตัวแทน](https://docs.openclaw.ai/gateway/configuration)** — กำหนดเส้นทางช่องทาง/บัญชี/เพียร์ขาเข้าไปยังตัวแทนที่แยกออกมา (workspaces + เซสชันต่อตัวแทน)
- **[Voice Wake](https://docs.openclaw.ai/nodes/voicewake) + [Talk Mode](https://docs.openclaw.ai/nodes/talk)** — การพูดตลอดเวลาสำหรับ macOS/iOS/Android ด้วย ElevenLabs
- **[Live Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — พื้นที่ทำงานภาพที่ขับเคลื่อนโดยตัวแทนด้วย [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)
- **[เครื่องมือชั้นหนึ่ง](https://docs.openclaw.ai/tools)** — เบราว์เซอร์, canvas, nodes, cron, sessions และการกระทำ Discord/Slack
- **[แอปพลิเคชันสหาย](https://docs.openclaw.ai/platforms/macos)** — แอป menu bar บน macOS + [nodes](https://docs.openclaw.ai/nodes) บน iOS/Android
- **[การติดตั้งเบื้องต้น](https://docs.openclaw.ai/start/wizard) + [skills](https://docs.openclaw.ai/tools/skills)** — การตั้งค่าผ่านตัวช่วยพร้อม skills ที่รวมมา/จัดการ/workspace

## ประวัติดาว (Star History)

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## ทุกสิ่งที่เราสร้างมาจนถึงตอนนี้

### แพลตฟอร์มหลัก

- [Gateway WS control plane](https://docs.openclaw.ai/gateway) พร้อมเซสชัน, การแสดงสถานะ, การตั้งค่า, cron, webhooks, [Control UI](https://docs.openclaw.ai/web) และ [Canvas host](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)
- [พื้นผิว CLI](https://docs.openclaw.ai/tools/agent-send): gateway, agent, send, [wizard](https://docs.openclaw.ai/start/wizard) และ [doctor](https://docs.openclaw.ai/gateway/doctor)
- [Pi agent runtime](https://docs.openclaw.ai/concepts/agent) ในโหมด RPC พร้อม tool streaming และ block streaming
- [โมเดลเซสชัน](https://docs.openclaw.ai/concepts/session): `main` สำหรับแชทโดยตรง, การแยกกลุ่ม, โหมดการเปิดใช้งาน, โหมดคิว, ตอบกลับ กฎกลุ่ม: [กลุ่ม](https://docs.openclaw.ai/concepts/groups)
- [ไปป์ไลน์สื่อ](https://docs.openclaw.ai/nodes/images): รูปภาพ/เสียง/วิดีโอ, hooks การถอดเสียง, จำกัดขนาด, วงจรชีวิตไฟล์ชั่วคราว รายละเอียดเสียง: [เสียง](https://docs.openclaw.ai/nodes/audio)

### ช่องทาง

- [ช่องทาง](https://docs.openclaw.ai/channels): [WhatsApp](https://docs.openclaw.ai/channels/whatsapp) (Baileys), [Telegram](https://docs.openclaw.ai/channels/telegram) (grammY), [Slack](https://docs.openclaw.ai/channels/slack) (Bolt), [Discord](https://docs.openclaw.ai/channels/discord) (discord.js), [Google Chat](https://docs.openclaw.ai/channels/googlechat) (Chat API), [Signal](https://docs.openclaw.ai/channels/signal) (signal-cli), [iMessage](https://docs.openclaw.ai/channels/imessage) (imsg), [BlueBubbles](https://docs.openclaw.ai/channels/bluebubbles) (ส่วนขยาย), [Microsoft Teams](https://docs.openclaw.ai/channels/msteams) (ส่วนขยาย), [Matrix](https://docs.openclaw.ai/channels/matrix) (ส่วนขยาย), [Zalo](https://docs.openclaw.ai/channels/zalo) (ส่วนขยาย), [Zalo Personal](https://docs.openclaw.ai/channels/zalouser) (ส่วนขยาย), [WebChat](https://docs.openclaw.ai/web/webchat)
- [การกำหนดเส้นทางกลุ่ม](https://docs.openclaw.ai/concepts/group-messages): การควบคุมการกล่าวถึง, แท็กตอบกลับ, การแบ่งส่วนและการกำหนดเส้นทางแยกตามช่องทาง กฎช่องทาง: [ช่องทาง](https://docs.openclaw.ai/channels)

### แอปและ nodes

- [แอป macOS](https://docs.openclaw.ai/platforms/macos): ระบบควบคุม menu bar, [Voice Wake](https://docs.openclaw.ai/nodes/voicewake)/PTT, [Talk Mode](https://docs.openclaw.ai/nodes/talk) overlay, [WebChat](https://docs.openclaw.ai/web/webchat), เครื่องมือ debug, การควบคุม [gateway ระยะไกล](https://docs.openclaw.ai/gateway/remote)
- [iOS node](https://docs.openclaw.ai/platforms/ios): [Canvas](https://docs.openclaw.ai/platforms/mac/canvas), [Voice Wake](https://docs.openclaw.ai/nodes/voicewake), [Talk Mode](https://docs.openclaw.ai/nodes/talk), กล้อง, บันทึกหน้าจอ, การจับคู่ Bonjour
- [Android node](https://docs.openclaw.ai/platforms/android): [Canvas](https://docs.openclaw.ai/platforms/mac/canvas), [Talk Mode](https://docs.openclaw.ai/nodes/talk), กล้อง, บันทึกหน้าจอ, SMS ตัวเลือก
- [โหมด macOS node](https://docs.openclaw.ai/nodes): system.run/notify + การเปิดเผย canvas/camera

### เครื่องมือและระบบอัตโนมัติ

- [การควบคุมเบราว์เซอร์](https://docs.openclaw.ai/tools/browser): Chrome/Chromium เฉพาะของ openclaw, สแนปช็อต, การกระทำ, อัปโหลด, โปรไฟล์
- [Canvas](https://docs.openclaw.ai/platforms/mac/canvas): [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui) push/reset, eval, snapshot
- [Nodes](https://docs.openclaw.ai/nodes): สแนป/คลิปกล้อง, บันทึกหน้าจอ, [location.get](https://docs.openclaw.ai/nodes/location-command), การแจ้งเตือน
- [Cron + การปลุก](https://docs.openclaw.ai/automation/cron-jobs); [webhooks](https://docs.openclaw.ai/automation/webhook); [Gmail Pub/Sub](https://docs.openclaw.ai/automation/gmail-pubsub)
- [แพลตฟอร์ม Skills](https://docs.openclaw.ai/tools/skills): skills ที่รวมมา จัดการ และ workspace พร้อมการควบคุมการติดตั้ง + UI

### รันไทม์และความปลอดภัย

- [การกำหนดเส้นทางช่องทาง](https://docs.openclaw.ai/concepts/channel-routing), [นโยบายลองใหม่](https://docs.openclaw.ai/concepts/retry) และ [streaming/chunking](https://docs.openclaw.ai/concepts/streaming)
- [การแสดงสถานะ](https://docs.openclaw.ai/concepts/presence), [ตัวบ่งชี้การพิมพ์](https://docs.openclaw.ai/concepts/typing-indicators) และ [การติดตามการใช้งาน](https://docs.openclaw.ai/concepts/usage-tracking)
- [โมเดล](https://docs.openclaw.ai/concepts/models), [model failover](https://docs.openclaw.ai/concepts/model-failover) และ [การตัดเซสชัน](https://docs.openclaw.ai/concepts/session-pruning)
- [ความปลอดภัย](https://docs.openclaw.ai/gateway/security) และ [การแก้ไขปัญหา](https://docs.openclaw.ai/channels/troubleshooting)

### การดำเนินงานและการแพ็คเกจ

- [Control UI](https://docs.openclaw.ai/web) + [WebChat](https://docs.openclaw.ai/web/webchat) เสิร์ฟโดยตรงจาก Gateway
- [Tailscale Serve/Funnel](https://docs.openclaw.ai/gateway/tailscale) หรือ [SSH tunnels](https://docs.openclaw.ai/gateway/remote) พร้อมการยืนยันตัวตนด้วย token/password
- [โหมด Nix](https://docs.openclaw.ai/install/nix) สำหรับการตั้งค่าแบบประกาศ; การติดตั้งแบบ [Docker](https://docs.openclaw.ai/install/docker)
- การย้ายข้อมูล [Doctor](https://docs.openclaw.ai/gateway/doctor), [การบันทึกล็อก](https://docs.openclaw.ai/logging)

## วิธีการทำงาน (สั้น)

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       (control plane)         │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (openclaw …)
               ├─ WebChat UI
               ├─ แอป macOS
               └─ iOS / Android nodes
```

## ระบบย่อยหลัก

- **[Gateway WebSocket network](https://docs.openclaw.ai/concepts/architecture)** — ระบบควบคุม WS เดียวสำหรับไคลเอนต์, เครื่องมือ และเหตุการณ์ (พร้อมการดำเนินงาน: [คู่มือ Gateway](https://docs.openclaw.ai/gateway))
- **[Sessions + memory](https://docs.openclaw.ai/concepts/session)** — เซสชันต่อผู้ส่ง/กลุ่มพร้อมการจัดการหน่วยความจำ, การบีบอัด และ [การตัดเซสชัน](https://docs.openclaw.ai/concepts/session-pruning)
- **[Tools + skills](https://docs.openclaw.ai/tools)** — เครื่องมือในตัวและ [skills](https://docs.openclaw.ai/tools/skills) ที่จัดการ
- **[Media pipeline](https://docs.openclaw.ai/nodes/images)** — การอัปโหลด/ดาวน์โหลด, การประมวลผล และจำกัดขนาด
- **[Remote access](https://docs.openclaw.ai/gateway/remote)** — Tailscale/SSH, [การค้นหา](https://docs.openclaw.ai/gateway/discovery) พร้อมการยืนยันตัวตน

## ที่มาของชื่อ

**OpenClaw = CLAW + TARDIS** — เพราะทุกตัวกุ้งมังกรในอวกาศต้องการเครื่องเดินทางข้ามเวลา

---

_"เราทุกคนแค่เล่นกับ prompts ของเราเอง"_ — อาจเป็นคำพูดของ AI ที่กิน token มากเกินไป

## เครดิต

- **Peter Steinberger** ([@steipete](https://twitter.com/steipete)) — ผู้สร้าง, ผู้กระซิบกับกุ้งมังกร
- **Mario Zechner** ([@badlogicc](https://twitter.com/badlogicgames)) — ผู้สร้าง Pi, ผู้ทดสอบความปลอดภัย
- **Clawd** — กุ้งมังกรในอวกาศที่ขอชื่อที่ดีกว่า

## ผู้มีส่วนร่วมหลัก

- **Maxim Vovshin** (@Hyaxia, 36747317+Hyaxia@users.noreply.github.com) — Blogwatcher skill
- **Nacho Iacovino** (@nachoiacovino, nacho.iacovino@gmail.com) — การแยกวิเคราะห์ตำแหน่ง (Telegram + WhatsApp)

## สัญญาอนุญาต

MIT — อิสระเหมือนกุ้งมังกรในทะเล 🦞

---

_"เราทุกคนแค่เล่นกับ prompts ของเราเอง"_ — อาจเป็นคำพูดของ AI ที่กิน token มากเกินไป

## ขอบคุณผู้มีส่วนร่วมทั้งหมด

<a href="https://github.com/openclaw/openclaw/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=openclaw/openclaw" alt="ผู้มีส่วนร่วม" />
</a>

---

**🚀 พร้อมเริ่มต้น?** ติดตาม [คู่มือเริ่มต้นใช้งาน](https://docs.openclaw.ai/start/getting-started)

**💬 ต้องการความช่วยเหลือ?** เข้าร่วม [Discord](https://discord.gg/clawd) ของเรา

**🐛 พบบั๊ก?** เปิด [issue](https://github.com/openclaw/openclaw/issues)

**🌟 ชอบโปรเจกต์?** ให้ดาวบน [GitHub](https://github.com/openclaw/openclaw)!
