import { Modal, Form, Input, Button, Alert, Select, InputNumber } from "antd";
import { useWalletWithdraw, useWalletBalance } from "../../../../hooks/useWalletClient";
import { formatCurrency } from "../../../../utils/formatCurrency";

const { Option } = Select;

interface WithdrawModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

const bankOptions = [
    { value: "Vietcombank", label: "Vietcombank" },
    { value: "BIDV", label: "BIDV" },
    { value: "Agribank", label: "Agribank" },
    { value: "Techcombank", label: "Techcombank" },
    { value: "MB Bank", label: "MB Bank" },
    { value: "ACB", label: "ACB" },
    { value: "VPBank", label: "VPBank" },
    { value: "TPBank", label: "TPBank" },
    { value: "Sacombank", label: "Sacombank" },
    { value: "VIB", label: "VIB" },
    { value: "SHB", label: "SHB" },
    { value: "OCB", label: "OCB" },
    { value: "MSB", label: "MSB" },
    { value: "SeABank", label: "SeABank" },
    { value: "HDBank", label: "HDBank" },
    { value: "VietinBank", label: "VietinBank" },
    { value: "SCB", label: "SCB" },
    { value: "Eximbank", label: "Eximbank" },
    { value: "DongA Bank", label: "DongA Bank" },
    { value: "Khác", label: "Ngân hàng khác" },
];

export default function WithdrawModal({ visible, onCancel, onSuccess }: WithdrawModalProps) {
    const [form] = Form.useForm();
    const { mutate: withdraw, isPending } = useWalletWithdraw();
    const { data: walletBalance, isLoading: isBalanceLoading } = useWalletBalance();
    const maxAmount = walletBalance?.balance || 0;
    const amount = Form.useWatch("amount", form) || 50000;

    const handleSubmit = (values: {
        amount: number;
        bank_name: string;
        bank_account: string;
        acc_name: string;
    }) => {
        withdraw(values, {
            onSuccess: () => {
                form.resetFields();
                onSuccess();
            },
        });
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    if (isBalanceLoading) {
        return (
            <Modal
                title="Rút tiền từ ví"
                open={visible}
                onCancel={handleCancel}
                footer={null}
                width={600}
                centered
            >
                <div>Đang tải số dư...</div>
            </Modal>
        );
    }

    if (maxAmount < 50000) {
        return (
            <Modal
                title="Rút tiền từ ví"
                open={visible}
                onCancel={handleCancel}
                footer={null}
                width={600}
                centered
            >
                <Alert
                    message="Số dư không đủ"
                    description="Số dư ví của bạn không đủ để rút tối thiểu 50,000 VNĐ."
                    type="error"
                    showIcon
                />
            </Modal>
        );
    }

    return (
        <Modal
            title="Rút tiền từ ví"
            open={visible}
            onCancel={handleCancel}
            footer={null}
            width={600}
            centered
        >
            <div className="space-y-6">
                <Alert
                    message="Thông tin rút tiền"
                    description={
                        <div className="mt-2 space-y-1 text-sm">
                            <p>• Số tiền tối thiểu: 50,000 VNĐ</p>
                            <p>• Số tiền tối đa: 500,000,000 VNĐ</p>
                            <p>• Số dư hiện tại: {formatCurrency(maxAmount)}</p>
                            <p>• Giao dịch sẽ được xử lý trong 1-3 ngày làm việc</p>
                        </div>
                    }
                    type="info"
                    showIcon
                />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ amount: 50000 }}
                >
                    <Form.Item
                        label="Số tiền rút (VNĐ)"
                        name="amount"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tiền" },
                            { type: "number", min: 50000, message: "Số tiền tối thiểu là 50,000 VNĐ" },
                            { type: "number", max: 500000000, message: "Số tiền tối đa là 500,000,000 VNĐ" },
                            {
                                validator: (_, value) => {
                                    if (typeof value !== "number" || isNaN(value)) {
                                        return Promise.reject(new Error("Vui lòng nhập số tiền hợp lệ"));
                                    }
                                    if (value > maxAmount) {
                                        return Promise.reject(new Error("Số tiền rút không được vượt quá số dư hiện tại"));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Nhập số tiền cần rút"
                            className="w-full text-lg font-medium"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                            min={50000}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngân hàng"
                        name="bank_name"
                        rules={[{ required: true, message: "Vui lòng chọn ngân hàng" }]}
                    >
                        <Select
                            placeholder="Chọn ngân hàng"
                            showSearch
                            filterOption={(input, option) => {
                                const label = option?.label;
                                return typeof label === "string" && label.toLowerCase().includes(input.toLowerCase());
                            }}
                        >
                            {bankOptions.map((bank) => (
                                <Option key={bank.value} value={bank.value} label={bank.label}>
                                    {bank.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Số tài khoản"
                        name="bank_account"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tài khoản" },
                            { pattern: /^\d+$/, message: "Số tài khoản chỉ được chứa số" },
                            { min: 8, message: "Số tài khoản phải có ít nhất 8 chữ số" },
                            { max: 20, message: "Số tài khoản không được vượt quá 20 chữ số" },
                        ]}
                    >
                        <Input
                            placeholder="Nhập số tài khoản ngân hàng"
                            className="text-lg"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                form.setFieldsValue({ bank_account: value });
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tên chủ tài khoản"
                        name="acc_name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên chủ tài khoản" },
                            { min: 2, message: "Tên chủ tài khoản phải có ít nhất 2 ký tự" },
                            {
                                pattern: /^[A-Z\s]+$/,
                                message: "Tên chủ tài khoản chỉ được chứa chữ in hoa và khoảng trắng",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên chủ tài khoản (viết hoa, không dấu)"
                            className="text-lg"
                            onChange={(e) => {
                                const value = e.target.value
                                    .toUpperCase()
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .replace(/[^A-Z\s]/g, "");
                                form.setFieldsValue({ acc_name: value });
                            }}
                        />
                    </Form.Item>

                    {amount > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {formatCurrency(amount)}
                                </div>
                                <div className="text-sm text-blue-600">Số tiền sẽ rút</div>
                                {amount > maxAmount && (
                                    <div className="text-sm text-red-600 mt-1">
                                        Số tiền vượt quá số dư hiện tại!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                        <Button type="default" onClick={handleCancel} className="flex-1" size="large">
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            disabled={amount > maxAmount || amount < 50000}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 border-blue-500"
                            size="large"
                        >
                            {isPending ? "Đang xử lý..." : "Rút tiền"}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}