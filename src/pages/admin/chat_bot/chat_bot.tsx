"use client"

import type React from "react"
import { useState, useMemo, useEffect, useRef } from "react"
import { FileText, Send, User, Paperclip } from "lucide-react"
import { useMessagesWithUser, useSendMessage, useUserList, useAllMessages } from "../../../hooks/useChat"
import type { User as ChatUser, Message as ChatMessage } from "../../../types/message.type"

const MessagePage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const { data: users, isLoading: isLoadingUsers } = useUserList()
  const { data: messages, isLoading: isLoadingMessages } = useMessagesWithUser(selectedUserId || 0)
  const { data: allMessages, isLoading: isLoadingAllMessages } = useAllMessages()
  const { mutate: sendMessage, isPending: isSending } = useSendMessage()

  const [messageContent, setMessageContent] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll xuống cuối khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Scroll xuống cuối khi chọn user mới hoặc khi có tin nhắn mới
    if (messages && messages.length > 0) {
      // Delay một chút để đảm bảo DOM đã render
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [messages, selectedUserId])

  // Scroll xuống cuối khi component mount lần đầu hoặc khi loading hoàn tất
  useEffect(() => {
    if (messages && messages.length > 0 && !isLoadingMessages) {
      // Delay lâu hơn để đảm bảo tất cả DOM đã render hoàn toàn
      setTimeout(() => {
        scrollToBottom()
      }, 300)
    }
  }, [messages, isLoadingMessages])

  // Scroll xuống cuối khi có tin nhắn và không đang loading
  useEffect(() => {
    if (messages && messages.length > 0 && !isLoadingMessages && selectedUserId) {
      // Force scroll xuống cuối sau khi tất cả đã load xong
      setTimeout(() => {
        scrollToBottom()
      }, 500)
    }
  }, [messages, isLoadingMessages, selectedUserId])

  // Tự động chọn user đầu tiên khi tải lại trang
  useEffect(() => {
    if (users && users.length > 0 && !selectedUserId && !isLoadingUsers) {
      // Delay một chút để đảm bảo component đã mount hoàn toàn
      setTimeout(() => {
        setSelectedUserId(users[0].id)
      }, 100)
    }
  }, [users, selectedUserId, isLoadingUsers])

  // Tự động chọn user đầu tiên khi allMessages có sẵn
  useEffect(() => {
    if (users && users.length > 0 && allMessages && !selectedUserId && !isLoadingUsers && !isLoadingAllMessages) {
      setSelectedUserId(users[0].id)
    }
  }, [users, allMessages, selectedUserId, isLoadingUsers, isLoadingAllMessages])

  // Scroll xuống cuối ngay khi user được chọn
  useEffect(() => {
    if (selectedUserId && messages && messages.length > 0) {
      // Delay để đảm bảo tin nhắn đã render
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [selectedUserId])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUserId || (!messageContent.trim() && !selectedFile)) return

    const formData = new FormData()
    formData.append("nguoi_nhan_id", selectedUserId.toString())
    if (messageContent.trim()) formData.append("noi_dung", messageContent)
    if (selectedFile) formData.append("tep_dinh_kem", selectedFile)

    sendMessage(formData, {
      onSuccess: () => {
        setMessageContent("")
        setSelectedFile(null)
        // Scroll xuống cuối khi gửi tin nhắn mới
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      },
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectedFile(file || null)
  }

  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename)
  }

  const getSelectedUser = () => users?.find((user) => user.id === selectedUserId)

  const sortedUsers = useMemo(() => {
    if (!users || !allMessages) return []
    
    return users
      .map((user: ChatUser) => {
        // Tìm tin nhắn cuối cùng liên quan đến user này
        const userMessages = allMessages.filter(
          (msg: ChatMessage) => msg.nguoi_gui_id === user.id || msg.nguoi_nhan_id === user.id
        )
        
        const lastMessage = userMessages.sort(
          (a: ChatMessage, b: ChatMessage) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]

        return {
          ...user,
          lastMessageTime: lastMessage ? new Date(lastMessage.created_at).getTime() : 0,
          lastMessage: lastMessage?.noi_dung || "Chưa có tin nhắn",
          lastMessageDate: lastMessage ? new Date(lastMessage.created_at) : null,
        }
      })
      .sort((a, b) => {
        // Sắp xếp theo thời gian tin nhắn gần nhất (mới nhất lên đầu)
        if (a.lastMessageTime === 0 && b.lastMessageTime === 0) return 0
        if (a.lastMessageTime === 0) return 1
        if (b.lastMessageTime === 0) return -1
        return b.lastMessageTime - a.lastMessageTime
      })
  }, [users, allMessages])

  return (
    <div className="flex h-[650px] bg-gray-50 overflow-hidden">
      {/* Sidebar User List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Tin nhắn</h2>
          <p className="text-sm text-gray-500 mt-1">Chọn người dùng để trò chuyện</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoadingUsers || isLoadingAllMessages ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="p-2">
              {sortedUsers?.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                    selectedUserId === user.id ? "bg-blue-50 border-l-4 border-blue-500 shadow-sm" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      selectedUserId === user.id ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`font-medium ${selectedUserId === user.id ? "text-blue-900" : "text-gray-900"}`}>
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-[180px]">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedUserId ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {getSelectedUser()?.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900">{getSelectedUser()?.name}</h3>
                <p className="text-sm text-gray-500">Đang hoạt động</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50" ref={messagesContainerRef}>
              {isLoadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                messages?.map((msg: ChatMessage) => {
                  const isAdminMessage = msg.nguoi_gui_id !== selectedUserId

                  return (
                    <div
                      key={msg.id}
                      className={`flex space-x-3 ${isAdminMessage ? "justify-end" : "justify-start"}`}
                    >
                      {!isAdminMessage && (
                        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-semibold">
                          {msg.nguoi_gui_name?.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className={`max-w-[70%] ${isAdminMessage ? "text-right" : "text-left"}`}>
                        <div className="flex items-center space-x-2 mb-1">
                          {!isAdminMessage && (
                            <span className="font-medium text-gray-900">{msg.nguoi_gui_name}</span>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>

                        <div
                          className={`rounded-lg p-3 shadow-sm border ${
                            isAdminMessage ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"
                          }`}
                        >
                          {msg.noi_dung && <p className="text-gray-800 mb-2">{msg.noi_dung}</p>}
                          {msg.tep_dinh_kem && (
                            isImageFile(msg.tep_dinh_kem) ? (
                              <img
                                src={`http://localhost:8000/storage/${msg.tep_dinh_kem}`}
                                alt="Ảnh đính kèm"
                                className="rounded mt-2 max-w-xs max-h-60 object-cover border"
                              />
                            ) : (
                              <a
                                href={`http://localhost:8000/storage/${msg.tep_dinh_kem}`}
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
                      </div>

                      {isAdminMessage && (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                          {msg.nguoi_gui_name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-3">
              <form onSubmit={handleSend} className="space-y-3">
                <div className="flex space-x-3">
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    rows={2}
                    className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="relative cursor-pointer">
                      <input type="file" onChange={handleFileChange} className="hidden" />
                      <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                      </div>
                    </label>
                    <button
                      type="submit"
                      disabled={isSending || (!messageContent.trim() && !selectedFile)}
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
                    >
                      {isSending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {selectedFile && (
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
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
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn một cuộc trò chuyện</h3>
              <p className="text-gray-500">Chọn người dùng từ danh sách bên trái để bắt đầu trò chuyện</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagePage
