export interface SSEData {
  message: string;
}

export const subscribeToDevPilot = (
  onMessage: (data: SSEData) => void,
  onError: (err: any) => void
) => {
  const eventSource = new EventSource('http://localhost:8000/api/v1/devpilot/stream');

  eventSource.onmessage = (event) => {
    try {
      const parsedData: SSEData = JSON.parse(event.data);
      onMessage(parsedData);
    } catch (e) {
      onError(e);
    }
  };

  eventSource.onerror = (err) => {
    onError(err);
    eventSource.close();
  };

  return () => eventSource.close();
};