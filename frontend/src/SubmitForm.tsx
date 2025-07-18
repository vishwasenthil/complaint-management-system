import React, { useState } from 'react';

export default function SubmitForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    complaint: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.complaint) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Complaint submitted successfully!');
        setForm({ name: '', email: '', complaint: '' }); // reset form
      } else {
        alert('Failed to submit complaint.');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Submit a Complaint
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Your full name"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Complaint</span>
            <textarea
              name="complaint"
              value={form.complaint}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="Write your complaint here..."
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}