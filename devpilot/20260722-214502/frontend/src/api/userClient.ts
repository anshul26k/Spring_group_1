export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`User ${id} not found`);
  return response.json();
};