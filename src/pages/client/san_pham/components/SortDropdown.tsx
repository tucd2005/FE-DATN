import React from 'react';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export interface SortOption {
    value: string;
    label: string;
    sort_by: 'ten' | 'variants_min_gia_khuyen_mai' | 'created_at';
    sort_order: 'asc' | 'desc';
}

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: SortOption[];
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange, options }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sắp xếp theo:</span>
            <Select
                value={value}
                onChange={onChange}
                style={{ width: 200 }}
                suffixIcon={<DownOutlined />}
                options={options.map(option => ({
                    value: option.value,
                    label: option.label,
                }))}
            />
        </div>
    );
};

export default SortDropdown; 