'use client';

import React, { useState } from 'react';
import Form from '../components/Form';
import ResultDisplay from '../components/ResultDisplay';
import { fetchWhoisData } from '../utils/fetchWhoisData';

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setData(null);
    setError(null);
    setLoading(true);
    try {
      const result = await fetchWhoisData(query);
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative min-h-screen'>
      <main className='max-w-full sm:max-w-xl mx-auto mt-10 p-4'>
        <h1 className='text-3xl sm:text-4xl font-bold text-center mb-4'>IP/Domain Lookup</h1>
        <Form onSearch={handleSearch} />
        {loading && <div className='text-center p-4'>Loading...</div>}
        {!data && !loading && (
          <div className='mt-4 text-center p-4 text-gray-700 bg-gray-100 border border-gray-500 rounded-lg shadow-md'>
            Please enter a domain or IP address to find the details.
          </div>
        )}
        {data && <ResultDisplay data={data} error={error} />}
      </main>
      <footer className='absolute bottom-0 left-0 w-full p-4 text-center text-sm text-gray-600'>
        <div className='flex justify-end'>
          <p>&copy; 2025 Nagaraj Alva</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
