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

const InputField = ({ name, label, type, value, onChange, placeholder, error }) => {
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
      {error && <FieldError error={error} />}
    </div>
  );
}

const EnquiryPage = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [leadId, setLeadId] = useState('');

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
      return;
    }

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
    }
  }

  return (
    <main className="min-h-screen p-24 flex flex-col gap-8">

      <Link href="/services" className="inline-flex gap-2 items-center py-2 font-semibold uppercase hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back to services
      </Link>

      <div className="grid grid-cols-5 items-center gap-8">
        <section className="left col-span-2 w-full">
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
              className="rounded-lg border border-neutral-400 py-2 px-4 cursor-pointer hover:opacity-80 hover:bg-neutral-50"
            >
              Submit
            </button>
          </form>
        </section>

        <section className="right font-mono col-span-3">
          <div>
            <h2>Form Data</h2>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          <div>
            <h2>Lead Id</h2>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify({ leadId }, null, 2)}
            </pre>
          </div>
          <div>
            <h2>Error Field</h2>
            <pre className="bg-neutral-100 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(fieldErrors, null, 2)}
            </pre>
          </div>
          <div>
            <h2>API Error</h2>
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