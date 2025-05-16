# ตัวอย่างไฟล์ .env.local สำหรับโปรเจค Hermes

สร้างไฟล์ `.env.local` ที่รากของโปรเจคและกำหนดค่าต่อไปนี้:

```
# สำหรับการส่งอีเมลจากฟอร์มติดต่อ
# สำหรับ Gmail ต้องใช้ App Password ที่สร้างจากหน้าการตั้งค่า Google Account
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# สำหรับการเพิ่มความปลอดภัยให้กับ API routes (ตัวอย่าง)
# API_SECRET=your_api_secret_here

# ตัวอย่างสำหรับการเชื่อมต่อกับบริการภายนอกอื่นๆ ในอนาคต
# DATABASE_URL=your_database_connection_string
# AUTH_SECRET=your_auth_secret
```

## การตั้งค่า App Password สำหรับ Gmail

หากคุณใช้ Gmail สำหรับการส่งอีเมล คุณจะต้องสร้าง "App Password" โดยมีขั้นตอนดังนี้:

1. ไปที่ [Google Account Security](https://myaccount.google.com/security)
2. เปิดใช้งาน Two-factor authentication ถ้ายังไม่ได้เปิดใช้งาน
3. เลือก "App passwords" จากเมนูความปลอดภัย
4. สร้าง App password ใหม่สำหรับแอพของคุณ
5. คัดลอก password ที่ได้มาใส่ในตัวแปร `EMAIL_PASS`

## หมายเหตุสำคัญเกี่ยวกับความปลอดภัย

- อย่าเพิ่มไฟล์ `.env.local` เข้าไปใน git repository
- ตรวจสอบว่า `.env.local` อยู่ใน `.gitignore` แล้ว
- ทำการตั้งค่าตัวแปรสภาพแวดล้อมเหล่านี้บนแพลตฟอร์มที่ใช้ deploy ด้วย (เช่น Vercel) 