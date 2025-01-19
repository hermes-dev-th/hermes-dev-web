"use client"
import { useState } from 'react';

function Page() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ข้อมูลที่จะส่งไปยัง API
    const emailData = {
      to,
      subject,
      text,
      html,
    };

    try {
      // ส่งข้อมูลไปยัง API Route
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      // ถ้า Response สำเร็จ
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message);
      } else {
        const error = await response.json();
        setResponseMessage(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h1 className='size-2; m-20 '>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='m-20; size-10' htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='size-2' htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="html">HTML Content:</label>
          <textarea
            id="html"
            name="html"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <button className=' bg-lime-800 mt-10 ' type="submit">Send Email</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Page;
