import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons

const Contact = () => {
  // State to manage form input values and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message.');
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-gray-200"
      style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1664303124313-126bf7456982?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
    >
      <NavigationBar />
      <main className="flex-grow mt-16 px-4 py-8">
        <section className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl mb-6">
            We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="flex items-center mb-4">
                <FaPhone className="mr-3" />
                <span>+91 8788978620</span>
              </p>
              <p className="flex items-center mb-4">
                <FaEnvelope className="mr-3" />
                <span>info@icinema.com</span>
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-3" />
                <span>123 theater line, Mumbai-442302</span>
              </p>
            </div>

            {/* Contact Form */}
            <form className="text-left space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row justify-between">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="mb-4 md:mb-0 md:mr-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your Message"
                className="p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className={`bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitSuccess && <p className="text-green-500 mt-4">{submitSuccess}</p>}
              {submitError && <p className="text-red-500 mt-4">{submitError}</p>}
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mt-4">
            © {new Date().getFullYear()} icinema. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
