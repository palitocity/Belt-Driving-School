"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "How long does it take to complete driving lessons?",
    answer:
      "Training duration depends on your package and learning speed, but on average, most students complete their lessons within 2–4 weeks.",
  },
  {
    question: "Do you offer training for both manual and automatic cars?",
    answer:
      "Yes. We provide training on both manual and automatic vehicles to suit your preference.",
  },
  {
    question: "Can I choose flexible training hours to fit my schedule?",
    answer:
      "Absolutely. We understand busy schedules, so we offer flexible lesson times, including weekends.",
  },
  {
    question: "Will I get a certificate after completing my training?",
    answer:
      "Yes. Upon successful completion of your training, we issue a certificate that proves your competence.",
  },
  {
    question: "Do you provide a car for training, or do I need my own?",
    answer:
      "We provide well-maintained training vehicles, but you can also choose to train with your own car if you prefer.",
  },
  {
    question: "How long does it take to process a new driver's license?",
    answer:
      "Typically, processing takes a few days to a couple of weeks depending on the authorities, but we offer support to ensure a faster process.",
  },
  {
    question: "Can you help me renew my driver's license if it is expired?",
    answer:
      "Yes. We handle license renewals efficiently, even if your license has already expired.",
  },
  {
    question: "What documents do I need to apply for a learner's permit?",
    answer:
      "You'll need a passport photograph, proof of identity, and a medical certificate of fitness. Our team will guide you through the details.",
  },
  {
    question: "Is it possible to process a driver's license within a few days?",
    answer:
      "Yes. We provide express services to help you process your driver's license quickly and hassle-free.",
  },
  {
    question: "Can you help me if my driver's license has errors on it?",
    answer:
      "Yes. We assist in correcting errors such as misspelled names, incorrect dates, or other issues on your license.",
  },
  {
    question: "How quickly can you help me renew my vehicle particulars?",
    answer:
      "Vehicle particulars renewal can be completed within minutes when all required documents are available.",
  },
  {
    question: "Do you assist with new plate number registration?",
    answer:
      "Yes. We handle new plate registrations to ensure your vehicle is properly documented.",
  },
  {
    question: "What do I need to bring for a change of ownership?",
    answer:
      "You'll need the old registration documents, proof of purchase, and a valid means of identification. Our staff will guide you through the process.",
  },
  {
    question: "Can you help me if my car documents are already expired?",
    answer:
      "Yes. We can still assist with renewal, but additional charges may apply depending on the authority's regulations.",
  },
  {
    question: "Do you assist with vehicle insurance as well?",
    answer:
      "Yes. We can connect you with approved insurance providers to keep your vehicle fully covered.",
  },
  {
    question: "How much do your driving lessons cost?",
    answer:
      "Prices vary based on the package you select. Contact us for a breakdown of available plans.",
  },
  {
    question: "Do you offer installment payment options for lessons?",
    answer:
      "Yes. We provide flexible payment options to make training more convenient.",
  },
  {
    question: "Where are you located, and how can I contact you?",
    answer:
      "We are located in Ibadan, Ogun, and Ondo State. You can reach us via phone, WhatsApp, or our contact form on the website.",
  },
  {
    question: "Do you offer express services for urgent cases?",
    answer:
      "Yes. For urgent requests, we provide express service options at an additional fee.",
  },
  {
    question: "Why should I choose your school over others?",
    answer:
      "We combine professional driving instruction with fast and reliable document processing services, making us a one-stop solution for your driving and vehicle needs.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl bg-white shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-blue-600 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
