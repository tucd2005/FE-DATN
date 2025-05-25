import React from 'react';
import { Input, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onDateChange: (dates: any, dateStrings: [string, string]) => void;
}

const CommentSearchBar: React.FC<Props> = ({ search, onSearchChange, onDateChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        placeholder="Tìm kiếm theo sản phẩm, người dùng hoặc nội dung"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-[300px]"
      />
      <RangePicker
        format="DD/MM/YYYY"
        className="w-[250px]"
        allowClear
        onChange={onDateChange}
      />
    </div>
  );
};

export default CommentSearchBar;
