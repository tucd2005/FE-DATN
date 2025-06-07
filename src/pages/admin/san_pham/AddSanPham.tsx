import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

const AddSanPham = () => {
  return (
    <div>
        <h3 className='text-4xl flex justify-center'>Thêm sản phẩm</h3>
        <div>
            <Form>
                <Form.Item 
                label="Tên Sản Phẩm"
                name="name"
                rules={[{required: true, message:"Nhaapj ten san pham"}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item 
                label="Giá Sản Phẩm"
                name="price"
                rules={[{required: true, message:"Nhaapj ten san pham"}]}
                >
                    <Input/>
                </Form.Item>    
                <Form.Item 
                label="Tên Sản Phẩm"
                name="name"
                rules={[{required: true, message:"Nhaapj ten san pham"}]}
                >
                    <Input/>
                </Form.Item>
            </Form>    
        </div>
    </div>
  )
}

export default AddSanPham