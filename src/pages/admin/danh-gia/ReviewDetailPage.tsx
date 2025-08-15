import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Tag,
  Button,
  Descriptions,
  Skeleton,
  Image,
  Row,
  Col,
  Space,
  Typography,
  Rate,
} from "antd";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useReviewDetail } from "../../../hooks/useReview";

const { Title, Text } = Typography;

// Hàm xử lý ảnh
const toFullImageUrl = (image?: string) =>
  image
    ? image.startsWith("http")
      ? image
      : `http://127.0.0.1:8000/storage/${image}`
    : "https://placehold.co/300x300?text=No+Image";

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useReviewDetail(Number(id));
  const review = data?.data;

  const productImageUrl = toFullImageUrl(review?.product?.image);
  const reviewImageUrl = toFullImageUrl(review?.image);
  const hasVariant = !!review?.variant;
  console.log("Review data:", review);

  return (
    <div style={{  margin: "0 auto", padding: "24px" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 20, backgroundColor: '#1890ff', color: '#fff' }}
      >
        Quay lại
      </Button>

      <Card
        bordered={false}
        style={{ borderRadius: 12, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : review ? (
          <Row gutter={[32, 32]}>
            {/* Left: Images and product info */}
            <Col xs={24} md={10}>
              <Card bordered={false} style={{ textAlign: "center", borderRadius: 12 }}>
                <Image
                  src={productImageUrl}
                  alt="Ảnh sản phẩm"
                  width="100%"
                  height={250}
                  style={{ objectFit: "cover", borderRadius: 10 }}
                />
                <Title level={5} style={{ marginTop: 12 }}>
                  {hasVariant
                    ? review.variant?.product_name
                    : review.product?.name || "Sản phẩm"}
                </Title>

                {hasVariant && (
                  <Space wrap style={{ marginTop: 8 }}>
                    {review.variant.attributes?.map((attr: any, index: number) => (
                      <Tag key={index} color="blue">
                        {attr.attribute_name}: {attr.value}
                      </Tag>
                    ))}
                  </Space>
                )}
              </Card>

              <Card
                bordered={false}
                style={{ marginTop: 24, textAlign: "center", borderRadius: 12 }}
                title="Ảnh bình luận"
              >
                <Image
                  src={reviewImageUrl}
                  alt="Ảnh bình luận"
                  width="100%"
                  height={250}
                  style={{ objectFit: "cover", borderRadius: 10 }}
                  fallback="https://placehold.co/300x300?text=No+Image"
                />
              </Card>
            </Col>

            {/* Right: Review info */}
            <Col xs={24} md={14}>
              <div
                style={{
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Đánh giá #{review.id}
                </Title>

                <Space>
                  <Rate disabled defaultValue={review.rating} />
                  <Text>({review.rating} sao)</Text>
                </Space>
              </div>

              <Descriptions
                column={1}
                size="middle"
                layout="vertical"
                labelStyle={{ fontWeight: 500, color: "#555" }}
              >
                <Descriptions.Item label="Người dùng">
                  {review.user?.name || "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Nội dung">
                  <Text>{review.content || "-"}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">
                  {dayjs(review.created_at).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        ) : (
          <Text>Không tìm thấy dữ liệu đánh giá.</Text>
        )}
      </Card>
    </div>
  );
};

export default ReviewDetailPage;
