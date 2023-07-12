import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from './SignInComponent';

const page = async () => {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          src="https://links.papareact.com/161"
          width={700}
          height={700}
          alt="Profile Picture"
        />
        <SignInComponent providers={providers} />
      </div>
    </div>
  );
};

export default page;
