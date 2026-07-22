export interface ConversionResponse {
  input: string;
  output: string;
}

export const fetchCamelCase = async (input: string): Promise<ConversionResponse> => {
  const response = await fetch(`http://localhost:8080/api/utils/camel-case?input=${encodeURIComponent(input)}`);
  if (!response.ok) throw new Error('Failed to convert string');
  return response.json();
};