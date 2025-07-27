import React from "react";
import { Card, Descriptions, Tag, Spin } from "antd";
import { useParams } from "react-router-dom";
import { usePostDetail } from "../../../hooks/usePost";

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data: post, isLoading } = usePostDetail(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!post) {
    return <p>Không tìm thấy bài viết.</p>;
  }

  return (
    <Card title={`Chi tiết bài viết #${post.id}`} bordered={false} className="shadow rounded-xl">
      <Descriptions layout="vertical" bordered column={1}>
        <Descriptions.Item label="Tiêu đề">
          <strong>{post.tieu_de}</strong>
        </Descriptions.Item>

        <Descriptions.Item label="Mô tả ngắn">
          {post.mo_ta_ngan}
        </Descriptions.Item>

        <Descriptions.Item label="Trạng thái">
          <Tag color={post.trang_thai === "hien" ? "green" : "red"}>
            {post.trang_thai === "hien" ? "Hiển thị" : "Ẩn"}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Ngày tạo">
          {new Date(post.created_at).toLocaleString("vi-VN")}
        </Descriptions.Item>

        <Descriptions.Item label="Nội dung">
          <div dangerouslySetInnerHTML={{ __html: post.noi_dung }} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PostDetailPage;
