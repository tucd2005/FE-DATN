import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../pages/client/home/components/chat_bot';

const ClientLayout = () => {
  return (
    <>
      <div>
        <ChatBot />
        <Header />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ClientLayout