import React from 'react';

const Login = () => {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="button"
        className="bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
