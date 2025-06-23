export const formatCurrency = (value?: string | number) => {
    if (!value) return '0₫'
    const num = typeof value === 'string' ? Number(value.replace(/,/g, '')) : value
    return num.toLocaleString('vi-VN') + '₫'
    }