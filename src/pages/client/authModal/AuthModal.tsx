import React, { useState } from 'react';
import { Modal } from 'antd';
import Register from './Register';
import Login from './Login';
import VerifyOtp from './VerifyOtp';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [tab, setTab] = useState<'login' | 'register' | 'verify'>('login');
  const [emailToVerify, setEmailToVerify] = useState<string>('');

  // Callback khi đăng ký thành công
  const handleRegisterSuccess = (email: string) => {
    setEmailToVerify(email);
    setTab('verify');
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Welcome to <span className="text-red-500">SPORTZ</span>Y
        </h2>
        <p className="text-gray-500 text-sm">
          Please {tab === 'login' ? 'sign in to your account' : tab === 'register' ? 'create your account' : 'verify your email'}
        </p>
      </div>

      {tab !== 'verify' && (
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
      )}

      {tab === 'login' && <Login />}
      {tab === 'register' && <Register setTab={setTab} onSuccess={handleRegisterSuccess} />}
      {tab === 'verify' && <VerifyOtp email={emailToVerify} />}
    </Modal>
  );
};

export default AuthModal;
