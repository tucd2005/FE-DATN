import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../pages/client/home/components/chat_bot';
import ChatAI from '../pages/client/home/components/chat_bot_simple';

const ClientLayout = () => {
  const [openChat, setOpenChat] = useState<"ai" | "bot" | null>(null);

  const toggleChat = (type: "ai" | "bot") => {
    setOpenChat((prev) => (prev === type ? null : type));
  };

  return (
    <>
      <div>
        <Header />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />

        {/* Chat AI Icon + Panel */}
        <ChatAI isOpen={openChat === "ai"} toggle={() => toggleChat("ai")} />

        {/* Chat Bot Icon + Panel */}
        <ChatBot isOpen={openChat === "bot"} toggle={() => toggleChat("bot")} />
      </div>
    </>
  );
};

export default ClientLayout;
