import { useState } from "react";
import type { Variant } from "../../../../types/product.type";

interface VariantTestProps {
    variants: Variant[];
    selectedVariant: Variant | null;
    onVariantChange: (variant: Variant) => void;
}

const VariantTest = ({ variants, selectedVariant, onVariantChange }: VariantTestProps) => {
    const [showTest, setShowTest] = useState(false);

    const handleTestVariantChange = () => {
        if (selectedVariant) {
            // Tìm biến thể khác còn hàng
            const availableVariant = variants.find(v => v.so_luong > 0 && v.id !== selectedVariant.id);
            if (availableVariant) {
                onVariantChange(availableVariant);
            }
        }
    };

    if (!showTest) {
        return (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <button
                    onClick={() => setShowTest(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Test Auto Variant Change
                </button>
            </div>
        );
    }

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Test Auto Variant Change</h3>
            <div className="space-y-2">
                <p><strong>Current Variant:</strong> {selectedVariant?.id} (Stock: {selectedVariant?.so_luong})</p>
                <div className="space-y-1">
                    <p><strong>All Variants:</strong></p>
                    {variants.map((variant) => (
                        <div key={variant.id} className="text-sm">
                            ID: {variant.id} - Stock: {variant.so_luong} -
                            {variant.thuoc_tinh.map(attr => `${attr.ten}: ${attr.gia_tri}`).join(', ')}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleTestVariantChange}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Test Change to Available Variant
                </button>
                <button
                    onClick={() => setShowTest(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                >
                    Hide Test
                </button>
            </div>
        </div>
    );
};

export default VariantTest; 