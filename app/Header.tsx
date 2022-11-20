import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoutButton from './LogoutButton';

const Header = () => {
  const session = true;

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-center p-8 shadow-md">
        <div className="flex w-full justify-between">
          <div className="cursor-pointer flex items-center space-x-2">
            <Image
              className="rounded-full object-contain cursor-pointer mx-2"
              src="https://links.papareact.com/jne"
              height={40}
              width={40}
              alt="avatar"
            />

            <div>
              <p className="text-blue-400">Logged in as:</p>
              <p className="font-bold text-lg">Temitayo</p>
            </div>
          </div>

          <div>
            <LogoutButton />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center p-10 shadow-md">
      <div className="flex flex-col space-y-5 items-center justify-center">
        <div className="flex item-center space-x-2 mt-4">
          <Image
            src="https://links.papareact.com/jne"
            width={40}
            height={40}
            alt="logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white font-bold rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
