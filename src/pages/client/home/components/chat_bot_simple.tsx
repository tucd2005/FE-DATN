"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, FileText, Paperclip, AlertCircle, LogIn, Settings } from "lucide-react"

interface Message {
    id: string
    text: string
    sender: "user" | "bot"
    timestamp: Date
}

export default function ChatBotSimple() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDemoMode, setIsDemoMode] = useState(true) // Mặc định bật demo mode
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Xin chào! Tôi là trợ lý ảo của cửa hàng. Bạn đang ở chế độ demo. Tôi có thể giúp gì cho bạn? ✨",
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

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen) {
            setShowSparkles(true)
            setTimeout(() => setShowSparkles(false), 2000)
        }
    }, [isOpen])

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
        if (!inputMessage.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputMessage("")
        setIsTyping(true)

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
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <>
            {/* Floating Chat Button */}
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

            {/* Chat Modal */}
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

                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
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
                                    <span>Demo Mode</span>
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

                    {/* Demo Mode Indicator */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-4 mt-2 rounded">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                            <p className="text-sm text-yellow-700">Đang ở chế độ Demo - Không cần đăng nhập</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
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

                        {/* Typing Indicator */}
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

                    {/* Input Section */}
                    <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-b-2xl">
                        <div className="flex space-x-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập tin nhắn để test demo..."
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white shadow-inner"
                                />
                                {inputMessage && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <Zap size={16} className="text-teal-500 animate-pulse" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={isTyping || !inputMessage.trim()}
                                className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
                            >
                                {isTyping ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                    <Send size={18} />
                                )}
                            </button>
                        </div>

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