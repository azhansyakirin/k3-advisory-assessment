'use client'

import { useState } from 'react';
import { toast } from 'sonner';
import { DEFAULT_FORM_DATA, INPUT_CLASS } from '@/utils/constants';
import { validateEnquiry } from '@/utils/validations/validateEnquiry';
import Link from 'next/link';

const FieldError = ({ error }) => {
  if (!error) return null;
  return <p className="text-sm pt-1 text-red-500">{error}</p>;
}

const InputField = ({ name, label, type, value, onChange, placeholder, error, helpText }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ?
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={INPUT_CLASS}
          rows={5}
          placeholder={placeholder}
        />
        : <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={INPUT_CLASS}
          placeholder={placeholder}
        />
      }
      {helpText && <p className='text-xs text-neutral-400 pt-1' dangerouslySetInnerHTML={{ __html: helpText }} />}
      {error && <FieldError error={error} />}
    </div>
  );
}

const EnquiryPage = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [leadId, setLeadId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    const result = validateEnquiry(formData);

    if (!result.ok) {
      setFieldErrors(result.errors);
      toast.error('Please make sure all fields are filled correctly');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you! Your enquiry has been submitted', {
          description: `Reference: ${data.leadId}`,
        });
        setFormData(DEFAULT_FORM_DATA);
        setLeadId(data.leadId);
        return;
      }

      if (response.status === 400 && data.fieldErrors) {
        setFieldErrors(data.fieldErrors);
        toast.error('Please make sure all fields are filled correctly');
      } else {
        setApiError(data.error || 'An unexpected error occurred');
        toast.error('Failed to submit your enquiry. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setApiError(err);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col gap-8">

      <Link href="/services" className="inline-flex gap-2 items-center py-2 font-semibold uppercase hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back to services
      </Link>

      <div className="grid grid-cols-5 items-center gap-8">
        <section className="left col-span-5 md:col-span-2 w-full">
          <h1>Create your enquiry</h1>

          <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-4">
            <InputField
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Kimi Antonelli"
              error={fieldErrors?.name}
            />

            <InputField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourmail@mail.com"
              error={fieldErrors?.email}
              helpText={`Use <b>failed@mail.com</b> to simulate Salesforce error`}
            />

            <InputField
              name="message"
              label="Message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              placeholder="Eg. I would like to know the price for starter package..."
              error={fieldErrors?.message}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-400 py-2 px-4 cursor-pointer
    transition-all duration-200 ease-out
    hover:-translate-y-0.5 hover:shadow-md hover:bg-neutral-50
    active:translate-y-0 active:scale-95 active:shadow-sm
    disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none
    ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
            >
              {isSubmitting && (
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              )}
              <span className="transition-opacity duration-200">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </span>
            </button>
          </form>
        </section>

        <section className="right col-span-5 md:col-span-3">
          <div className='pb-2'>
            <h4>Form Data</h4>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          <div className='pb-2'>
            <h4>Lead Id</h4>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify({ leadId }, null, 2)}
            </pre>
          </div>
          <div className='pb-2'>
            <h4>Error Field</h4>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(fieldErrors, null, 2)}
            </pre>
          </div>
          <div className='pb-2'>
            <h4>API Error</h4>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(apiError, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </main>
  )
}

export default EnquiryPage;