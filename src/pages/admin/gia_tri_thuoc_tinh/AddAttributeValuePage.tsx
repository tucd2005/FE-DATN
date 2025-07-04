import React, { useState } from "react";
import { Button, Input } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateAttributeValue } from "../../../hooks/useAttribute";

const AddAttributeValuePage: React.FC = () => {
  const { attributeId } = useParams<{ attributeId: string }>();
  const navigate = useNavigate();
  const attributeIdNumber = Number(attributeId);

  const [value, setValue] = useState<string>(""); // Ban đầu trống
  const { mutate, isLoading } = useCreateAttributeValue();

  const handleAdd = () => {
    mutate(
      { attributeId: attributeIdNumber, gia_tri: value },
      {
        onSuccess: () => {
          navigate(`/admin/gia-tri/thuoc-tinh/${attributeId}`);
        },
      }
    );
  };

  if (!attributeId) return <div>Thiếu tham số attributeId trên URL</div>;

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Thêm giá trị thuộc tính (ID: {attributeId})
      </h2>

      <div className="space-y-3">
        {/* Ô input: để nhập hoặc nhận giá trị từ bảng màu */}
        <Input
          placeholder="Nhập giá trị thuộc tính"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* 🎨 Bảng màu – khi click sẽ đổ vào value */}
        <div>
          <label className="block mb-1 text-sm">🎨 Chọn màu (giá trị sẽ tự điền vào ô trên):</label>
          <input
            type="color"
            value={value || "#000000"} // nếu value trống thì bảng màu vẫn hiển thị mặc định
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "60px", height: "34px", border: "none", cursor: "pointer" }}
          />
        </div>

        <div className="flex space-x-2">
          <Button type="primary" onClick={handleAdd} loading={isLoading}>
            Thêm
          </Button>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>
      </div>
    </div>
  );
};

export default AddAttributeValuePage;
