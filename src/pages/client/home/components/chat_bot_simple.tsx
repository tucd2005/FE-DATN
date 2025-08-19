"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, User, Sparkles, Zap } from 'lucide-react'
import { useChat } from "../../../../hooks/useChat"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý ảo của cửa hàng. Tôi có thể giúp gì cho bạn? ✨",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const chatMutation = useChat()
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 2000)
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    // Cập nhật tin nhắn người dùng
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const data = await chatMutation.mutateAsync({ message: inputMessage })

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices?.[0]?.message?.content ?? "❌ Không nhận được phản hồi.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "❌ Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }

  }



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button with Pulse Effect */}
      <div className="fixed bottom-32 right-6 z-50 flex items-center space-x-3"> {/* Adjusted bottom-6 to bottom-8 */}
        {/* Suggestion Line */}
        <div
          className={`bg-white text-gray-700 px-4 py-2 rounded-full shadow-lg transition-all duration-500 ease-out ${isOpen ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
            }`}
        >
          Cần trợ giúp? Chat ngay! ✨
        </div>
        <div className="relative">
          {/* Pulse rings */}
          <div
            className={`absolute inset-0 rounded-full bg-purple-400 animate-ping ${isOpen ? "opacity-0" : "opacity-75"}`}
          ></div>
          <div
            className={`absolute inset-0 rounded-full bg-purple-400 animate-pulse ${isOpen ? "opacity-0" : "opacity-50"}`}
          ></div>
          <button
            onClick={() => setIsOpen(true)}
            className={`relative bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 shadow-2xl transition-all duration-500 transform hover:scale-110
    ${isOpen ? "scale-0 rotate-180 opacity-0 pointer-events-none" : "scale-100 rotate-0"}
  `}
          >
            <Bot size={28} className="drop-shadow-lg" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Chat Modal with Enhanced Effects */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transform animate-in slide-in-from-bottom-4 duration-500">
          {/* Sparkles Effect */}
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`absolute text-yellow-400 animate-bounce`}
                  size={16}
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          )}
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden"> {/* Changed from-teal-500 to from-purple-500 and to-teal-600 to to-purple-600 */}
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-500/20 animate-pulse"></div> {/* Changed from-teal-400/20 to from-purple-400/20 and to-teal-500/20 to to-purple-500/20 */}
            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <Bot size={24} className="drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-semibold text-base">Trợ lý ảo</span>
                <div className="text-xs opacity-90 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Đang hoạt động</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-all duration-300 transform hover:scale-110 relative z-10"
            >
              <X size={20} />
            </button>
          </div>
          {/* Messages with Enhanced Styling */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-${message.sender === "user" ? "right" : "left"}-4 duration-500`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${message.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-md shadow-purple-200" /* Changed from-teal-500 to from-purple-500, to-teal-600 to to-purple-600, and shadow-blue-200 to shadow-purple-200 */
                    : "bg-white text-gray-800 rounded-bl-md shadow-gray-200 border border-gray-100"
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === "bot" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center"> {/* Changed from-teal-500 to from-purple-500 and to-teal-600 to to-purple-600 */}
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.sender === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-left-4 duration-300">
                <div className="bg-white text-gray-800 p-4 rounded-2xl rounded-bl-md max-w-[85%] shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center"> {/* Changed from-teal-500 to from-purple-500 and to-teal-600 to to-purple-600 */}
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Đang soạn tin</span>
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-bounce" /* Changed from-teal-400 to from-purple-400 and to-teal-500 to to-purple-500 */
                            style={{ animationDelay: `${i * 0.2}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Enhanced Input Section */}
          <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-b-2xl">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn của bạn..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white shadow-inner" /* Changed focus:ring-teal-500 to focus:ring-purple-500 */
                />
                {inputMessage && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Zap size={16} className="text-purple-500 animate-pulse" /> {/* Changed text-teal-500 to text-purple-500 */}
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl px-4 py-3 transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg" /* Changed from-teal-500 to from-purple-500, to-teal-600 to to-purple-600, etc. */
              >
                <Send size={18} />
              </button>
            </div>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">

            </div>
          </div>
        </div>
      )}
    </>
  )
}
