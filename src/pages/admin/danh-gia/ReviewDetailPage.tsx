import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tag, Button, Descriptions, Skeleton, Image, Row, Col, Divider } from "antd";
import dayjs from "dayjs";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useReviewDetail } from "../../../hooks/useReview";

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useReviewDetail(Number(id));

  const review = data?.data;

  // Ảnh sản phẩm
  const productImageUrl = review?.product?.image?.startsWith("http")
    ? review.product.image
    : "https://placehold.co/200x200?text=Product";

  // Ảnh bình luận (nếu có)
  const reviewImageUrl = review?.image?.startsWith("http")
    ? review.image
    : "https://placehold.co/200x200?text=Review";

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: 24 }}>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 20 }}
      >
        Quay lại
      </Button>

      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: 24,
        }}
      >
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : review ? (
          <>
            {/* Phần ảnh to phía trên */}
            <Row gutter={24} style={{ marginBottom: 24 }}>
              <Col xs={24} md={12} style={{ textAlign: "center" }}>
                <Image
                  src={productImageUrl}
                  alt={review.product?.name || "-"}
                  width={200}
                  height={200}
                  style={{ objectFit: "cover", borderRadius: 12 }}
                  preview
                  fallback="https://placehold.co/200x200?text=Product"
                />
                <div style={{ marginTop: 8, fontWeight: 600 }}>{review.product?.name || "Sản phẩm"}</div>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: "center" }}>
                <Image
                  src={reviewImageUrl}
                  alt="Ảnh bình luận"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover", borderRadius: 12 }}
                  preview
                  fallback="https://placehold.co/200x200?text=Review"
                />
                <div style={{ marginTop: 8, fontWeight: 600 }}>Ảnh bình luận</div>
              </Col>
            </Row>

            <Divider />

            {/* Tiêu đề & rating */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                Chi tiết đánh giá #{review.id}
              </h2>
              <Tag color="gold" style={{ fontSize: 16 }}>
                {review.rating} ⭐
              </Tag>
            </div>

            {/* Thông tin chi tiết */}
            <Descriptions
              column={{ xs: 1, sm: 1, md: 2 }}
              bordered
              size="middle"
              labelStyle={{ fontWeight: 500, width: 160 }}
              contentStyle={{ whiteSpace: "pre-line" }}
            >
              <Descriptions.Item label="ID">{review.id}</Descriptions.Item>
              <Descriptions.Item label="Người dùng">{review.user?.name || "-"}</Descriptions.Item>
              <Descriptions.Item label="Nội dung">{review.content}</Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {dayjs(review.created_at).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
            </Descriptions>
          </>
        ) : (
          <p>Không tìm thấy dữ liệu.</p>
        )}
      </Card>
    </div>
  );
};

export default ReviewDetailPage;
