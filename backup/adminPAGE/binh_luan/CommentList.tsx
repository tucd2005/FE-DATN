import React, { useState } from 'react';
import SidebarAdmin from "../../../components/admin/layouts/SidebarAdmin";
import HeaderAdmin from "../../../components/admin/layouts/HeaderAdmin";

import CommentSearchBar from '../../../components/admin/binh_luan/CommentSearchBar';
import CommentTable from '../../../components/admin/binh_luan/CommentTable';
interface Comment {
    key: number;
    product: string;
    user: string;
    date: string;
    content: string;
    status: boolean;
  }
const initialData: Comment[] = [
  {
    key: 1,
    product: 'Quần rơi dệt kim Nam Regular Fit APA003W2',
    user: 'người dùng a',
    date: '27/03/2025 22:44',
    content: 'kajfgiihdgsfikj',
    status: true,
  },
  {
    key: 2,
    product: 'Quần rơi dệt kim Nam Regular Fit APA003W2',
    user: 'người dùng a',
    date: '27/03/2025 22:44',
    content: 'kjhasdfjvhsvfjhsg',
    status: true,
  },
  {
    key: 3,
    product: 'Quần kaki Nam Cotton Slim fit AKK02107',
    user: 'người dùng a',
    date: '27/03/2025 19:20',
    content: 'vbcv bnbxg',
    status: true,
  },
];

const CommentList = () => {
  const [data, setData] = useState<Comment[]>(initialData);
  const [search, setSearch] = useState('');

  const handleToggleStatus = (key: number, checked: boolean) => {
    const updated = data.map((item) =>
      item.key === key ? { ...item, status: checked } : item
    );
    setData(updated);
  };

  const handleDateChange = (_: any, __: [string, string]) => {
    // Lọc theo ngày nếu cần
  };

  return (
    <>
      <SidebarAdmin />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin />
        <div className="min-h-screen p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">DANH SÁCH BÌNH LUẬN</h2>
          <CommentSearchBar
            search={search}
            onSearchChange={setSearch}
            onDateChange={handleDateChange}
          />
          <CommentTable
            data={data.filter((item) =>
              `${item.product} ${item.user} ${item.content}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </main>
    </>
  );
};

export default CommentList;
