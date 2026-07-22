import React from 'react';
import { CamelConverter } from './components/CamelConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">DevPilot String Utility</h1>
      <CamelConverter />
    </div>
  );
}

export default App;