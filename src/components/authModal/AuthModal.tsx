import React, { useState } from 'react';
import { Modal } from 'antd';
import Register from './Register';
import Login from './Login';


const AuthModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('login');

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Welcome to <span className="text-red-500">SPORTZ</span>Y
        </h2>
        <p className="text-gray-500 text-sm">
          Please {tab === 'login' ? 'sign in to your account' : 'create your account'}
        </p>
      </div>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setTab('login')}
          className={`px-5 py-2 rounded-full transition duration-300 ${
            tab === 'login'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setTab('register')}
          className={`px-5 py-2 rounded-full transition duration-300 ${
            tab === 'register'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Register
        </button>
      </div>

      {tab === 'login' ? <Login /> : <Register />}
    </Modal>
  );
};

export default AuthModal;
