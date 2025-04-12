import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5; // Maximum 5 requests per hour
const ipRequests = new Map();

// Spam protection configuration
const SPAM_KEYWORDS = ['viagra', 'lottery', 'winner', 'prize', 'casino', 'bet', '$$$'];
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;

function isSpam(content) {
  // Check for spam keywords
  const lowerContent = content.toLowerCase();
  if (SPAM_KEYWORDS.some(keyword => lowerContent.includes(keyword))) {
    return true;
  }

  // Check message length
  if (content.length < MIN_MESSAGE_LENGTH || content.length > MAX_MESSAGE_LENGTH) {
    return true;
  }

  return false;
}

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = ipRequests.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  validRequests.push(now);
  ipRequests.set(ip, validRequests);
  return true;
}

export async function POST(req) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  
  // Check rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const { name, company_name, email, subject, massage } = await req.json();

  // Validate required fields
  if (!name || !email || !massage || !company_name) {
    return NextResponse.json(
      { message: 'Missing required email field.' },
      { status: 400 }
    );
  }

  // Spam protection
  if (isSpam(massage)) {
    return NextResponse.json(
      { message: 'ข้อความดูเหมือนจะเป็นสแปม กรุณาลองใหม่อีกครั้ง' },
      { status: 400 }
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: 'Invalid email format.' },
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
