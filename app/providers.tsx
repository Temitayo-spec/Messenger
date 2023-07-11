'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
  session: any;
  children: React.ReactNode;
};

const Providers = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
