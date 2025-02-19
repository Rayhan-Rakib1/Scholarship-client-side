import React, { useState } from 'react';
import SectionTitle from '../../Shared/SectionTitle';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    { question: "How do I apply for scholarships?", answer: "To apply for scholarships, create an account, search for scholarships, and follow the instructions on each listing." },
    { question: "Are there scholarships for international students?", answer: "Yes! We have a list of scholarships specifically for international students." },
    { question: "Can I apply for multiple scholarships at once?", answer: "Yes, you can apply for as many scholarships as you meet the eligibility requirements for." },
    { question: "How can I track my scholarship applications?", answer: "You can save scholarships to your profile and track their deadlines and statuses from your account." }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
      <SectionTitle heading={'Frequently Asked Questions'} subHeading={'Find answers to common questions about the scholarship application process.'}></SectionTitle>

        <div className="mt-8 space-y-4">
          {faqItems.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow border border-base-300 rounded-lg">
              <input type="checkbox" checked={openIndex === index} onChange={() => toggleFAQ(index)} className="peer" />
              <div className="collapse-title text-xl font-medium text-gray-800">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
