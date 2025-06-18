import React, { useState, useRef } from "react";
import { Badge, Button, Card, Form, Input, InputNumber, Space, Switch, Tooltip, Upload, Typography, Select, DatePicker, Tag, message } from "antd";
import { CheckOutlined, PictureOutlined, PlusOutlined, SaveOutlined, StarOutlined, StarFilled, DeleteOutlined, AppstoreOutlined, SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";


const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
  lowStockThreshold: number;
  allowBackorder: boolean;
  image?: string;
}

interface ProductImage {
  uid: string;
  name: string;
  url: string;
  status?: string;
  isPrimary?: boolean;
  variantId?: string;
}

interface CustomAttribute {
  id: string;
  name: string;
  value: string;
}

const AddSanPham = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "product-image.png",
      status: "done",
      url: "/placeholder.svg?height=200&width=200",
    },
  ]);
  const [primaryImage, setPrimaryImage] = useState("-1");
  const [variants, setVariants] = useState([
    {
      id: "1",
      size: "M",
      color: "Đỏ",
      price: 299000,
      stock: 50,
      sku: "PRD-001-M-RED",
      lowStockThreshold: 10,
      allowBackorder: false,
    },
  ]);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputTagVisible, setInputTagVisible] = useState(false);
  const [inputTagValue, setInputTagValue] = useState("");
  const [inputAttributeVisible, setInputAttributeVisible] = useState(false);
  const [inputAttributeName, setInputAttributeName] = useState("");
  const [inputAttributeValue, setInputAttributeValue] = useState("");
  const inputTagRef = useRef(null);
  const inputAttributeRef = useRef(null);

  // Handle image upload
  const handleImageChange = ({ fileList: newFileList }) => {
    const validFiles = newFileList.filter(file => {
      if (file.size && file.size > 2 * 1024 * 1024) {
        message.error(`Ảnh ${file.name} vượt quá 2MB!`);
        return false;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        message.error(`Ảnh ${file.name} phải là JPG, PNG hoặc WEBP!`);
        return false;
      }
      return true;
    });
    setFileList(validFiles);
  };

  const handleImagePreview = async (file) => {
    // Preview logic here
  };

  const handleSetPrimaryImage = (uid) => {
    setPrimaryImage(uid);
    setFileList(fileList.map(file => ({
      ...file,
      isPrimary: file.uid === uid,
    })));
    message.success("Đã đặt làm ảnh chính");
  };

  // Handle variants
  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      size: "",
      color: "",
      price: 0,
      stock: 0,
      sku: "",
      lowStockThreshold: 10,
      allowBackorder: false,
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (id, field, value) => {
    setVariants(variants.map((variant) => (variant.id === id ? { ...variant, [field]: value } : variant)));
  };

  const removeVariant = (id) => {
    if (variants.length > 1) {
      setVariants(variants.filter((variant) => variant.id !== id));
    } else {
      message.warning("Phải có ít nhất một biến thể sản phẩm");
    }
  };

  const assignImageToVariant = (variantId, imageUid) => {
    setVariants(variants.map(variant =>
      variant.id === variantId ? { ...variant, image: imageUid } : variant
    ));
    setFileList(fileList.map(file =>
      file.uid === imageUid ? { ...file, variantId } : file
    ));
    message.success("Đã gán ảnh cho biến thể");
  };

  // Handle tags
  const handleTagClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const showTagInput = () => {
    setInputTagVisible(true);
    setTimeout(() => {
      inputTagRef.current?.focus();
    }, 100);
  };

  const handleTagInputChange = (e) => {
    setInputTagValue(e.target.value);
  };

  const handleTagInputConfirm = () => {
    if (inputTagValue && !tags.includes(inputTagValue)) {
      setTags([...tags, inputTagValue]);
    }
    setInputTagVisible(false);
    setInputTagValue("");
  };

  // Handle custom attributes
  const addCustomAttribute = () => {
    if (inputAttributeName && inputAttributeValue) {
      setCustomAttributes([
        ...customAttributes,
        {
          id: Date.now().toString(),
          name: inputAttributeName,
          value: inputAttributeValue,
        },
      ]);
      setInputAttributeName("");
      setInputAttributeValue("");
      setInputAttributeVisible(false);
      message.success("Đã thêm thuộc tính tùy chỉnh");
    } else {
      message.error("Vui lòng nhập cả tên và giá trị thuộc tính");
    }
  };

  const removeCustomAttribute = (id) => {
    setCustomAttributes(customAttributes.filter((attr) => attr.id !== id));
  };

  const showAttributeInput = () => {
    setInputAttributeVisible(true);
    setTimeout(() => {
      inputAttributeRef.current?.focus();
    }, 100);
  };

  // Form submission
  const onFinish = (values) => {
    const skus = variants.map(v => v.sku);
    if (new Set(skus).size !== skus.length) {
      message.error("SKU phải là duy nhất cho mỗi biến thể!");
      return;
    }
    const productData = {
      ...values,
      images: fileList,
      primaryImage,
      variants,
      tags,
      customAttributes,
    };
    console.log("Product data:", productData);
    message.success("Sản phẩm đã được tạo thành công!");
  };

  // Upload button
  const uploadButton = (
    <div className="flex flex-col items-center justify-center text-gray-500">
      <PlusOutlined className="text-lg" />
      <div className="mt-2 text-sm">Upload</div>
    </div>
  );

  // Custom image card render
  const imageCardRender = (originNode, file) => {
    return (
      <div className="relative group">
        {originNode}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Space>
            <Tooltip title="Đặt làm ảnh chính">
              <Button
                icon={file.uid === primaryImage ? <StarFilled /> : <StarOutlined />}
                size="small"
                shape="circle"
                type={file.uid === primaryImage ? "primary" : "default"}
                onClick={() => handleSetPrimaryImage(file.uid)}
              />
            </Tooltip>
            {variants.length > 1 && (
              <Tooltip title="Gán cho biến thể">
                <Select
                  size="small"
                  placeholder="Gán biến thể"
                  onChange={(variantId) => assignImageToVariant(variantId, file.uid)}
                  className="w-24"
                >
                  {variants.map(variant => (
                    <Option key={variant.id} value={variant.id}>
                      {variant.size} - {variant.color}
                    </Option>
                  ))}
                </Select>
              </Tooltip>
            )}
          </Space>
        </div>
        {file.uid === primaryImage && (
          <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center text-xs py-1 rounded-b">
            Ảnh chính
          </div>
        )}
        {file.variantId && (
          <div className="absolute top-0 left-0 bg-green-500 text-white text-xs py-1 px-2 rounded-tl">
            Biến thể: {variants.find(v => v.id === file.variantId)?.size} - {variants.find(v => v.id === file.variantId)?.color}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Thêm sản phẩm mới</h2>
          <Text type="secondary" className="text-sm sm:text-base">Tạo sản phẩm mới cho cửa hàng của bạn</Text>
        </div>
        <Space className="mt-4 sm:mt-0">
          <Button icon={<SaveOutlined />} size="large" className="rounded-md hover:bg-gray-100">
            Lưu nháp
          </Button>
          <Button type="primary" icon={<CheckOutlined />} size="large" onClick={() => form.submit()} className="rounded-md">
            Xuất bản
          </Button>
        </Space>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isActive: true,
          trackInventory: true,
          isFeatured: false,
          productType: "physical",
          isTaxable: true,
          taxClass: "standard",
          freeShipping: false,
        }}
        className="border-t-[1.5px] border-gray-800"
      >
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-6">
            <Card
              title={
                <span>
                  <InfoCircleOutlined className="mr-2 text-blue-600" />
                  Thông tin cơ bản
                </span>
              }
              className="shadow-sm border-none"
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
              >
                <Input placeholder="Nhập tên sản phẩm" className="rounded-md" />
              </Form.Item>

              <Form.Item label="Mô tả ngắn" name="shortDesc">
                <TextArea rows={3} placeholder="Mô tả ngắn..." className="rounded-md" />
              </Form.Item>

              <Form.Item label="Mô tả chi tiết" name="description">
                <TextArea rows={5} placeholder="Mô tả chi tiết..." className="rounded-md" />
              </Form.Item>

              <Form.Item label="Loại sản phẩm" name="productType" rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}>
                <Select placeholder="Chọn loại sản phẩm" className="rounded-md">
                  <Option value="physical">Sản phẩm vật lý</Option>
                  <Option value="digital">Sản phẩm số</Option>
                </Select>
              </Form.Item>

              <Form.Item
                noStyle
                shouldUpdate={(prev, curr) => prev.productType !== curr.productType}
              >
                {({ getFieldValue }) =>
                  getFieldValue("productType") === "digital" && (
                    <Form.Item label="Link tải xuống" name="downloadLink">
                      <Input placeholder="Nhập URL tải xuống" className="rounded-md" />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </Card>

            <Card
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <PictureOutlined className="text-green-600" />
                    <span>Hình ảnh sản phẩm</span>
                  </div>
                  <Text type="secondary" className="text-sm">
                    Tối đa 8 ảnh, kích thước tối đa 2MB
                  </Text>
                </div>
              }
              className="shadow-sm border-none"
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleImageChange}
                onPreview={handleImagePreview}
                itemRender={imageCardRender}
                className="upload-list-inline"
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Card>

            <Card
              title={
                <span>
                  <AppstoreOutlined className="mr-2 text-purple-600" />
                  Biến thể
                </span>
              }
              className="shadow-sm border-none"
            >
              {variants.map((variant, index) => (
                <Card
                  key={variant.id}
                  title={`Biến thể #${index + 1}`}
                  className="mb-4 border-none"
                  extra={
                    variants.length > 1 ? (
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => removeVariant(variant.id)}
                        className="hover:bg-red-100"
                      >
                        Xóa
                      </Button>
                    ) : null
                  }
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Form.Item label="Kích thước">
                      <Select
                        value={variant.size}
                        onChange={(value) => updateVariant(variant.id, "size", value)}
                        placeholder="Chọn size"
                        className="rounded-md"
                      >
                        <Option value="XS">XS</Option>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                        <Option value="XXL">XXL</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Màu sắc">
                      <Select
                        value={variant.color}
                        onChange={(value) => updateVariant(variant.id, "color", value)}
                        placeholder="Chọn màu"
                        className="rounded-md"
                      >
                        <Option value="Đỏ">Đỏ</Option>
                        <Option value="Xanh">Xanh</Option>
                        <Option value="Vàng">Vàng</Option>
                        <Option value="Đen">Đen</Option>
                        <Option value="Trắng">Trắng</Option>
                        <Option value="Xám">Xám</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Giá (VNĐ)">
                      <InputNumber
                        style={{ width: "100%" }}
                        value={variant.price}
                        onChange={(value) => updateVariant(variant.id, "price", value)}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placeholder="0"
                        className="rounded-md"
                      />
                    </Form.Item>

                    <Form.Item label="Tồn kho">
                      <InputNumber
                        style={{ width: "100%" }}
                        value={variant.stock}
                        onChange={(value) => updateVariant(variant.id, "stock", value)}
                        placeholder="0"
                        className="rounded-md"
                      />
                    </Form.Item>

                    <Form.Item label="SKU">
                      <Input
                        value={variant.sku}
                        onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                        placeholder="SKU-001"
                        className="rounded-md"
                      />
                    </Form.Item>

                    <Form.Item label="Ngưỡng tồn kho thấp">
                      <InputNumber
                        style={{ width: "100%" }}
                        value={variant.lowStockThreshold}
                        onChange={(value) => updateVariant(variant.id, "lowStockThreshold", value)}
                        placeholder="10"
                        className="rounded-md"
                      />
                    </Form.Item>

                    <Form.Item label="Cho phép đặt trước" valuePropName="checked">
                      <Switch
                        checked={variant.allowBackorder}
                        onChange={(checked) => updateVariant(variant.id, "allowBackorder", checked)}
                        className="bg-gray-200"
                      />
                    </Form.Item>
                  </div>
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={addVariant}
                block
                icon={<PlusOutlined />}
                className="hover:bg-gray-100 rounded-md"
              >
                Thêm biến thể
              </Button>
            </Card>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 space-y-6">
            <Card title="Hành động nhanh" className="shadow-sm border-none">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Trạng thái</span>
                  <Form.Item name="isActive" valuePropName="checked" noStyle>
                    <Switch className="bg-gray-200" />
                  </Form.Item>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sản phẩm nổi bật</span>
                  <Form.Item name="isFeatured" valuePropName="checked" noStyle>
                    <Switch className="bg-gray-200" />
                  </Form.Item>
                </div>
                <div className="flex justify-between items-center">
                  <span>Theo dõi tồn kho</span>
                  <Form.Item name="trackInventory" valuePropName="checked" noStyle>
                    <Switch className="bg-gray-200" />
                  </Form.Item>
                </div>
              </div>
            </Card>

            <Card title="Giá cả" className="shadow-sm border-none">
              <Form.Item
                label="Giá gốc (VNĐ)"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <InputNumber
                  className="w-full rounded-md"
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item label="Giá so sánh (VNĐ)" name="comparePrice">
                <InputNumber
                  className="w-full rounded-md"
                  min={0}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item label="Loại giảm giá" name="discountType">
                <Select placeholder="Chọn loại giảm giá" className="rounded-md">
                  <Option value="percentage">Phần trăm</Option>
                  <Option value="fixed">Cố định</Option>
                  <Option value="none">Không giảm giá</Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prev, curr) => prev.discountType !== curr.discountType}
              >
                {({ getFieldValue }) =>
                  getFieldValue("discountType") !== "none" && (
                    <>
                      <Form.Item label="Số tiền giảm" name="discountAmount">
                        <InputNumber
                          className="w-full rounded-md"
                          min={0}
                          formatter={(value) =>
                            getFieldValue("discountType") === "percentage"
                              ? `${value}%`
                              : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) =>
                            value.replace(getFieldValue("discountType") === "percentage" ? "%" : /\$\s?|(,*)/g, "")
                          }
                        />
                      </Form.Item>
                      <Form.Item label="Thời gian giảm giá" name="discountSchedule">
                        <RangePicker className="w-full rounded-md" />
                      </Form.Item>
                    </>
                  )
                }
              </Form.Item>
            </Card>

            <Card title="Phân loại" className="shadow-sm border-none">
              <Form.Item
                label="Danh mục"
                name="category"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select placeholder="Chọn danh mục" className="rounded-md">
                  <Option value="fashion">Thời trang</Option>
                  <Option value="electronics">Điện tử</Option>
                  <Option value="home">Gia dụng</Option>
                  <Option value="books">Sách</Option>
                  <Option value="sports">Thể thao</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Thương hiệu" name="brand">
                <Input placeholder="Nhập tên thương hiệu" className="rounded-md" />
              </Form.Item>
              <Form.Item label="Barcode/UPC" name="barcode">
                <Input placeholder="Nhập mã barcode" className="rounded-md" />
              </Form.Item>
            </Card>

            <Card title="Thuộc tính tùy chỉnh" className="shadow-sm border-none">
              <div className="space-y-4">
                {customAttributes.map((attr) => (
                  <div key={attr.id} className="flex justify-between items-center">
                    <span>{attr.name}: {attr.value}</span>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={() => removeCustomAttribute(attr.id)}
                      className="hover:bg-red-100"
                    />
                  </div>
                ))}
                {inputAttributeVisible ? (
                  <div className="space-y-2">
                    <Input
                      ref={inputAttributeRef}
                      placeholder="Tên thuộc tính (VD: Chất liệu)"
                      value={inputAttributeName}
                      onChange={(e) => setInputAttributeName(e.target.value)}
                      className="rounded-md"
                    />
                    <Input
                      placeholder="Giá trị (VD: Cotton)"
                      value={inputAttributeValue}
                      onChange={(e) => setInputAttributeValue(e.target.value)}
                      onPressEnter={addCustomAttribute}
                      className="rounded-md"
                    />
                    <Button
                      type="primary"
                      onClick={addCustomAttribute}
                      className="rounded-md"
                    >
                      Thêm
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="dashed"
                    onClick={showAttributeInput}
                    icon={<PlusOutlined />}
                    className="w-full hover:bg-gray-100 rounded-md"
                  >
                    Thêm thuộc tính
                  </Button>
                )}
              </div>
            </Card>

            <Card title="Thẻ tag" className="shadow-sm border-none">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag
                      key={tag}
                      closable
                      onClose={() => handleTagClose(tag)}
                      className="mb-2 bg-gray-100 text-gray-800 rounded-md"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
                {inputTagVisible ? (
                  <Input
                    ref={inputTagRef}
                    type="text"
                    size="small"
                    value={inputTagValue}
                    onChange={handleTagInputChange}
                    onBlur={handleTagInputConfirm}
                    onPressEnter={handleTagInputConfirm}
                    className="w-32 rounded-md"
                  />
                ) : (
                  <Button
                    type="dashed"
                    onClick={showTagInput}
                    icon={<PlusOutlined />}
                    size="small"
                    className="hover:bg-gray-100 rounded-md"
                  >
                    Thêm tag
                  </Button>
                )}
              </div>
            </Card>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-gray-200">
          <Button icon={<SaveOutlined />} size="large" className="rounded-md hover:bg-gray-100">
            Lưu nháp
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
            size="large"
            className="rounded-md"
          >
            Xuất bản sản phẩm
          </Button>
        </div>
      </Form>
    </div>
  );
};


export default AddSanPham