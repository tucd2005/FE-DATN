"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, FileText, Paperclip, AlertCircle, LogIn, Settings } from "lucide-react"
import { useClientMessages, useSendClientMessage } from "../../../../hooks/useClientChat"
import { useAuth } from "../../../../hooks/useAuth"
import type { ClientMessage } from "../../../../types/clientMessage.type"

interface ApiError {
  response?: {
    status?: number;
    data?: any;
  };
}

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
  const [isDemoMode, setIsDemoMode] = useState(false)
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auth hook
  const { isLoggedIn } = useAuth()

  // API hooks - chỉ chạy khi đã đăng nhập và không ở demo mode
  const { data: realMessages, isLoading: isLoadingMessages, error: apiError } = useClientMessages()
  const { mutate: sendMessage, isPending: isSending } = useSendClientMessage()

  // Kiểm tra authentication
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    setIsAuthenticated(!!token && isLoggedIn)
  }, [isLoggedIn])

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
    if (apiError && !isDemoMode) {
      if ((apiError as any)?.response?.status === 401) {
        setError("Vui lòng đăng nhập để sử dụng tính năng chat.")
      } else {
        setError("Không thể kết nối với máy chủ. Vui lòng thử lại sau.")
      }
    } else {
      setError(null)
    }
  }, [apiError, isDemoMode])

  // Sync real messages from API
  useEffect(() => {
    if (realMessages && realMessages.length > 0 && isAuthenticated && !isDemoMode) {
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
  }, [realMessages, isAuthenticated, isDemoMode])

  // Demo mode responses
  const getDemoResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("giá") || lowerMessage.includes("bao nhiêu")) {
      return "Cảm ơn bạn đã quan tâm! Giá sản phẩm của chúng tôi rất cạnh tranh và phù hợp với chất lượng. Bạn có thể xem chi tiết giá tại trang sản phẩm hoặc liên hệ trực tiếp với chúng tôi để được tư vấn cụ thể. 💰"
    }

    if (lowerMessage.includes("giao") || lowerMessage.includes("ship")) {
      return "Chúng tôi cung cấp dịch vụ giao hàng nhanh chóng và an toàn! 🚚\n\n- Giao hàng trong nội thành: 2-3 ngày\n- Giao hàng tỉnh: 3-5 ngày\n- Miễn phí ship cho đơn hàng từ 500k\n- Hỗ trợ thanh toán khi nhận hàng"
    }

    if (lowerMessage.includes("bảo hành") || lowerMessage.includes("warranty")) {
      return "Tất cả sản phẩm của chúng tôi đều có chế độ bảo hành chính hãng! 🛡️\n\n- Bảo hành 12 tháng cho tất cả sản phẩm\n- Bảo hành 24 tháng cho giày thể thao cao cấp\n- Hỗ trợ đổi trả trong 30 ngày\n- Dịch vụ bảo hành tận nơi"
    }

    if (lowerMessage.includes("size") || lowerMessage.includes("kích thước")) {
      return "Chúng tôi có đầy đủ các size từ 35-45 cho giày nam và 34-42 cho giày nữ! 👟\n\nBạn có thể:\n- Xem bảng size tại trang sản phẩm\n- Chat với chúng tôi để được tư vấn size phù hợp\n- Đến cửa hàng để thử trực tiếp"
    }

    if (lowerMessage.includes("cảm ơn") || lowerMessage.includes("thanks")) {
      return "Rất vui được phục vụ bạn! 😊 Nếu bạn cần thêm thông tin gì, đừng ngại hỏi nhé!"
    }

    return "Cảm ơn bạn đã liên hệ! Tôi có thể giúp bạn với:\n\n💰 Thông tin giá cả\n🚚 Dịch vụ giao hàng\n🛡️ Chế độ bảo hành\n👟 Tư vấn size giày\n\nBạn quan tâm đến vấn đề gì?"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return

    // Demo mode
    if (isDemoMode) {
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

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getDemoResponse(inputMessage),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      }, 1000)

      return
    }

    // Real mode - Kiểm tra authentication
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để gửi tin nhắn.")
      return
    }

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
      onError: (error: any) => {
        setIsTyping(false)
        if (error?.response?.status === 401) {
          setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.")
        } else {
          setError("Không thể gửi tin nhắn. Vui lòng thử lại.")
        }
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

  const handleLoginClick = () => {
    window.location.href = "/login"
  }

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode)
    setError(null)
    if (!isDemoMode) {
      // Reset messages when entering demo mode
      setMessages([
        {
          id: "1",
          text: "Xin chào! Tôi là trợ lý ảo của cửa hàng. Bạn đang ở chế độ demo. Tôi có thể giúp gì cho bạn? ✨",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
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
                  <span>
                    {isDemoMode ? "Demo Mode" : isAuthenticated ? "Đang hoạt động" : "Chưa đăng nhập"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 relative z-10">
              {/* Demo Mode Toggle */}
              <button
                onClick={toggleDemoMode}
                className={`p-2 rounded-full transition-all duration-300 ${isDemoMode
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-white/20 hover:bg-white/30"
                  }`}
                title={isDemoMode ? "Tắt Demo Mode" : "Bật Demo Mode"}
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-300 transform hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Demo Mode Indicator */}
          {isDemoMode && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-4 mt-2 rounded">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-700">Đang ở chế độ Demo - Không cần đăng nhập</p>
              </div>
            </div>
          )}

          {/* Authentication Status */}
          {!isAuthenticated && !isDemoMode && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-4 mt-2 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                  <p className="text-sm text-yellow-700">Vui lòng đăng nhập để chat</p>
                </div>
                <button
                  onClick={handleLoginClick}
                  className="flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors"
                >
                  <LogIn size={12} />
                  <span>Đăng nhập</span>
                </button>
              </div>
            </div>
          )}

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
            {isLoadingMessages && isAuthenticated && !isDemoMode && (
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
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      {message.attachment && (
                        isImageFile(message.attachment) ? (
                          <img
                            src={`http://localhost:8000/storage/${message.attachment}`}
                            alt="Ảnh đính kèm"
                            className="rounded mt-2 max-w-xs max-h-40 object-cover border"
                          />
                        ) : (
                          <a
                            href={`http://localhost:8000/storage/${message.attachment}`}
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
                  placeholder={
                    isDemoMode
                      ? "Nhập tin nhắn để test demo..."
                      : isAuthenticated
                        ? "Nhập tin nhắn của bạn..."
                        : "Vui lòng đăng nhập để chat..."
                  }
                  disabled={!isAuthenticated && !isDemoMode}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {inputMessage && (isAuthenticated || isDemoMode) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Zap size={16} className="text-teal-500 animate-pulse" />
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className={`relative cursor-pointer ${(!isAuthenticated && !isDemoMode) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={!isAuthenticated && !isDemoMode}
                  />
                  <div className={`w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors ${(!isAuthenticated && !isDemoMode) ? 'cursor-not-allowed' : ''}`}>
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </div>
                </label>
                <button
                  onClick={handleSendMessage}
                  disabled={isSending || (!inputMessage.trim() && !selectedFile) || (!isAuthenticated && !isDemoMode)}
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
                  disabled={!isAuthenticated && !isDemoMode}
                  className="text-xs bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 px-3 py-1 rounded-full hover:from-teal-200 hover:to-teal-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
