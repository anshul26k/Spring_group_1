import React, { useState } from 'react';
import { fetchCalculation, ArithmeticResult } from '../api/arithmeticApi';

export const ArithmeticUI: React.FC = () => {
  const [val, setVal] = useState({ a: 0, b: 0, op: 'add' });
  const [res, setRes] = useState<ArithmeticResult | null>(null);
  const [err, setErr] = useState('');

  const handleCompute = async () => {
    try {
      setErr('');
      const data = await fetchCalculation(val.a, val.b, val.op);
      setRes(data);
    } catch (e: any) {
      setErr(e.response?.data?.error || 'Server error');
    }
  };

  return (
    <div>
      <input type="number" onChange={e => setVal({...val, a: +e.target.value})} />
      <select onChange={e => setVal({...val, op: e.target.value})}>
        <option value="add">+</option><option value="subtract">-</option>
        <option value="multiply">*</option><option value="divide">/</option>
      </select>
      <input type="number" onChange={e => setVal({...val, b: +e.target.value})} />
      <button onClick={handleCompute}>Calculate</button>
      {res && <div>Result: {res.result}</div>}
      {err && <div style={{color:'red'}}>{err}</div>}
    </div>
  );
};