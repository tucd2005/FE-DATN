import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Space, Table, Tag } from 'antd';
import axios from 'axios';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import type { Product } from '../../../types/product.type';


const QuanLySanPham: React.FC = () => {
  const [product, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const fetchProduct = async() => {
      const res = await axios.get(`http://localhost:3000/products`)
      setProducts(res.data)
    }
    fetchProduct()
  }, [])


  const removeProduct = async (id: number) => {
   try {
    const res = await axios.delete(`http://localhost:3000/products/${id}`)
    message.success("xoa san pham thanh cong")
    setProducts(prev => prev.filter((item) => item.id !== id))
   } catch (error) {
    console.error("co loi khi xoa san pham", error);
   }
  };
  
  return(
    <div>
      <div className='bg-white p-4 rounded shadow'>

      <div className='flex justify-between '>
        <h3 className='text-3xl'>Quản lí sản phẩm</h3>
      

      <Button type='primary'>
        <Link to={"add"}>Them san pham</Link>

      </Button>
      </div>
      <Table dataSource={product} 
      columns={[
        {
          title: "Id",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "Tên sản phẩm",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Ảnh sản phẩm",
          dataIndex: "image",
          key: "image",
          render: (image) => <img src={image} alt='anh san pham' className='w-20 h-20 object-cover'/>
        },
        
        {
          title: "Giá",
          dataIndex: "price",
          key: "price"
        },
        {
          title: "Danh mục",
          dataIndex: "category",
          key: "category"
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "Thao tác",
          render: (_, item: {id: number}) => {
            return(

              <div>
                <Space>


              <Button>sua</Button>
              <Button>Chi tiet</Button>

              <Popconfirm 
                title= "ban co muon xoa khong"
               onConfirm={() => removeProduct(item.id)}
               okText= "  Xoa"
               cancelText = "Huy"
                >
                <Button danger>Xoas</Button>
              </Popconfirm>
                  </Space>

            </div>
        )
          }
        },
      ]}>

      </Table>
      </div>
    </div>
  )
};

export default QuanLySanPham;



