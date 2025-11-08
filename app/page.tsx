// 'use client'
// import { useState } from 'react'

// export default function Home() {
//   const [name, setName] = useState('')
//   const [response, setResponse] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try {
//       const res = await fetch('https://d11yrfnfva.execute-api.eu-north-1.amazonaws.com/default/handleForms/handleContactForm', {
//         method: 'POST',
//         body: JSON.stringify({ name }),
//         headers: { 'Content-Type': 'application/json' }, 
//       })
//       const data = await res.json()
//       setResponse(data.message)
//     } catch (error) {
//       setResponse('Error: Failed to submit form')
//       console.error('Form submission error:', error)
//     }
//   };

//   return(
//     <div className='flex flex-col items-center justify-center h-screen'>
//       <h1 className='text-2xl font-bold'>Form Handler</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>
//         <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} className='border-2 border-gray-300 rounded-md p-2' />
//         <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Submit</button>
//       </form>
//       {response && <p className='text-2xl font-bold'>{response}</p>}
//     </div>
//   );
// }



'use client'
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Submitting...");
  
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong!");
    }
  };

  return (
    //demo line for ci-cd
    <div className="p-7 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full border p-2"
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}

