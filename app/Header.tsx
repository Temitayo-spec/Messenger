'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
// import { getServerSession } from 'next-auth/next';
// import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white p-4 shadow-sm w-full">
        <div className="flex w-full justify-between items-center">
          <div className="cursor-pointer flex items-center space-x-2">
            <Image
              className="rounded-full object-contain cursor-pointer mx-2"
              src={session?.user?.image!}
              height={40}
              width={40}
              alt="profile_picture"
            />
            <div>
              <p className="text-blue-400">Logged in as:</p>
              <p className="font-bold text-lg">{session?.user?.name}</p>
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
    <header className="sticky top-0 z-50 bg-white flex justify-center p-10 shadow-sm">
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
