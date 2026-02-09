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

1. **บั๊กและการแก้ไขเล็กน้อย** → เปิด PR ได้เลย!
2. **ฟีเจอร์ใหม่ / สถาปัตยกรรม** → เริ่ม [GitHub Discussion](https://github.com/openclaw/openclaw/discussions) หรือถามใน Discord ก่อน
3. **คำถาม** → Discord #setup-help

## ก่อนที่คุณจะ PR

- ทดสอบในเครื่องด้วย OpenClaw instance ของคุณ
- รันการทดสอบ: `pnpm build && pnpm check && pnpm test`
- รักษา PR ให้มีจุดเน้น (สิ่งเดียวต่อ PR)
- อธิบายว่าอะไรและทำไม

## PR ที่สร้างด้วย AI/Vibe-Coded ยินดีต้อนรับ! 🤖

สร้างด้วย Codex, Claude หรือเครื่องมือ AI อื่นๆ? **เยี่ยม - แค่ทำเครื่องหมาย!**

โปรดรวมใน PR ของคุณ:

- [ ] ทำเครื่องหมายว่าได้รับความช่วยเหลือจาก AI ในชื่อหรือคำอธิบาย PR
- [ ] ระบุระดับการทดสอบ (ไม่ได้ทดสอบ / ทดสอบเบาๆ / ทดสอบเต็มรูปแบบ)
- [ ] รวม prompts หรือบันทึกเซสชันหากเป็นไปได้ (มีประโยชน์มาก!)
- [ ] ยืนยันว่าคุณเข้าใจว่าโค้ดทำอะไร

PR ที่สร้างด้วย AI เป็นพลเมืองชั้นหนึ่งที่นี่ เราแค่ต้องการความโปร่งใสเพื่อให้ผู้ตรวจสอบรู้ว่าจะมองหาอะไร

## โฟกัสและแผนงานปัจจุบัน 🗺

ขณะนี้เรากำลังให้ความสำคัญกับ:

- **ความเสถียร**: แก้ไขกรณีขอบในการเชื่อมต่อช่องทาง (WhatsApp/Telegram)
- **UX**: ปรับปรุงวิซาร์ดการตั้งค่าเบื้องต้นและข้อความแสดงข้อผิดพลาด
- **Skills**: ขยายไลบรารีของ skills ที่รวมอยู่และปรับปรุงประสบการณ์นักพัฒนาในการสร้าง Skill
- **ประสิทธิภาพ**: เพิ่มประสิทธิภาพการใช้ token และตรรกะการบีบอัด

ตรวจสอบ [GitHub Issues](https://github.com/openclaw/openclaw/issues) สำหรับป้ายกำกับ "good first issue"!

## แนวทางการเขียนโค้ด

- ใช้ TypeScript สำหรับโค้ดใหม่ทั้งหมด
- ปฏิบัติตามรูปแบบการเขียนโค้ดที่มีอยู่ในโปรเจกต์
- เขียนการทดสอบสำหรับฟีเจอร์ใหม่
- อัปเดตเอกสารเมื่อเหมาะสม
- ใช้ชื่อตัวแปรและฟังก์ชันที่มีความหมาย

## การติดตั้งสำหรับการพัฒนา

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build
pnpm build

# รันการทดสอบ
pnpm test

# รัน linting
pnpm check
```

## โครงสร้างโปรเจกต์

- `src/` — ซอร์สโค้ดหลัก
- `docs/` — เอกสาร
- `ui/` — เว็บ UI
- `apps/` — แอปเสริม (macOS, iOS, Android)
- `extensions/` — ปลั๊กอินช่องทาง
- `scripts/` — สคริปต์การสร้างและยูทิลิตี้
- `test/` — การทดสอบ

## การรายงานบั๊ก

เมื่อรายงานบั๊ก โปรดรวม:

1. **คำอธิบาย**: อธิบายปัญหาอย่างชัดเจน
2. **ขั้นตอนการทำซ้ำ**: วิธีการทำให้เกิดบั๊ก
3. **พฤติกรรมที่คาดหวัง**: สิ่งที่คุณคาดหวังให้เกิดขึ้น
4. **พฤติกรรมจริง**: สิ่งที่เกิดขึ้นจริง
5. **สภาพแวดล้อม**:
   - เวอร์ชัน OpenClaw
   - ระบบปฏิบัติการ
   - เวอร์ชัน Node.js
   - ช่องทางที่ได้รับผลกระทบ

## การขอฟีเจอร์

สำหรับฟีเจอร์ใหม่:

1. ตรวจสอบ [GitHub Discussions](https://github.com/openclaw/openclaw/discussions) และ Issues ที่มีอยู่
2. อธิบายฟีเจอร์และกรณีการใช้งาน
3. พูดคุยเกี่ยวกับแนวทางการดำเนินการที่เป็นไปได้
4. รอการอนุมัติก่อนเริ่มงานใหญ่

## การตั้งค่า Locale และภาษา

เมื่อเพิ่มการสนับสนุนภาษาใหม่:

1. สร้างไฟล์แปลใน `src/i18n/locales/{code}.json`
2. เพิ่มเอกสารใน `docs/{code}/`
3. อัปเดตไฟล์ README ที่เหมาะสม
4. รับรองว่าใช้การเข้ารหัส UTF-8
5. ไม่เปลี่ยนภาษาเริ่มต้น (ภาษาอังกฤษ)

## รับความช่วยเหลือ

หากคุณติดขัด:

- ถามใน Discord #dev-chat
- เปิด [GitHub Discussion](https://github.com/openclaw/openclaw/discussions)
- ตรวจสอบ [เอกสาร](https://docs.openclaw.ai)

## รหัสจรรยาบรรณ

- เคารพและมีอารมณ์ขันกับผู้มีส่วนร่วมทุกคน
- มีใจเปิดกว้างต่อความคิดเห็น
- โฟกัสที่การสร้างสรรค์
- ช่วยเหลือและสนับสนุนผู้มาใหม่

## สิทธิ์การใช้งาน

ด้วยการมีส่วนร่วม คุณตกลงว่าผลงานของคุณจะได้รับการอนุญาตภายใต้ MIT License เดียวกันกับโปรเจกต์

---

ขอบคุณที่ช่วยทำให้ OpenClaw ดีขึ้น! 🦞✨
