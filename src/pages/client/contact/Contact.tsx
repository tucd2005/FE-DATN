
import { useState } from "react"
import { Card, Form, Input, Button, Radio, Select, Divider, Typography, Steps } from "antd"
import { CreditCardOutlined, SafetyOutlined, CheckCircleOutlined } from "@ant-design/icons"
// import AppLayout from "../../components/layout"

const { Title, Text } = Typography
const { Option } = Select

export default function PaymentPage() {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const onFinish = (values: any) => {
    console.log("Payment form submitted:", values)
    setCurrentStep(2)
  }

  const steps = [
    {
      title: "Payment Method",
      icon: <CreditCardOutlined />,
    },
    {
      title: "Payment Details",
      icon: <SafetyOutlined />,
    },
    {
      title: "Confirmation",
      icon: <CheckCircleOutlined />,
    },
  ]

  return (
    // <AppLayout currentPage="payment">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Title level={1} className="text-orange-500 mb-4">
            Secure Payment
          </Title>
          <Text className="text-lg text-gray-600">
            Complete your payment securely. Your information is protected with industry-standard encryption.
          </Text>
        </div>

        <Steps current={currentStep} items={steps} className="mb-8" />

        {currentStep < 2 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ paymentMethod: "card" }}>
                  <Title level={3} className="text-orange-500 mb-6">
                    Payment Method
                  </Title>

                  <Form.Item name="paymentMethod">
                    <Radio.Group
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full"
                    >
                      <div className="space-y-4">
                        <Radio.Button value="card" className="w-full h-auto p-4 text-left">
                          <div className="flex items-center">
                            <CreditCardOutlined className="text-xl mr-3" />
                            <div>
                              <div className="font-semibold">Credit/Debit Card</div>
                              <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                            </div>
                          </div>
                        </Radio.Button>

                        <Radio.Button value="paypal" className="w-full h-auto p-4 text-left">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                            <div>
                              <div className="font-semibold">PayPal</div>
                              <div className="text-sm text-gray-500">Pay with your PayPal account</div>
                            </div>
                          </div>
                        </Radio.Button>
                      </div>
                    </Radio.Group>
                  </Form.Item>

                  {paymentMethod === "card" && (
                    <>
                      <Divider />
                      <Title level={4} className="mb-4">
                        Card Information
                      </Title>

                      <Form.Item
                        name="cardNumber"
                        label="Card Number"
                        rules={[{ required: true, message: "Please enter card number" }]}
                      >
                        <Input size="large" placeholder="1234 5678 9012 3456" prefix={<CreditCardOutlined />} />
                      </Form.Item>

                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                          name="expiryDate"
                          label="Expiry Date"
                          rules={[{ required: true, message: "Required" }]}
                        >
                          <Input size="large" placeholder="MM/YY" />
                        </Form.Item>

                        <Form.Item name="cvv" label="CVV" rules={[{ required: true, message: "Required" }]}>
                          <Input size="large" placeholder="123" />
                        </Form.Item>
                      </div>

                      <Form.Item
                        name="cardholderName"
                        label="Cardholder Name"
                        rules={[{ required: true, message: "Please enter cardholder name" }]}
                      >
                        <Input size="large" placeholder="John Doe" />
                      </Form.Item>
                    </>
                  )}

                  <Divider />
                  <Title level={4} className="mb-4">
                    Billing Address
                  </Title>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Invalid email" },
                    ]}
                  >
                    <Input size="large" placeholder="your.email@example.com" />
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[{ required: true, message: "Please select country" }]}
                    >
                      <Select size="large" placeholder="Select country">
                        <Option value="US">United States</Option>
                        <Option value="VN">Vietnam</Option>
                        <Option value="UK">United Kingdom</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="zipCode"
                      label="ZIP Code"
                      rules={[{ required: true, message: "Please enter ZIP code" }]}
                    >
                      <Input size="large" placeholder="12345" />
                    </Form.Item>
                  </div>

                  <Form.Item className="mt-8">
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="w-full bg-orange-500 border-orange-500 hover:bg-orange-600"
                    >
                      Complete Payment
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>

            <div>
              <Card>
                <Title level={4} className="mb-4">
                  Order Summary
                </Title>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text>Premium Plan</Text>
                    <Text>$29.99</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Tax</Text>
                    <Text>$2.40</Text>
                  </div>
                  <Divider className="my-3" />
                  <div className="flex justify-between font-semibold text-lg">
                    <Text strong>Total</Text>
                    <Text strong className="text-orange-500">
                      $32.39
                    </Text>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <SafetyOutlined className="mr-2" />
                    <Text className="text-sm">Your payment is secured with 256-bit SSL encryption</Text>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
              <Title level={2} className="text-green-500 mb-4">
                Payment Successful!
              </Title>
              <Text className="text-gray-600 mb-6 block">
                Thank you for your payment. Your transaction has been completed successfully.
              </Text>
              <Button
                type="primary"
                size="large"
                className="bg-orange-500 border-orange-500"
                onClick={() => setCurrentStep(0)}
              >
                Continue
              </Button>
            </Card>
          </div>
        )}
      </div>
  )
}
