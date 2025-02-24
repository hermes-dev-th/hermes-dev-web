"use client"
import { useState } from 'react';

function Page() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [massage, setMassage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ข้อมูลที่จะส่งไปยัง API
    const emailData = {
      to,
      subject,
      massage,
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
    <div >

      <form onSubmit={handleSubmit} className='flex flex-col items-start w-[35vw] text-[1.1vw] font-light p-[2vw] gap-[1vw]'>
        <div className='flex flex-col w-full'>
          <label htmlFor="to">Your name</label>
          <input
            className='outline outline-2 rounded-[0.5vw] p-[0.1vw] px-[0.5vw] text-[1.2vw]'
            type="email"
            id="to"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="to">Company name</label>
          <input
            className='outline outline-2 rounded-[0.5vw] p-[0.1vw] px-[0.5vw] text-[1.2vw]'
            type="email"
            id="to"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="to">Your Email</label>
          <input
            className='outline outline-2 rounded-[0.5vw] p-[0.1vw] px-[0.5vw] text-[1.2vw]'
            type="email"
            id="to"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="subject">Subject:</label>
          <input
            className='outline outline-2 rounded-[0.5vw] p-[0.1vw] px-[0.5vw] text-[1.2vw]'
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="massage">Your Massage:</label>
          <textarea
            className='outline outline-2 rounded-[0.5vw] p-[0.1vw] px-[0.5vw] text-[1.2vw] h-[7vw]'
            id="massage"
            name="massage"
            value={massage}
            onChange={(e) => setMassage(e.target.value)}
            required
          />
        </div>
        <div className='w-full flex justify-center mt-[1vw]'>
          <button className=" bg-black w-[8vw] h-[3vw] text-[1.2vw] rounded-[0.5vw] font-bold text-white duration-700 hover:bg-[#999999]" type="submit">Send</button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Page;
