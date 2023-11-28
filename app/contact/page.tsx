
'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/util/SendEmail';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2 p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16'>
        <p className='text-4xl mt-4'>Contact</p>
        <p>If you want to contact me (professional inquiries, engineering questions, job offers 😉), you&#39;re welcome to add me on Discord (m_w_), or submit the form below, and I&#39;ll get back to you by email.</p>
        <label
          htmlFor='name'
          className=''
        >
        Name
        </label>
        <input
          type='text'
          placeholder='Name'
          className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
          {...register('name', { required: true })}
        />
        <label
          htmlFor='email'
          className=''
        >
          Email Address
        </label>
        <input
          type='email'
          placeholder='example@domain.com'
          className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
          {...register('email', { required: true })}
        />
                <label
          htmlFor='message'
          className=''
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder='Type your message'
          className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
          {...register('message', { required: true })}
        ></textarea>
        <button className='hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Contact;