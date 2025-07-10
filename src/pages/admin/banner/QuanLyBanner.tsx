import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Image, Popconfirm, Space, Table } from 'antd';
import React from 'react';
import api from '../../../api';
import type { IBanner } from '../../../types/banner,type';
import AddBanner from './AddBanner';
import useSendMessage from '../../../hooks/useSendMessage';

const QuanLyBanner: React.FC = () => {
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();

  const { data: banners, isPending } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await api.get('/admin/banner');
      return response.data;
    },
    refetchOnWindowFocus: false,
  })

  const archiveBanner = async (id: string) => {
    try {
      const res = await api.delete(`/admin/banner/${id}`);
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      sendMessage('success', 'Xoá banner thành công');
      console.log(res);
    } catch (error) {
      sendMessage('error', 'Xoá banner thất bại');
      console.log(error);
    }
  }

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'hinh_anh',
      key: 'hinh_anh',
      render: (src: string) => <Image width={120} src={src} />,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'tieu_de',
      key: 'tieu_de',
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      key: 'mo_ta',
    },
    {
      title: 'Liên kết',
      dataIndex: 'lien_ket',
      key: 'lien_ket',
      render: (url: string) => url ? <a href={url} target="_blank" rel="noreferrer">{url}</a> : 'Không có liên kết',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: IBanner) => (
        <Space>
          {/* Có thể thêm nút Sửa ở đây */}
          <Popconfirm title="Bạn có chắc muốn xoá?" onConfirm={() => archiveBanner(record.id.toString())}>
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Quản lý Banner</h2>
        <AddBanner />
      </div>
      <Table loading={isPending} dataSource={banners} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default QuanLyBanner;
