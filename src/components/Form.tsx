'use client';

import React, { useState } from 'react';

interface FormProps {
  onSearch: (query: string) => void;
}

const Form: React.FC<FormProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
      setError('');
    } else {
      setError('Please enter a valid IP address or domain.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 mt-4 p-4 bg-gray-50 rounded-lg shadow-md'>
      <div className='flex flex-col w-full'>
        <label htmlFor='lookup' className='text-sm text-gray-700 mb-2'>
          Enter IP or Domain
        </label>
        <input
          id='lookup'
          type='text'
          placeholder='e.g., example.com or 192.168.1.1'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto'
        />
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </div>

      <div className='flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto'>
        <button
          type='submit'
          className='bg-blue-500 text-white p-4 rounded w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Lookup
        </button>
      </div>
    </form>
  );
};

export default Form;
