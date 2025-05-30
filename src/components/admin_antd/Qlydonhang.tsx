import { Table } from 'antd'
import React from 'react'

const Qlydonhang = () => {
  return (
    <div><Table
    columns={[
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'nguoi_dung_id	', dataIndex: 'nguoi_dung_id	', key: 'nguoi_dung_id	' },
      { title: 'Mô tả', dataIndex: 'mo_ta', key: 'mo_ta' },
      { title: 'Slug', dataIndex: 'slug', key: 'slug' },
      { title: 'Ngày tạo', dataIndex: 'ngay_tao', key: 'ngay_tao' },
      { title: 'Ngày cập nhật', dataIndex: 'ngay_cap_nhat', key: 'ngay_cap_nhat' },
      { title: 'Trạng thái', dataIndex: 'trang_thai', key: 'trang_thai' },
    ]}
  /></div>
  )
}

export default Qlydonhang