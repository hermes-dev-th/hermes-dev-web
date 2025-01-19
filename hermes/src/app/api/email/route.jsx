import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { to, subject, text, html } = await req.json(); // use `req.json()` to parse the body

  // ตรวจสอบว่า request body มีข้อมูลครบถ้วน
  if (!to || !subject || (!text && !html)) {
    return NextResponse.json(
      { message: 'Missing required email field.' },
      { status: 400 }
    );
  }

  try {
    // สร้าง transporter สำหรับส่งอีเมล
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // ใช้ชื่อแปรที่เข้าใจง่าย
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject,
      text,
      html,
    };

    // ส่งอีเมล
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!', info }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.', error }, { status: 500 });
  }
}
