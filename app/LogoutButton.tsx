'use client';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white font-bold rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
