"use client"

import React, { useState } from "react"
import { Button, Input, Card, Alert, Typography, Space, List } from "antd"
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { useChangePassword } from "../../../../hooks/useChangePassword"

const { Title, Text } = Typography

export default function ChangePassword({ onSuccess, onCancel }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordErrors, setPasswordErrors] = useState([])
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const { mutateAsync } = useChangePassword()

  const validatePassword = (password) => {
    const errors = []
    if (password.length < 8) {
      errors.push("Mật khẩu phải có ít nhất 8 ký tự")
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ thường")
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ hoa")
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 số")
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 ký tự đặc biệt")
    }
    return errors
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPasswordErrors([])
    setPasswordSuccess(false)

    const errors = []

    if (!passwordData.currentPassword) {
      errors.push("Vui lòng nhập mật khẩu hiện tại")
    }

    if (!passwordData.newPassword) {
      errors.push("Vui lòng nhập mật khẩu mới")
    } else {
      errors.push(...validatePassword(passwordData.newPassword))
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.push("Mật khẩu xác nhận không khớp")
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.push("Mật khẩu mới phải khác mật khẩu hiện tại")
    }

    if (errors.length > 0) {
      setPasswordErrors(errors)
      return
    }

    setIsChangingPassword(true)

    try {
      await mutateAsync({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        new_password_confirmation: passwordData.confirmPassword,
      })

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setPasswordSuccess(true)
      onSuccess?.()

      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (error) {
      setPasswordErrors(["Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại."])
    } finally {
      setIsChangingPassword(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", overflow: "hidden" }}>
      <div style={{ background: "linear-gradient(to right, #14b8a6, #10b981)", padding: "24px 32px" }}>
        <Space align="center">
          <div style={{ width: 12, height: 12, background: "rgba(255,255,255,0.3)", borderRadius: "50%" }}></div>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>Đổi mật khẩu</Title>
        </Space>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(to right, #eff6ff, #e0e7ff)", border: "1px solid #bfdbfe", borderRadius: 8, padding: 24, marginBottom: 32 }}>
            <Space align="start">
              <div style={{ width: 40, height: 40, background: "#dbeafe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LockOutlined style={{ fontSize: 20, color: "#2563eb" }} />
              </div>
              <div>
                <Title level={4} style={{ color: "#1e3a8a", marginBottom: 8 }}>Bảo mật tài khoản</Title>
                <Text style={{ color: "#1e40af" }}>
                  Để đảm bảo an toàn cho tài khoản của bạn, vui lòng tạo mật khẩu mạnh với ít nhất 8 ký tự, bao
                  gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                </Text>
              </div>
            </Space>
          </div>

          {passwordSuccess && (
            <Alert
              message="Mật khẩu đã được thay đổi thành công!"
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
              style={{ marginBottom: 24 }}
            />
          )}

          {passwordErrors.length > 0 && (
            <Alert
              message={<List dataSource={passwordErrors} renderItem={(item) => <List.Item>{item}</List.Item>} />}
              type="error"
              showIcon
              icon={<ExclamationCircleOutlined />}
              style={{ marginBottom: 24 }}
            />
          )}

          <Card title={<Title level={4} style={{ margin: 0 }}>Thay đổi mật khẩu</Title>}>
            <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>Mật khẩu hiện tại *</Text>
                <Input.Password
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Nhập mật khẩu hiện tại"
                  visibilityToggle={{
                    visible: showPasswords.current,
                    onVisibleChange: () => togglePasswordVisibility("current"),
                  }}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
              </div>

              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>Mật khẩu mới *</Text>
                <Input.Password
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Nhập mật khẩu mới"
                  visibilityToggle={{
                    visible: showPasswords.new,
                    onVisibleChange: () => togglePasswordVisibility("new"),
                  }}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
              </div>

              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>Xác nhận mật khẩu mới *</Text>
                <Input.Password
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Nhập lại mật khẩu mới"
                  visibilityToggle={{
                    visible: showPasswords.confirm,
                    onVisibleChange: () => togglePasswordVisibility("confirm"),
                  }}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <Text type="danger" style={{ fontSize: 12, marginTop: 8, display: "block" }}>
                    Mật khẩu xác nhận không khớp
                  </Text>
                )}
              </div>

              <Space style={{ justifyContent: "flex-end", marginTop: 24 }}>
                <Button
                  onClick={() => {
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                    setPasswordErrors([])
                    setPasswordSuccess(false)
                    onCancel?.()
                  }}
                  disabled={isChangingPassword}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isChangingPassword}
                  icon={isChangingPassword ? null : <LockOutlined />}
                  style={{ background: "linear-gradient(to right, #14b8a6, #10b981)", border: "none" }}
                >
                  {isChangingPassword ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>
              </Space>
            </form>
          </Card>

          <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 24, marginTop: 32 }}>
            <Title level={5} style={{ marginBottom: 16 }}>Mẹo bảo mật:</Title>
            <List
              dataSource={[
                "Không chia sẻ mật khẩu với bất kỳ ai",
                "Sử dụng mật khẩu khác nhau cho các tài khoản khác nhau",
                "Thay đổi mật khẩu định kỳ để đảm bảo an toàn",
                "Đăng xuất khỏi tài khoản khi sử dụng máy tính công cộng",
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <div style={{ width: 6, height: 6, background: "#14b8a6", borderRadius: "50%", marginTop: 8 }} />
                    <Text>{item}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
