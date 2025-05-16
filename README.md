# Hermes - Next.js Web Application

Hermes เป็นเว็บแอปพลิเคชันสร้างขึ้นด้วย [Next.js](https://nextjs.org) ที่ให้บริการเกี่ยวกับการพัฒนาซอฟต์แวร์ โดยรวมถึงหน้าแสดงข้อมูลบริการ การกำหนดราคา และระบบการติดต่อ

## การติดตั้ง

### ความต้องการเบื้องต้น
- Node.js เวอร์ชัน 18.0.0 หรือใหม่กว่า
- npm, yarn, pnpm, หรือ bun

### ขั้นตอนการติดตั้ง
1. โคลนโปรเจค:
   ```bash
   git clone https://github.com/ZoFirsT/hermes.git
   cd hermes
   ```

2. ติดตั้ง dependencies:
   ```bash
   npm install
   # หรือ
   yarn install
   # หรือ
   pnpm install
   # หรือ
   bun install
   ```

3. สร้างไฟล์ `.env.local` ที่รากของโปรเจคและเพิ่มตัวแปรสภาพแวดล้อมที่จำเป็น:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. รันเซิร์ฟเวอร์สำหรับพัฒนา:
   ```bash
   npm run dev
   # หรือ
   yarn dev
   # หรือ
   pnpm dev
   # หรือ
   bun dev
   ```

5. เปิดเบราว์เซอร์และไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## โครงสร้างโปรเจค

```
hermes/
├── .next/                  # ไฟล์ Next.js build ที่ถูกสร้างขึ้น
├── node_modules/           # แพ็คเกจและไลบรารี่ที่ติดตั้ง
├── public/                 # ไฟล์สถิต เช่น รูปภาพ, ฟอนต์
│   ├── images/             # รูปภาพสำหรับเว็บไซต์
│   └── sukhumvit-font/     # ฟอนต์ Sukhumvit
├── src/                    # โค้ดซอร์สของแอปพลิเคชัน
│   └── app/                # Next.js App Router
│       ├── api/            # API Routes
│       │   └── email/      # API สำหรับการส่งอีเมล
│       ├── components/     # React Components
│       │   ├── Contact.jsx # คอมโพเนนท์สำหรับการติดต่อ
│       │   ├── Footer.jsx  # คอมโพเนนท์ส่วนท้าย
│       │   ├── Hero.jsx    # คอมโพเนนท์ส่วนหัว
│       │   ├── Pricing.jsx # คอมโพเนนท์ราคา
│       │   ├── ScrollToTopOnRefresh.jsx # คอมโพเนนท์เลื่อนไปด้านบน
│       │   └── ServicesPage.jsx # คอมโพเนนท์หน้าบริการ
│       ├── globals.css     # CSS แบบ global
│       ├── layout.jsx      # Layout หลักของแอพ
│       └── page.jsx        # หน้าแรกของแอพ
├── .gitignore              # รายการไฟล์ที่ git จะไม่ track
├── jsconfig.json           # การตั้งค่า JavaScript
├── next.config.mjs         # การตั้งค่า Next.js
├── package-lock.json       # Lock file สำหรับ npm
├── package.json            # dependencies และ scripts
├── postcss.config.mjs      # การตั้งค่า PostCSS
└── tailwind.config.mjs     # การตั้งค่า Tailwind CSS
```

## คำอธิบายการทำงานของส่วนต่างๆ

### Components
- **Hero.jsx**: แสดงส่วนหัวของเว็บไซต์ หน้าแรก ที่แสดงข้อความต้อนรับและภาพหลัก
- **ServicesPage.jsx**: แสดงรายละเอียดการบริการที่มีทั้งหมด
- **Pricing.jsx**: แสดงแพ็คเกจราคาและบริการต่างๆ ของ Hermes
- **Contact.jsx**: ฟอร์มสำหรับติดต่อ ใช้ API เพื่อส่งอีเมล
- **Footer.jsx**: แสดงส่วนท้ายของเว็บไซต์ ประกอบด้วยข้อมูลติดต่อและลิงก์ที่เกี่ยวข้อง
- **ScrollToTopOnRefresh.jsx**: คอมโพเนนท์เพื่อเลื่อนหน้าไปด้านบนเมื่อรีเฟรชหน้าเว็บ

### API
- **/api/email/route.jsx**: API endpoints สำหรับฟอร์มติดต่อ ใช้ Nodemailer เพื่อส่งอีเมล มีระบบป้องกันสแปมและ rate limiting

## การใช้งานและการกำหนดค่า

### การปรับแต่งเนื้อหา
- แก้ไขไฟล์ในโฟลเดอร์ `src/app/components` เพื่อปรับแต่งเนื้อหาในแต่ละส่วน
- แก้ไขข้อมูลในไฟล์ `src/app/page.jsx` เพื่อปรับแต่งหน้าหลัก

### การปรับแต่ง Style
- แก้ไข `src/app/globals.css` สำหรับ CSS แบบ global
- แก้ไข `tailwind.config.mjs` เพื่อปรับแต่ง Tailwind CSS

### การตั้งค่าอีเมล
- ตรวจสอบให้แน่ใจว่าคุณได้ตั้งค่าตัวแปร `EMAIL_USER` และ `EMAIL_PASS` ในไฟล์ `.env.local`
- สำหรับ Gmail คุณจำเป็นต้องใช้ "App Password" ไม่ใช่รหัสผ่านปกติ

## การ Deploy

เราแนะนำให้ Deploy บน Vercel เนื่องจากเป็นแพลตฟอร์มที่พัฒนาโดยทีมเดียวกันกับ Next.js

1. สร้าง account บน [Vercel](https://vercel.com) ถ้ายังไม่มี
2. เชื่อมต่อกับ GitHub repository ของคุณ
3. ตั้งค่า Environment Variables ที่จำเป็น (EMAIL_USER, EMAIL_PASS)
4. Deploy!

สำหรับทางเลือกอื่นในการ Deploy สามารถอ่านได้จาก [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## การพัฒนาเพิ่มเติม

- เพิ่มระบบ Authentication สำหรับผู้ใช้
- เพิ่มหน้า Dashboard สำหรับผู้ใช้หลังล็อกอิน
- สร้างหน้า Blog/News สำหรับประกาศข่าวสาร
- ปรับปรุง SEO และ Performance
- เพิ่มระบบรองรับหลายภาษา

## License

Copyright © 2024 Hermes. All rights reserved.
