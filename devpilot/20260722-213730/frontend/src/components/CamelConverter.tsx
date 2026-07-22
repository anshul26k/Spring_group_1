import React, { useState } from 'react';
import { fetchCamelCase } from '../api/converterApi';

export const CamelConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleConvert = async () => {
    try {
      const data = await fetchCamelCase(input);
      setResult(data.output);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <input 
        className="border p-2 mr-2"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="enter_snake_case"
      />
      <button onClick={handleConvert} className="bg-blue-500 text-white p-2 rounded">Convert</button>
      <div className="mt-4">Result: <strong>{result}</strong></div>
    </div>
  );
};