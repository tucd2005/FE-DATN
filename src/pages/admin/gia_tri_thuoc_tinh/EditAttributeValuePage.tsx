import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Spin } from "antd";
import { useAttributeValueDetail, useUpdateAttributeValue } from "../../../hooks/useAttribute";

const EditAttributeValuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idNumber = Number(id);

  const { data, isLoading: isLoadingDetail, error } = useAttributeValueDetail(idNumber);
  const [value, setValue] = useState("");

  const { mutate, isLoading } = useUpdateAttributeValue();

  // Fill giá trị cũ vào input khi data load xong
  useEffect(() => {
    if (data) {
      setValue(data.gia_tri);
    }
  }, [data]);

  const handleUpdate = () => {
    mutate(
      { id: idNumber, gia_tri: value },
      {
        onSuccess: () => {
          navigate(-1); // quay lại
        },
      }
    );
  };

  if (!id) return <div>Thiếu id giá trị trên URL</div>;
  if (isLoadingDetail) return <Spin tip="Đang tải dữ liệu..." />;
  if (error) return <div>Lỗi: {(error as any).message}</div>;

  return (
    <div className="p-4 bg-white rounded shadow  mx-auto">
      <h2 className="text-xl font-semibold mb-4">Chỉnh sửa giá trị thuộc tính (ID: {id})</h2>
      <div className="space-y-2">
        <Input
          placeholder="Nhập giá trị mới"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="primary" onClick={handleUpdate} loading={isLoading}>
          Lưu
        </Button>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    </div>
  );
};

export default EditAttributeValuePage;
