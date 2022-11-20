"use client" // is a special import that tells Snowpack to load this file in the browser. This is how we can use React in the browser without any build step. Snowpack will take care of that for us.

const LogoutButton = () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white font-bold rounded">
      Sign Out
    </button>
  );
};

export default LogoutButton;
