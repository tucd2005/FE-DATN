import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { RollbackOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDeletedAttributeValues, useRestoreAttributeValue } from "../../../hooks/useAttribute";

const DeletedListPage: React.FC = () => {
  const { attributeId } = useParams<{ attributeId: string }>();
  const navigate = useNavigate();
  const attributeIdNumber = Number(attributeId);

  const { data, isLoading, error } = useDeletedAttributeValues(attributeIdNumber);
  const { mutate: restore, isLoading: isRestoring } = useRestoreAttributeValue();

  if (!attributeId) return <div>Thiếu tham số attributeId trên URL</div>;
  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {(error as any).message}</div>;

  return (
    <div className="p-4 bg-white rounded shadow max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách giá trị đã xoá mềm (attributeId: {attributeId})</h2>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </div>
      <ul className="space-y-2">
        {data?.map((item) => (
          <li key={item.id} className="p-2 border rounded flex justify-between items-center">
            <span>{item.gia_tri} (id: {item.id})</span>
            <Button
              type="primary"
              size="small"
              loading={isRestoring}
              icon={<RollbackOutlined />}
              onClick={() => restore(item.id)}
            >
              Khôi phục
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletedListPage;
