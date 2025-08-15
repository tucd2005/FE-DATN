import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useAttributeValueList, useSoftDeleteAttributeValue } from "../../../hooks/useAttribute";

interface AttributeValue {
  id: number;
  thuoc_tinh_id: number;
  thuoc_tinh_ten: string;
  gia_tri: string;
  created_at: string;
  updated_at: string;
}

const AttributeValueListPage: React.FC = () => {
  const navigate = useNavigate();
  const { attributeId } = useParams<{ attributeId: string }>();
  const attributeIdNumber = Number(attributeId);

  const { data, isLoading, error } = useAttributeValueList(attributeIdNumber);
  const { mutate: softDelete, isLoading: isDeleting } = useSoftDeleteAttributeValue();

  if (!attributeId) return <div>Thiếu tham số attributeId trên URL</div>;
  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {(error as any).message}</div>;

  return (
    <div className="p-4 bg-white rounded shadow  mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Giá trị thuộc tính:{" "}
          <span className="text-blue-600">{data?.[0]?.thuoc_tinh_ten || "Không xác định"}</span>
        </h2>
        <div className="flex gap-2">
          <Button icon={<EyeOutlined />}onClick={() =>navigate(`/admin/gia-tri/thuoc-tinh/${attributeId}/deleted`)}
          >
            Đã xoá mềm
          </Button>
          <Button type="primary"icon={<PlusOutlined />}onClick={() =>navigate(`/admin/gia-tri/thuoc-tinh/${attributeId}/add`)}>Thêm giá trị
          </Button>
        </div>
      </div>
      <ul className="space-y-2">
        {data?.map((item: AttributeValue) => (
          <li key={item.id} className="p-2 border rounded flex justify-between items-center">
            <span>{item.gia_tri}</span>
            <div className="space-x-2">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => navigate(`/admin/gia-tri/thuoc-tinh/${item.id}/edit`)}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Bạn chắc chắn xoá?"
                onConfirm={() => softDelete(item.id)}
                okText="Xoá"
                cancelText="Hủy"
              >
                <Button
                  type="primary"
                  danger
                  size="small"
                  loading={isDeleting}
                  icon={<DeleteOutlined />}
                >
                  Xoá
                </Button>
              </Popconfirm>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttributeValueListPage;
