'use client';

import React, { useState, useRef } from 'react';
import { Body, Small } from "@/components/Typography";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false,
    error: null,
    success: false
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Start loading state
    setFormState({
      ...formState,
      loading: true,
      submitted: true
    });

    // Simulate form submission
    setTimeout(() => {
      // Handle success
      setFormState({
        ...formState,
        loading: false,
        success: true,
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prevState => ({
          ...prevState,
          success: false,
          submitted: false
        }));
      }, 5000);
    }, 1500);
  };

  // Button animation on hover
  const buttonAnimation = "transform transition-transform duration-300 hover:scale-105 active:scale-95";

  // Form field styling - shared across all inputs for consistency
  const inputStyles = "py-3 px-4 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-stone-200 text-stone-700 text-base font-medium focus:border-t-transparent focus:border-x-transparent focus:border-b-stone-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <>
      {formState.success ? (
        <div className="p-4 mb-4 text-sm bg-teal-50 border border-teal-200 text-teal-800" role="alert">
          <div className="flex gap-2">
            <div>
              <Body className="font-medium">Thank you for your message!</Body>
              <Small>{`We'll be in touch with you soon.`}</Small>
            </div>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name field - no icon */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className={inputStyles}
                placeholder="Name"
                disabled={formState.loading}
              />
            </div>

            {/* Email field - no icon */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                className={inputStyles}
                placeholder="Email"
                disabled={formState.loading}
              />
            </div>
          </div>

          {/* Subject select - using advanced Preline select */}
          <div>
            <select
              id="subject"
              name="subject"
              required
              value={formState.subject}
              onChange={handleChange}
              data-hs-select='{
                "placeholder": "Select subject...",
                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 flex gap-x-2 text-nowrap w-full cursor-pointer bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-stone-200 text-stone-700 text-base font-medium text-start focus:outline-hidden focus:border-t-transparent focus:border-x-transparent focus:border-b-stone-500 focus:ring-0",
                "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 overflow-hidden overflow-y-auto",
                "optionClasses": "py-2 px-4 w-full text-sm text-stone-700 cursor-pointer hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50",
                "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-stone-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
              }'
              className="hidden"
              disabled={formState.loading}
            >
              <option value="">Select subject</option>
              <option value="booking">Booking Inquiry</option>
              <option value="question">General Question</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message textarea - no icon, matched styling */}
          <div>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formState.message}
              onChange={handleChange}
              className={inputStyles}
              placeholder="Your message"
              disabled={formState.loading}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={formState.loading}
              className={`w-full py-4 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold border border-stone-600 text-stone-800 bg-stone-50 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none ${buttonAnimation}`}
            >
              {formState.loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-stone-600 rounded-full" role="status" aria-label="loading"></span>
                  <Body className="font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center">
                    Sending...
                  </Body>
                </>
              ) : (
                <Body className="font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center text-stone-800">
                  Send Message
                </Body>
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
}