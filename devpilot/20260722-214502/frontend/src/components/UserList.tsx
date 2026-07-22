import React, { useEffect, useState } from 'react';
import { fetchUsers, User } from '../api/userClient';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <h1>User Directory</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} ({user.role}) - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};