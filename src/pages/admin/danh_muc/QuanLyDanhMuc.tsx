import React, { useState } from 'react'
import { useCreate } from '../../../hooks/useCategory';
import { Button, Modal } from 'antd';
import TableCategory from './tablecaterory';


function QuanLyDanhMuc() {
  const [visible, setVisible] = useState(false);
  const { mutate: createCategory } = useCreate({ resource: "categories" });

  const handleFinish = (values: any) => {
    createCategory(values, {
      onSuccess: () => {
        setVisible(false);
      },
    });
  };
  return (
    <>
  

     <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách danh mục</h2>
          <Button type="primary" onClick={() => setVisible(true)}>
            Thêm danh mục
          </Button>
        </div>
        <TableCategory />
      </div>

  
  
    </>
  )
}

export default QuanLyDanhMuc
