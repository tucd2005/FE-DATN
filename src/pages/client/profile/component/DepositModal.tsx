import { Modal, Form, Input, Button, message } from "antd"
import { useWalletDeposit } from "../../../../hooks/useWalletClient"

interface DepositModalProps {
    visible: boolean
    onCancel: () => void
    onSuccess?: () => void
}

export default function DepositModal({ visible, onCancel, onSuccess }: DepositModalProps) {
    const [form] = Form.useForm()
    const depositMutation = useWalletDeposit()

    const handleDeposit = async (values: { amount: string | number }) => {
        try {
            const amount = Number(values.amount)
            const result = await depositMutation.mutateAsync({ amount })
            if (result?.data?.payment_url) {
                window.open(result.data.payment_url, '_blank')
                message.success('Đã tạo giao dịch nạp tiền thành công!')
                onSuccess?.()
            }
            onCancel()
            form.resetFields()
        } catch (error: unknown) {
            console.error('Deposit error:', error)
            const errorMessage = error && typeof error === 'object' && 'response' in error
                ? (error.response as any)?.data?.message
                : 'Có lỗi xảy ra khi nạp tiền!'
            message.error(errorMessage)
        }
    }

    return (
        <Modal
            title="Nạp tiền vào ví"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={500}
        >
            <Form
                form={form}
                onFinish={handleDeposit}
                layout="vertical"
                className="mt-4"
            >
                <Form.Item
                    label="Số tiền nạp"
                    name="amount"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số tiền!' },
                        {
                            validator: (_, value) => {
                                const amount = Number(value)
                                if (isNaN(amount) || amount < 10000) {
                                    return Promise.reject(new Error('Số tiền tối thiểu là 10,000 VNĐ!'))
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Nhập số tiền (VNĐ)"
                        className="w-full"
                        min="10000"
                    />
                </Form.Item>
                <div className="flex justify-end space-x-3">
                    <Button onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={depositMutation.isPending}
                        className="bg-teal-500 hover:bg-teal-600"
                    >
                        Nạp tiền
                    </Button>
                </div>
            </Form>
        </Modal>
    )
} 