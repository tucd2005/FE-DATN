import { Card, Descriptions, Tag } from 'antd';

const ProductInfo = ({ product }) => {
  return (
    <Card title="Thông tin sản phẩm" bordered>
      <Descriptions column={2} layout="vertical">
        <Descriptions.Item label="Tên sản phẩm">
          <span style={{ color: '#d4380d', fontWeight: 500 }}>{product.name}</span>
        </Descriptions.Item>
     
        <Descriptions.Item label="Mô tả">{product.description}</Descriptions.Item>
        <Descriptions.Item label="Giá">{product.price.toLocaleString()} đ</Descriptions.Item>
        <Descriptions.Item label="Danh mục">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color="green">{product.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo ">{product.updatedAt}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProductInfo;
