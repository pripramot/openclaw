# การมีส่วนร่วมใน OpenClaw

ยินดีต้อนรับสู่ถังกุ้งมังกร! 🦞

## ลิงก์ด่วน

- **GitHub:** https://github.com/openclaw/openclaw
- **Discord:** https://discord.gg/qkhbAGHRBT
- **X/Twitter:** [@steipete](https://x.com/steipete) / [@openclaw](https://x.com/openclaw)

## ผู้ดูแล

- **Peter Steinberger** - Benevolent Dictator
  - GitHub: [@steipete](https://github.com/steipete) · X: [@steipete](https://x.com/steipete)

- **Shadow** - ระบบย่อย Discord + Slack
  - GitHub: [@thewilloftheshadow](https://github.com/thewilloftheshadow) · X: [@4shad0wed](https://x.com/4shad0wed)

- **Jos** - Telegram, API, โหมด Nix
  - GitHub: [@joshp123](https://github.com/joshp123) · X: [@jjpcodes](https://x.com/jjpcodes)

- **Christoph Nakazawa** - โครงสร้างพื้นฐาน JS
  - GitHub: [@cpojer](https://github.com/cpojer) · X: [@cnakazawa](https://x.com/cnakazawa)

## วิธีการมีส่วนร่วม

1. **บั๊กและการแก้ไขเล็กๆ น้อยๆ** → เปิด PR เลย!
2. **ฟีเจอร์ใหม่ / สถาปัตยกรรม** → เริ่ม [GitHub Discussion](https://github.com/openclaw/openclaw/discussions) หรือถามใน Discord ก่อน
3. **คำถาม** → Discord #setup-help

## ก่อนที่คุณจะ PR

- ทดสอบในเครื่องด้วย instance ของ OpenClaw ของคุณ
- รันการทดสอบ: `pnpm build && pnpm check && pnpm test`
- รักษา PR ให้มีจุดเน้น (สิ่งเดียวต่อ PR)
- อธิบายว่าอะไรและทำไม

## PR ที่เขียนด้วย AI ยินดีต้อนรับ! 🤖

สร้างด้วย Codex, Claude หรือเครื่องมือ AI อื่นๆ? **เยี่ยมมาก - แค่ทำเครื่องหมาย!**

กรุณารวมใน PR ของคุณ:

- [ ] ทำเครื่องหมายว่าได้รับความช่วยเหลือจาก AI ในชื่อ PR หรือคำอธิบาย
- [ ] ระบุระดับการทดสอบ (ไม่ได้ทดสอบ / ทดสอบเบาะๆ / ทดสอบเต็มที่)
- [ ] รวม prompts หรือ session logs ถ้าเป็นไปได้ (ช่วยได้มาก!)
- [ ] ยืนยันว่าคุณเข้าใจว่าโค้ดทำอะไร

PR ที่เขียนด้วย AI เป็นพลเมืองชั้นหนึ่งที่นี่ เราแค่ต้องการความโปร่งใสเพื่อให้ผู้รีวิวรู้ว่าต้องมองหาอะไร

## จุดเน้นปัจจุบันและแผนงาน 🗺

ปัจจุบันเรากำลังให้ความสำคัญกับ:

- **ความเสถียร**: แก้ไขกรณีพิเศษในการเชื่อมต่อช่องทาง (WhatsApp/Telegram)
- **UX**: ปรับปรุงตัวช่วยติดตั้งเบื้องต้นและข้อความแสดงข้อผิดพลาด
- **Skills**: ขยายไลบรารีของ skills ที่รวมมาและปรับปรุงประสบการณ์นักพัฒนาการสร้าง Skill
- **ประสิทธิภาพ**: เพิ่มประสิทธิภาพการใช้ token และตรรกะการบีบอัด

ตรวจสอบ [GitHub Issues](https://github.com/openclaw/openclaw/issues) สำหรับป้ายกำกับ "good first issue"!

## แนวทางการเขียนโค้ด

### สไตล์โค้ด

- ใช้ TypeScript สำหรับโค้ดทั้งหมด
- ทำตามรูปแบบที่มีอยู่ในโค้ดเบส
- รันตัวตรวจสอบ: `pnpm check`
- รัก format: `pnpm format`

### การทดสอบ

- เขียนการทดสอบสำหรับฟีเจอร์ใหม่
- ตรวจสอบให้แน่ใจว่าการทดสอบที่มีอยู่ผ่าน
- มุ่งเป้าไปที่ความครอบคลุม ≥80%

### ข้อความ Commit

ใช้ [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: เพิ่มการรองรับช่องทาง LINE
fix: แก้ไขการรีเซ็ตเซสชัน Telegram
docs: อัปเดตคู่มือการติดตั้ง
test: เพิ่มการทดสอบการกำหนดเส้นทางช่องทาง
```

## โครงสร้างโปรเจกต์

```
openclaw/
├── src/              # โค้ดหลัก TypeScript
├── docs/             # เอกสาร
├── ui/               # WebChat UI
├── apps/             # แอปพลิเคชัน (macOS, iOS, Android)
├── extensions/       # ปลั๊กอินช่องทาง
└── test/             # การทดสอบ
```

## การตั้งค่าสภาพแวดล้อมการพัฒนา

```bash
# โคลนที่เก็บ
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# ติดตั้ง dependencies
pnpm install

# สร้าง UI
pnpm ui:build

# สร้างโปรเจกต์
pnpm build

# รันการทดสอบ
pnpm test

# เริ่ม gateway ในโหมดการพัฒนา
pnpm gateway:watch
```

## การส่ง Pull Request

1. แตกสาขา (fork) จากที่เก็บ
2. สร้างสาขาฟีเจอร์ของคุณ: `git checkout -b feature/amazing-feature`
3. ทำการเปลี่ยนแปลงของคุณ
4. รันการทดสอบ: `pnpm build && pnpm check && pnpm test`
5. Commit การเปลี่ยนแปลงของคุณ: `git commit -m 'feat: เพิ่มฟีเจอร์ที่น่าทึ่ง'`
6. Push ไปยังสาขา: `git push origin feature/amazing-feature`
7. เปิด Pull Request

## รายการตรวจสอบ PR

ก่อนส่ง PR ตรวจสอบให้แน่ใจว่า:

- [ ] โค้ดสร้างสำเร็จ (`pnpm build`)
- [ ] การทดสอบทั้งหมดผ่าน (`pnpm test`)
- [ ] การตรวจสอบ lint ผ่าน (`pnpm check`)
- [ ] เอกสารได้รับการอัปเดต (ถ้าจำเป็น)
- [ ] CHANGELOG.md ได้รับการอัปเดต (ถ้าจำเป็น)
- [ ] คำอธิบาย PR ชัดเจนและครบถ้วน

## มารยาทของชุมชน

- มีความเคารพและรวมทุกคน
- ให้ข้อเสนอแนะที่สร้างสรรค์
- รับวิจารณ์ด้วยใจกว้าง
- มุ่งเน้นไปที่สิ่งที่ดีที่สุดสำหรับโปรเจกต์

## ต้องการความช่วยเหลือ?

- 💬 เข้าร่วม [Discord](https://discord.gg/qkhbAGHRBT) ของเรา
- 📖 อ่าน [เอกสาร](https://docs.openclaw.ai)
- 🐛 รายงานบั๊กใน [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- 💡 แบ่งปันไอเดียใน [Discussions](https://github.com/openclaw/openclaw/discussions)

## สัญญาอนุญาต

ด้วยการมีส่วนร่วม คุณตกลงว่าการมีส่วนร่วมของคุณจะได้รับการอนุญาตภายใต้สัญญาอนุญาต MIT

---

**ขอบคุณที่มีส่วนร่วมใน OpenClaw!** 🦞

การมีส่วนร่วมทุกอย่างมีค่า ไม่ว่าจะใหญ่หรือเล็ก เราขอขอบคุณสำหรับความพยายามของคุณในการทำให้ OpenClaw ดีขึ้น!
