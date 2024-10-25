import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../Styles/FAQFormSection.css'; // Ensure this path is correct

const FAQFormSection = () => {
  // State to manage form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  // State to manage which FAQ item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Function to send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    // Prepare the template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      company: company,
    };

    // Send email using the provided EmailJS service and template IDs
    emailjs.send('service_hcsf9zp', 'template_5r1nu3v', templateParams, 'OAqW7sjV7QM8EOEtC')
      .then(() => {
          console.log('SUCCESS!');
          // Reset form fields after successful submission
          setName('');
          setEmail('');
          setCompany('');
      }, (error) => {
          console.log('FAILED...', error.text);
      });
  };

  // Toggle function for showing/hiding FAQ answers
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: 'What is DataDiscover.ai?',
      answer: 'DataDiscover.ai is an advanced business intelligence platform that utilizes AI to mine and analyze both structured and unstructured data for actionable insights.'
    },
    {
      question: 'How does DataDiscover.ai improve business intelligence?',
      answer: 'It simplifies complex workflows, enabling seamless data integration, multi-document querying, and real-time analysis, allowing businesses to make data-driven decisions effectively.'
    },
    {
      question: 'What types of data can be processed?',
      answer: 'The platform supports various data formats and document types, including databases, APIs, and external datasets.'
    },
    {
      question: 'Is DataDiscover.ai secure and compliant?',
      answer: 'Yes, DataDiscover.ai adheres to high-security standards and ensures compliance with industry regulations, maintaining data confidentiality.'
    },
    {
      question: 'How can I get started with DataDiscover.ai?',
      answer: 'You can start today by visiting our website and requesting a demo to unlock the full potential of your data with our cutting-edge platform!'
    }
    // Add more FAQ items as needed
  ];

  return (
    <div className="faq-form-section" id="faq-form-section">
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          {faqs.map((faq, index) => (
            <li key={index} className="faq-item">
              <div className="faq-header" onClick={() => toggleAnswer(index)}>
                <span className="faq-question">{faq.question}</span>
                <span className="faq-toggle">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>

      <div className="form-section">
        <h2>Contact Us</h2>
        <form onSubmit={sendEmail}>
  <label htmlFor="name">Name <span className="important">*</span></label>
  <input
    type="text"
    id="name"
    name="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

  <label htmlFor="email">Email <span className="important">*</span></label>
  <input
    type="email"
    id="email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <label htmlFor="company">Company Name</label>
  <input
    type="text"
    id="company"
    name="company"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
  />

  <button type="submit">Submit</button>
</form>

      </div>
    </div>
  );
};

export default FAQFormSection;
