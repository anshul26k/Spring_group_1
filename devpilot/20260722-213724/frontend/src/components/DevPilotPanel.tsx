import React, { useEffect, useState } from 'react';
import { subscribeToDevPilot, SSEData } from '../api/devpilot';

export const DevPilotPanel: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'streaming'>('idle');

  const startStreaming = () => {
    setStatus('streaming');
    const close = subscribeToDevPilot(
      (data: SSEData) => setLogs((prev) => [...prev, data.message]),
      () => setStatus('idle')
    );
    return close;
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-gray-50">
      <h3 className="text-lg font-bold mb-2">DevPilot AI Assistant</h3>
      <button 
        onClick={startStreaming} 
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={status === 'streaming'}
      >
        {status === 'streaming' ? 'Streaming...' : 'Start Integration'}
      </button>
      <div className="mt-4 space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="text-sm font-mono text-green-700">> {log}</div>
        ))}
      </div>
    </div>
  );
};