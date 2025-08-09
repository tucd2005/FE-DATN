import { useState, useEffect } from "react"
import { Modal, Form, Input, Button, message, Alert, InputNumber } from "antd"
import { useWalletDeposit } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

interface DepositModalProps {
    visible: boolean
    onCancel: () => void
    onSuccess: () => void
}

export default function DepositModal({ visible, onCancel, onSuccess }: DepositModalProps) {
    const [form] = Form.useForm()
    const { mutate: deposit, isPending } = useWalletDeposit()
    const [amount, setAmount] = useState<number>(10000)

    // Reset form when modal opens/closes
    useEffect(() => {
        if (visible) {
            form.setFieldsValue({ amount: 10000 })
            setAmount(10000)
        }
    }, [visible, form])

    const handleSubmit = (values: { amount: number }) => {
        if (!values.amount || values.amount < 10000) {
            message.error("Số tiền tối thiểu là 10,000 VNĐ")
            return
        }
        if (values.amount > 500000000) {
            message.error("Số tiền tối đa là 500,000,000 VNĐ")
            return
        }

        deposit(values, {
            onSuccess: () => {
                form.resetFields()
                setAmount(10000)
                onSuccess()
            }
        })
    }

    const handleCancel = () => {
        form.resetFields()
        setAmount(10000)
        onCancel()
    }

    const handleAmountChange = (value: number | null) => {
        const newAmount = value || 0
        setAmount(newAmount)
    }

    // Quick amount buttons
    const quickAmounts = [50000, 100000, 200000, 500000, 1000000]

    return (
        <Modal
            title={
                <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">Nạp tiền vào ví</div>
                    <div className="text-sm text-gray-500 mt-1">Chọn số tiền bạn muốn nạp</div>
                </div>
            }
            open={visible}
            onCancel={handleCancel}
            footer={null}
            width={600}
            centered
            className="deposit-modal"
        >
            <div className="space-y-6">
                <Alert
                    message="Thông tin nạp tiền"
                    description={
                        <div className="mt-2 space-y-1 text-sm">
                            <p>• Số tiền tối thiểu: 10,000 VNĐ</p>
                            <p>• Số tiền tối đa: 500,000,000 VNĐ</p>
                            <p>• Giao dịch sẽ hết hạn sau 15 phút</p>
                            <p>• Thanh toán qua VNPay</p>
                        </div>
                    }
                    type="info"
                    showIcon
                    className="border-blue-200 bg-blue-50"
                />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ amount: 10000 }}
                >
                    <Form.Item
                        label="Số tiền nạp (VNĐ)"
                        name="amount"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tiền" },
                            { type: "number", min: 10000, message: "Số tiền tối thiểu là 10,000 VNĐ" },
                            { type: "number", max: 500000000, message: "Số tiền tối đa là 500,000,000 VNĐ" }
                        ]}
                    >
                        <InputNumber
                            placeholder="Nhập số tiền cần nạp"
                            onChange={handleAmountChange}
                            className="w-full text-lg"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            min={10000}
                            max={500000000}
                            step={1000}
                            size="large"
                            style={{ height: '48px' }}
                        />
                    </Form.Item>

                    {/* Quick amount buttons */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Chọn nhanh:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {quickAmounts.map((quickAmount) => (
                                <Button
                                    key={quickAmount}
                                    type={amount === quickAmount ? "primary" : "default"}
                                    onClick={() => {
                                        form.setFieldsValue({ amount: quickAmount })
                                        setAmount(quickAmount)
                                    }}
                                    className={`h-10 ${
                                        amount === quickAmount 
                                            ? "bg-teal-500 border-teal-500 text-white" 
                                            : "border-gray-300 hover:border-teal-300"
                                    }`}
                                >
                                    {formatCurrency(quickAmount)}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Amount preview */}
                    {amount > 0 && (
                        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-200">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-teal-600 mb-2">
                                    {formatCurrency(amount)}
                                </div>
                                <div className="text-sm text-teal-600 font-medium">
                                    Số tiền sẽ được nạp vào ví
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Sau khi thanh toán thành công
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-4">
                        <Button
                            type="default"
                            onClick={handleCancel}
                            className="flex-1 h-12 text-base"
                            size="large"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            disabled={amount < 10000 || amount > 500000000}
                            className="flex-1 h-12 text-base bg-teal-500 hover:bg-teal-600 border-teal-500"
                            size="large"
                        >
                            {isPending ? "Đang xử lý..." : "Nạp tiền ngay"}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
} 