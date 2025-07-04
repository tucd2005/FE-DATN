import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tag, Button, Descriptions, Skeleton } from "antd";
import dayjs from "dayjs";
import { useReviewDetail } from "../../../hooks/useReview";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useReviewDetail(Number(id));

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px" }}>
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>

      <Card
        title={<span style={{ fontSize: "18px", fontWeight: 600 }}>Chi tiết bình luận #{id}</span>}
        bordered={false}
        style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        {isLoading ? (
          <Skeleton active />
        ) : (
          data?.data && (
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="ID">{data.data.id}</Descriptions.Item>
              <Descriptions.Item label="Người dùng">{data.data.user?.name}</Descriptions.Item>
              <Descriptions.Item label="Nội dung">{data.data.content}</Descriptions.Item>
              <Descriptions.Item label="Số sao">
                <Tag color="gold">{data.data.rating} ⭐</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {dayjs(data.data.created_at).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="Sản phẩm">
                {data.data.product?.name || "-"}
              </Descriptions.Item>
            </Descriptions>
          )
        )}
      </Card>
    </div>
  );
};

export default ReviewDetailPage;
