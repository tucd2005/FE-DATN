"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, FileText, Paperclip, AlertCircle } from "lucide-react"
import { useClientMessages, useSendClientMessage } from "../../../../hooks/useClientChat"
import type { ClientMessage } from "../../../../types/clientMessage.type"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isRealMessage?: boolean
  attachment?: string
}

export default function ChatBot() {
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // API hooks
  const { data: realMessages, isLoading: isLoadingMessages, error: apiError } = useClientMessages()
  const { mutate: sendMessage, isPending: isSending } = useSendClientMessage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 2000)
    }
  }, [isOpen])

  // Handle API errors
  useEffect(() => {
    if (apiError) {
      setError("Không thể kết nối với máy chủ. Vui lòng thử lại sau.")
    } else {
      setError(null)
    }
  }, [apiError])

  // Sync real messages from API
  useEffect(() => {
    if (realMessages && realMessages.length > 0) {
      const apiMessages: Message[] = realMessages.map((msg: ClientMessage) => ({
        id: msg.id.toString(),
        text: msg.noi_dung,
        sender: msg.nguoi_gui.name === "Chat Support" ? "bot" : "user",
        timestamp: new Date(msg.created_at),
        isRealMessage: true,
        attachment: msg.tep_dinh_kem,
      }))

      // Merge with existing messages, avoiding duplicates
      setMessages(prev => {
        const existingIds = new Set(prev.map(m => m.id))
        const newMessages = apiMessages.filter(msg => !existingIds.has(msg.id))
        return [...prev, ...newMessages]
      })
    }
  }, [realMessages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)
    setError(null)

    // Send to API
    const formData = new FormData()
    if (inputMessage.trim()) formData.append("noi_dung", inputMessage)
    if (selectedFile) formData.append("tep_dinh_kem", selectedFile)

    sendMessage(formData, {
      onSuccess: () => {
        setIsTyping(false)
        setSelectedFile(null)
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      },
      onError: (error) => {
        setIsTyping(false)
        setError("Không thể gửi tin nhắn. Vui lòng thử lại.")
        // Remove the message if sending failed
        setMessages((prev) => prev.filter(msg => msg.id !== userMessage.id))
        console.error("Send message error:", error)
      }
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectedFile(file || null)
  }

  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename)
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
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse rings */}
          <div
            className={`absolute inset-0 rounded-full bg-teal-400 animate-ping ${isOpen ? "opacity-0" : "opacity-75"}`}
          ></div>
          <div
            className={`absolute inset-0 rounded-full bg-teal-400 animate-pulse ${isOpen ? "opacity-0" : "opacity-50"}`}
          ></div>

          <button
            onClick={() => setIsOpen(true)}
            className={`relative bg-teal-500 hover:bg-teal-600 text-white rounded-full p-4 shadow-2xl transition-all duration-500 transform hover:scale-110 ${isOpen ? "scale-0 rotate-180" : "scale-100 rotate-0"
              }`}
          >
            <MessageCircle size={28} className="drop-shadow-lg" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Chat Modal with Enhanced Effects */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transform animate-in slide-in-from-bottom-4 duration-500">
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
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-500/20 animate-pulse"></div>

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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-3 mx-4 mt-2 rounded">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Messages with Enhanced Styling */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {isLoadingMessages && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-${message.sender === "user" ? "right" : "left"}-4 duration-500`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${message.sender === "user"
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-md shadow-blue-200"
                    : "bg-white text-gray-800 rounded-bl-md shadow-gray-200 border border-gray-100"
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === "bot" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.attachment && (
                        isImageFile(message.attachment) ? (
                          <img
                            src={message.attachment}
                            alt="Ảnh đính kèm"
                            className="rounded mt-2 max-w-xs max-h-40 object-cover border"
                          />
                        ) : (
                          <a
                            href={message.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mt-2"
                          >
                            <FileText className="w-4 h-4" />
                            <span className="text-sm underline">Xem tệp đính kèm</span>
                          </a>
                        )
                      )}
                    </div>
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
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Đang soạn tin</span>
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full animate-bounce"
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white shadow-inner"
                />
                {inputMessage && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Zap size={16} className="text-teal-500 animate-pulse" />
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="relative cursor-pointer">
                  <input type="file" onChange={handleFileChange} className="hidden" />
                  <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </div>
                </label>
                <button
                  onClick={handleSendMessage}
                  disabled={isSending || (!inputMessage.trim() && !selectedFile)}
                  className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
                >
                  {isSending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* File preview */}
            {selectedFile && (
              <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg mt-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="ml-auto text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {["💰 Giá cả", "🚚 Giao hàng", "🛡️ Bảo hành"].map((action) => (
                <button
                  key={action}
                  onClick={() => setInputMessage(action.split(" ")[1])}
                  className="text-xs bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 px-3 py-1 rounded-full hover:from-teal-200 hover:to-teal-300 transition-all duration-300 transform hover:scale-105"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
