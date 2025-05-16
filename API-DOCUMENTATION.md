# API Documentation สำหรับโปรเจค Hermes

เอกสารนี้อธิบายการทำงานของ API endpoints ต่างๆ ในโปรเจค Hermes

## Email API

### Send Email
- **Endpoint**: `/api/email`
- **Method**: POST
- **Content-Type**: application/json

**Request Body**:
```json
{
  "name": "ชื่อผู้ติดต่อ",
  "company_name": "ชื่อบริษัท",
  "email": "email@example.com",
  "subject": "หัวข้อ",
  "massage": "ข้อความที่ต้องการส่ง"
}
```

**ฟิลด์ที่จำเป็น**:
- `name`: ชื่อผู้ติดต่อ
- `company_name`: ชื่อบริษัท
- `email`: อีเมลสำหรับการตอบกลับ
- `massage`: ข้อความที่ต้องการส่ง

**Response (สำเร็จ - 200 OK)**:
```json
{
  "message": "Email sent successfully!",
  "info": { ... } // รายละเอียดจาก nodemailer
}
```

**Response (ข้อมูลไม่ครบ - 400 Bad Request)**:
```json
{
  "message": "Missing required email field."
}
```

**Response (อีเมลไม่ถูกต้อง - 400 Bad Request)**:
```json
{
  "message": "Invalid email format."
}
```

**Response (ข้อความดูเหมือนสแปม - 400 Bad Request)**:
```json
{
  "message": "ข้อความดูเหมือนจะเป็นสแปม กรุณาลองใหม่อีกครั้ง"
}
```

**Response (ส่งคำขอมากเกินไป - 429 Too Many Requests)**:
```json
{
  "message": "Too many requests. Please try again later."
}
```

**Response (เซิร์ฟเวอร์มีปัญหา - 500 Internal Server Error)**:
```json
{
  "message": "Failed to send email.",
  "error": "รายละเอียดข้อผิดพลาด"
}
```

## ระบบป้องกัน

API นี้มีระบบป้องกันหลายระดับ:

1. **Rate Limiting**: จำกัด 5 คำขอต่อชั่วโมงต่อ IP address
2. **ตรวจจับข้อความสแปม**: ตรวจสอบคำที่เกี่ยวข้องกับสแปมและความยาวของข้อความ
3. **ตรวจสอบรูปแบบอีเมล**: ตรวจสอบว่าอีเมลที่ส่งมามีรูปแบบที่ถูกต้อง

## การใช้งาน

ตัวอย่างการเรียกใช้ API จาก frontend โดยใช้ fetch:

```javascript
const sendEmail = async (formData) => {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }
    
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
```

## การตั้งค่า

API นี้ใช้ nodemailer และต้องการการตั้งค่าตัวแปรสภาพแวดล้อมดังนี้:
- `EMAIL_USER`: อีเมลที่ใช้ส่ง
- `EMAIL_PASS`: รหัสผ่านหรือ App Password สำหรับอีเมลนั้น

โปรดดูเอกสาร `ENV-EXAMPLE.md` สำหรับรายละเอียดเพิ่มเติมเกี่ยวกับการตั้งค่าตัวแปรสภาพแวดล้อม 