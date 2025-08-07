import { Modal, Form, Input, Button, message } from "antd"
import { useWalletWithdraw } from "../../../../hooks/useWalletClient"

interface WithdrawModalProps {
    visible: boolean
    onCancel: () => void
    onSuccess?: () => void
}

export default function WithdrawModal({ visible, onCancel, onSuccess }: WithdrawModalProps) {
    const [form] = Form.useForm()
    const withdrawMutation = useWalletWithdraw()

    const handleWithdraw = async (values: {
        amount: string | number
        bank_name: string
        bank_account: string
        acc_name: string
    }) => {
        try {
            const amount = Number(values.amount)
            await withdrawMutation.mutateAsync({ ...values, amount })
            message.success('Yêu cầu rút tiền đã được gửi!')
            onSuccess?.()
            onCancel()
            form.resetFields()
        } catch (error: unknown) {
            console.error('Withdraw error:', error)
            const errorMessage = error && typeof error === 'object' && 'response' in error
                ? (error.response as any)?.data?.message
                : 'Có lỗi xảy ra khi rút tiền!'
            message.error(errorMessage)
        }
    }

    return (
        <Modal
            title="Rút tiền từ ví"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={500}
        >
            <Form
                form={form}
                onFinish={handleWithdraw}
                layout="vertical"
                className="mt-4"
            >
                <Form.Item
                    label="Số tiền rút"
                    name="amount"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số tiền!' },
                        {
                            validator: (_, value) => {
                                const amount = Number(value)
                                if (isNaN(amount) || amount < 50000) {
                                    return Promise.reject(new Error('Số tiền tối thiểu là 50,000 VNĐ!'))
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
                        min="50000"
                    />
                </Form.Item>
                <Form.Item
                    label="Tên ngân hàng"
                    name="bank_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
                >
                    <Input placeholder="VD: Vietcombank, Techcombank..." />
                </Form.Item>
                <Form.Item
                    label="Số tài khoản"
                    name="bank_account"
                    rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                >
                    <Input placeholder="Nhập số tài khoản ngân hàng" />
                </Form.Item>
                <Form.Item
                    label="Tên chủ tài khoản"
                    name="acc_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên chủ tài khoản!' }]}
                >
                    <Input placeholder="Nhập tên chủ tài khoản" />
                </Form.Item>
                <div className="flex justify-end space-x-3">
                    <Button onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={withdrawMutation.isPending}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        Rút tiền
                    </Button>
                </div>
            </Form>
        </Modal>
    )
} 