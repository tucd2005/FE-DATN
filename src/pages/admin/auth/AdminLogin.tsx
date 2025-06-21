
import { useState } from "react"
import { Form, Input, Button, Checkbox, Alert, Card, Typography, Divider } from "antd"
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"

const { Title, Text } = Typography

interface LoginFormValues {
  username: string
  password: string
}

export default function AdminLogin() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation - replace with actual authentication logic
      if (values.username === "admin" && values.password === "admin123") {
        console.log("Login successful:", values)
        // Redirect to admin dashboard
        alert("Đăng nhập thành công!")
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác")
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className=" relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white opacity-10 rotate-45 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-blue-300 opacity-20 rotate-12 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300 opacity-15 rotate-45 animate-float animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-pink-300 opacity-10 rotate-12 animate-float animation-delay-3000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl animate-pulse-slow">
              <UserOutlined className="text-3xl text-white" />
            </div>
            <Title level={2} className="!mb-2 !text-white drop-shadow-lg">
              Đăng nhập Admin
            </Title>
            <Text className="text-blue-100 drop-shadow">Vui lòng đăng nhập để truy cập hệ thống quản trị</Text>
          </div>

          {/* Login Card */}
          <Card
            className="shadow-2xl border-0 rounded-3xl backdrop-blur-sm bg-white/95 hover:bg-white/98 transition-all duration-300"
            bodyStyle={{ padding: "2.5rem" }}
          >
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-6 rounded-xl border-0 shadow-lg"
                closable
                onClose={() => setError(null)}
              />
            )}

            <Form
              form={form}
              name="admin-login"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              size="large"
              className="space-y-4"
            >
              <Form.Item
                name="username"
                label={<span className="text-gray-700 font-semibold">Tên đăng nhập</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                  { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Nhập tên đăng nhập"
                  className="rounded-xl h-14 border-gray-200 hover:border-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-gray-700 font-semibold">Mật khẩu</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Nhập mật khẩu"
                  className="rounded-xl h-14 border-gray-200 hover:border-blue-400 focus:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-6">
              
                <Button
                  type="link"
                  className="!p-0 !h-auto text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => alert("Chức năng quên mật khẩu sẽ được triển khai sau")}
                >
                  Quên mật khẩu?
                </Button>
              </div>

              <Form.Item className="!mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </Form.Item>
            </Form>
         
          </Card>

          {/* Footer */}
          
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  )
}
