import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, company_name, email, subject, massage } = await req.json();

  if (!name || !email || !massage || !company_name) {
    return NextResponse.json(
      { message: 'Missing required email field.' },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // display user name but send from your email
      to: 'hermes.software.dev@gmail.com',
      subject: subject,
      text: `
        Name: ${name}
        Company: ${company_name}
        Email: ${email}
        Message: ${massage}
      `,
      replyTo: email, // this will allow you to reply directly to the user's email
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!', info }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.', error: error.toString() }, { status: 500 });
  }
}
