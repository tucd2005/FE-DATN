import React from 'react';

const Register = () => {
  
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="button"
        className="bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition duration-300"
      >
        Register
      </button>
    </form>
  );
};

export default Register;



