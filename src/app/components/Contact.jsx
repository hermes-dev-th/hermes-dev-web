"use client"

import { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';


const ContactList = [
    { title: 'Address', content: '389/157 ต.แพรกษา อ.เมืองสมุทรปราการ จ.สมุทรปราการ 10280', id: 0 },
    { title: 'Phone', content: '061-239-9661', id: 1 },
    { title: 'Email', content: 'hermes.software.dev@gmail.com', id: 2 }
]

function ContactForm() {
  const [name, setName] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [massage, setMassage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailData = {
      name,
      company_name,
      email,
      subject,
      massage,
    };

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message);
        // Clear form on success
        setName('');
        setCompany_name('');
        setEmail('');
        setSubject('');
        setMassage('');
      } else {
        const error = await response.json();
        setResponseMessage(error.message);
      }
    } catch (error) {
      setResponseMessage('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">Your name</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company_name" className="text-sm font-medium text-gray-600">Company name</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition"
            type="text"
            id="company_name"
            name="company_name"
            value={company_name}
            onChange={(e) => setCompany_name(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">Your Email</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-600">Subject</label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition"
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="massage" className="text-sm font-medium text-gray-600">Your Message</label>
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition h-32"
            id="massage"
            name="massage"
            value={massage}
            onChange={(e) => setMassage(e.target.value)}
            required
          />
        </div>
        
        <div className="pt-2">
          <button 
            className="w-full bg-black text-white font-medium py-3 px-6 rounded-full transition duration-300 hover:bg-gray-800"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
      
      {responseMessage && (
        <div className="mt-4 text-center text-sm">
          <p className={`py-2 px-4 rounded-lg ${responseMessage.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {responseMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-medium mb-4 text-black tracking-tight">
                        Contact Us
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-base font-light">
                        Have questions or ready to start your project? Get in touch with our team.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {ContactList.map((contact) => (
                            <div key={contact.id} className="group">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">{contact.title}</h3>
                                <p className="text-lg">{contact.content}</p>
                            </div>
                        ))}
                        <div className="pt-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                                    <FaFacebook className="text-xl" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                                    <FaInstagram className="text-xl" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
                                    <FaLinkedin className="text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}