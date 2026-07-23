import axios from 'axios';

export interface ArithmeticResult {
  operand1: number;
  operand2: number;
  operation: string;
  result: number;
}

export const fetchCalculation = async (a: number, b: number, op: string): Promise<ArithmeticResult> => {
  const response = await axios.get('/api/v1/arithmetic', {
    params: { a, b, op }
  });
  return response.data;
};