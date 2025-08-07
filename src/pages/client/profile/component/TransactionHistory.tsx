import { useWalletTransactions } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

export default function TransactionHistory() {
    const { data: transactions, isLoading: transactionsLoading } = useWalletTransactions()

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Lịch sử giao dịch</h3>
                <button
                    onClick={() => window.location.reload()}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                >
                    Làm mới →
                </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                {transactionsLoading ? (
                    <div className="text-center text-gray-500 py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
                        <p className="text-sm">Đang tải lịch sử giao dịch...</p>
                    </div>
                ) : transactions && transactions.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {transactions.slice(0, 5).map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${transaction.status === 'success' ? 'bg-green-500' :
                                            transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}></div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {transaction.type === 'deposit' ? 'Nạp tiền' : 'Rút tiền'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {transaction.description}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(transaction.created_at).toLocaleString('vi-VN')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-bold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                    </div>
                                    <div className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'success' ? 'bg-green-100 text-green-800' :
                                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {transaction.status === 'success' ? 'Thành công' :
                                            transaction.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm">Chưa có giao dịch nào</p>
                        <p className="text-xs text-gray-400 mt-1">Các giao dịch sẽ hiển thị ở đây</p>
                    </div>
                )}
            </div>
        </div>
    )
} 