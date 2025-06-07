"use client"

import React, { useState } from "react"
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  InputNumber,
  Upload,
  Card,
  Tag,
  message,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Steps,
  Badge,
  Tooltip,
  Progress,
} from "antd"
import {
  PlusOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  SaveOutlined,
  CloseOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  ShoppingOutlined,
  PictureOutlined,
  TagsOutlined,
  SettingOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import type { UploadFile, UploadProps } from "antd/es/upload/interface"

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select
const { Step } = Steps

interface ProductVariant {
  id: string
  size: string
  color: string
  price: number
  stock: number
  sku: string
}

const DetailSanPham: React.FC = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [primaryImage, setPrimaryImage] = useState<string>("")
  const [variants, setVariants] = useState<ProductVariant[]>([
    { id: "1", size: "M", color: "Đỏ", price: 299000, stock: 50, sku: "PRD-001-M-RED" },
  ])
  const [tags, setTags] = useState<string[]>(["thời trang", "mùa hè"])
  const [inputTagVisible, setInputTagVisible] = useState<boolean>(false)
  const [inputTagValue, setInputTagValue] = useState<string>("")
  const inputTagRef = React.useRef<Input>(null)

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const fields = form.getFieldsValue()
    let completed = 0
    const total = 8

    if (fields.name) completed++
    if (fields.description) completed++
    if (fields.basePrice) completed++
    if (fields.category) completed++
    if (fileList.length > 0) completed++
    if (variants.length > 0) completed++
    if (fields.seoTitle) completed++
    if (fields.seoDescription) completed++

    return Math.round((completed / total) * 100)
  }

  // Handle image upload
  const handleImageChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleImagePreview = async (file: UploadFile) => {
    // Preview logic here
  }

  const handleSetPrimaryImage = (uid: string) => {
    setPrimaryImage(uid)
    message.success("Đã đặt làm ảnh chính")
  }

  // Handle variants
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      size: "",
      color: "",
      price: 0,
      stock: 0,
      sku: "",
    }
    setVariants([...variants, newVariant])
  }

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(variants.map((variant) => (variant.id === id ? { ...variant, [field]: value } : variant)))
  }

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter((variant) => variant.id !== id))
    } else {
      message.warning("Phải có ít nhất một biến thể sản phẩm")
    }
  }

  // Handle tags
  const handleTagClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }

  const showTagInput = () => {
    setInputTagVisible(true)
    setTimeout(() => {
      inputTagRef.current?.focus()
    }, 100)
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTagValue(e.target.value)
  }

  const handleTagInputConfirm = () => {
    if (inputTagValue && !tags.includes(inputTagValue)) {
      setTags([...tags, inputTagValue])
    }
    setInputTagVisible(false)
    setInputTagValue("")
  }

  // Form submission
  const onFinish = (values: any) => {
    const productData = {
      ...values,
      images: fileList,
      primaryImage,
      variants,
      tags,
    }
    console.log("Product data:", productData)
    message.success("Sản phẩm đã được tạo thành công!")
  }

  // Upload button
  const uploadButton = (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
      <PlusOutlined className="text-2xl text-gray-400 mb-2" />
      <div className="text-gray-600">Tải ảnh lên</div>
      <div className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (tối đa 2MB)</div>
    </div>
  )

  // Tabs items
  const steps = [
    {
      title: "Thông tin cơ bản",
      icon: <InfoCircleOutlined />,
    },
    {
      title: "Hình ảnh",
      icon: <PictureOutlined />,
    },
    {
      title: "Biến thể & Giá",
      icon: <DollarOutlined />,
    },
    {
      title: "SEO & Hoàn tất",
      icon: <SettingOutlined />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ShoppingOutlined className="text-2xl text-blue-600" />
              <div>
                <Title level={3} className="mb-0">
                  Thêm sản phẩm mới
                </Title>
                <Text type="secondary">Tạo sản phẩm mới cho cửa hàng của bạn</Text>
              </div>
            </div>
            <Space size="middle">
              <div className="text-right">
                <div className="text-sm text-gray-500">Hoàn thành</div>
                <Progress percent={getCompletionPercentage()} size="small" className="w-24" />
              </div>
              <Button icon={<SaveOutlined />} size="large">
                Lưu nháp
              </Button>
              <Button type="primary" icon={<CheckOutlined />} size="large" onClick={() => form.submit()}>
                Xuất bản
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isActive: true,
            trackInventory: true,
            isFeatured: false,
          }}
        >
          <Row gutter={[24, 24]}>
            {/* Main Content */}
            <Col xs={24} lg={16}>
              <div className="space-y-6">
                {/* Basic Information */}
                <Card
                  title={
                    <div className="flex items-center space-x-2">
                      <InfoCircleOutlined className="text-blue-600" />
                      <span>Thông tin cơ bản</span>
                    </div>
                  }
                  className="shadow-sm"
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Form.Item
                        name="name"
                        label={
                          <span className="font-medium">
                            Tên sản phẩm <span className="text-red-500">*</span>
                          </span>
                        }
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                      >
                        <Input placeholder="Nhập tên sản phẩm" size="large" className="rounded-lg" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="shortDescription" label={<span className="font-medium">Mô tả ngắn</span>}>
                        <TextArea
                          rows={3}
                          placeholder="Mô tả ngắn gọn về sản phẩm (hiển thị trong danh sách sản phẩm)"
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="description" label={<span className="font-medium">Mô tả chi tiết</span>}>
                        <TextArea
                          rows={6}
                          placeholder="Mô tả chi tiết về sản phẩm, tính năng, cách sử dụng..."
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                {/* Product Images */}
                <Card
                  title={
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <PictureOutlined className="text-green-600" />
                        <span>Hình ảnh sản phẩm</span>
                        <Badge count={fileList.length} className="ml-2" />
                      </div>
                      <Text type="secondary" className="text-sm">
                        Tối đa 8 ảnh, kích thước tối đa 2MB
                      </Text>
                    </div>
                  }
                  className="shadow-sm"
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleImageChange}
                    className="upload-list-inline"
                    itemRender={(originNode, file) => (
                      <div className="relative group">
                        {originNode}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Space>
                            <Tooltip title={file.uid === primaryImage ? "Ảnh chính" : "Đặt làm ảnh chính"}>
                              <Button
                                type={file.uid === primaryImage ? "primary" : "default"}
                                icon={file.uid === primaryImage ? <StarFilled /> : <StarOutlined />}
                                size="small"
                                shape="circle"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSetPrimaryImage(file.uid)
                                }}
                              />
                            </Tooltip>
                          </Space>
                        </div>
                        {file.uid === primaryImage && (
                          <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center text-xs py-1 rounded-b">
                            Ảnh chính
                          </div>
                        )}
                      </div>
                    )}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Card>

                {/* Product Variants */}
                <Card
                  title={
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <TagsOutlined className="text-purple-600" />
                        <span>Biến thể sản phẩm</span>
                        <Badge count={variants.length} className="ml-2" />
                      </div>
                      <Button type="dashed" onClick={addVariant} icon={<PlusOutlined />}>
                        Thêm biến thể
                      </Button>
                    </div>
                  }
                  className="shadow-sm"
                >
                  <div className="space-y-4">
                    {variants.map((variant, index) => (
                      <div
                        key={variant.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Badge count={index + 1} className="bg-blue-500" />
                            <Text strong>Biến thể #{index + 1}</Text>
                          </div>
                          {variants.length > 1 && (
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() => removeVariant(variant.id)}
                            >
                              Xóa
                            </Button>
                          )}
                        </div>

                        <Row gutter={[16, 16]}>
                          <Col xs={24} sm={12} md={8}>
                            <div>
                              <Text className="font-medium">Kích thước</Text>
                              <Select
                                value={variant.size}
                                onChange={(value) => updateVariant(variant.id, "size", value)}
                                placeholder="Chọn size"
                                className="w-full mt-1"
                                size="large"
                              >
                                <Option value="XS">XS</Option>
                                <Option value="S">S</Option>
                                <Option value="M">M</Option>
                                <Option value="L">L</Option>
                                <Option value="XL">XL</Option>
                                <Option value="XXL">XXL</Option>
                              </Select>
                            </div>
                          </Col>

                          <Col xs={24} sm={12} md={8}>
                            <div>
                              <Text className="font-medium">Màu sắc</Text>
                              <Select
                                value={variant.color}
                                onChange={(value) => updateVariant(variant.id, "color", value)}
                                placeholder="Chọn màu"
                                className="w-full mt-1"
                                size="large"
                              >
                                <Option value="Đỏ">🔴 Đỏ</Option>
                                <Option value="Xanh">🔵 Xanh</Option>
                                <Option value="Vàng">🟡 Vàng</Option>
                                <Option value="Đen">⚫ Đen</Option>
                                <Option value="Trắng">⚪ Trắng</Option>
                                <Option value="Xám">🔘 Xám</Option>
                              </Select>
                            </div>
                          </Col>

                          <Col xs={24} sm={12} md={8}>
                            <div>
                              <Text className="font-medium">Giá (VNĐ)</Text>
                              <InputNumber
                                value={variant.price}
                                onChange={(value) => updateVariant(variant.id, "price", value)}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                                placeholder="0"
                                className="w-full mt-1"
                                size="large"
                              />
                            </div>
                          </Col>

                          <Col xs={24} sm={12} md={8}>
                            <div>
                              <Text className="font-medium">Tồn kho</Text>
                              <InputNumber
                                value={variant.stock}
                                onChange={(value) => updateVariant(variant.id, "stock", value)}
                                placeholder="0"
                                className="w-full mt-1"
                                size="large"
                              />
                            </div>
                          </Col>

                          <Col xs={24} sm={12} md={16}>
                            <div>
                              <Text className="font-medium">SKU</Text>
                              <Input
                                value={variant.sku}
                                onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                                placeholder="SKU-001"
                                className="mt-1"
                                size="large"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* SEO Settings */}
                <Card
                  title={
                    <div className="flex items-center space-x-2">
                      <SettingOutlined className="text-orange-600" />
                      <span>Tối ưu SEO</span>
                    </div>
                  }
                  className="shadow-sm"
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Form.Item name="seoTitle" label={<span className="font-medium">Tiêu đề SEO</span>}>
                        <Input
                          placeholder="Tiêu đề tối ưu cho SEO (tối đa 60 ký tự)"
                          size="large"
                          showCount
                          maxLength={60}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="seoDescription" label={<span className="font-medium">Mô tả SEO</span>}>
                        <TextArea
                          rows={3}
                          placeholder="Mô tả ngắn gọn cho công cụ tìm kiếm"
                          showCount
                          maxLength={160}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="seoKeywords" label={<span className="font-medium">Từ khóa SEO</span>}>
                        <Input placeholder="từ khóa 1, từ khóa 2, từ khóa 3" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>

            {/* Sidebar */}
            <Col xs={24} lg={8}>
              <div className="space-y-6 sticky top-6">
                {/* Quick Actions */}
                <Card title="Hành động nhanh" className="shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Trạng thái</span>
                      <Form.Item name="isActive" valuePropName="checked" className="mb-0">
                        <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                      </Form.Item>
                    </div>
                    <Divider className="my-3" />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Sản phẩm nổi bật</span>
                      <Form.Item name="isFeatured" valuePropName="checked" className="mb-0">
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                      </Form.Item>
                    </div>
                    <Divider className="my-3" />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Theo dõi tồn kho</span>
                      <Form.Item name="trackInventory" valuePropName="checked" className="mb-0">
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                      </Form.Item>
                    </div>
                  </div>
                </Card>

                {/* Pricing */}
                <Card
                  title={
                    <div className="flex items-center space-x-2">
                      <DollarOutlined className="text-green-600" />
                      <span>Giá cả</span>
                    </div>
                  }
                  className="shadow-sm"
                >
                  <div className="space-y-4">
                    <Form.Item
                      name="basePrice"
                      label={
                        <span className="font-medium">
                          Giá gốc (VNĐ) <span className="text-red-500">*</span>
                        </span>
                      }
                      rules={[{ required: true, message: "Vui lòng nhập giá gốc!" }]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                        placeholder="0"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item name="comparePrice" label={<span className="font-medium">Giá so sánh (VNĐ)</span>}>
                      <InputNumber
                        style={{ width: "100%" }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                        placeholder="0"
                        size="large"
                      />
                      <Text type="secondary" className="text-xs">
                        Giá trước khi giảm (nếu có)
                      </Text>
                    </Form.Item>
                  </div>
                </Card>

                {/* Category & Brand */}
                <Card title="Phân loại" className="shadow-sm">
                  <div className="space-y-4">
                    <Form.Item
                      name="category"
                      label={
                        <span className="font-medium">
                          Danh mục <span className="text-red-500">*</span>
                        </span>
                      }
                      rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                    >
                      <Select placeholder="Chọn danh mục" size="large">
                        <Option value="fashion">👗 Thời trang</Option>
                        <Option value="electronics">📱 Điện tử</Option>
                        <Option value="home">🏠 Gia dụng</Option>
                        <Option value="books">📚 Sách</Option>
                        <Option value="sports">⚽ Thể thao</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="brand" label={<span className="font-medium">Thương hiệu</span>}>
                      <Input placeholder="Nhập tên thương hiệu" size="large" />
                    </Form.Item>
                  </div>
                </Card>

                {/* Tags */}
                <Card title="Thẻ tag" className="shadow-sm">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} closable onClose={() => handleTagClose(tag)} className="px-3 py-1 text-sm">
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
                        placeholder="Nhập tag mới"
                      />
                    ) : (
                      <Button type="dashed" onClick={showTagInput} icon={<PlusOutlined />} block>
                        Thêm tag
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Shipping Info */}
                <Card title="Thông tin vận chuyển" className="shadow-sm">
                  <div className="space-y-4">
                    <Form.Item name="weight" label={<span className="font-medium">Cân nặng (kg)</span>}>
                      <InputNumber style={{ width: "100%" }} step={0.1} placeholder="0.0" size="large" />
                    </Form.Item>

                    <div>
                      <Text className="font-medium">Kích thước (cm)</Text>
                      <Row gutter={8} className="mt-2">
                        <Col span={8}>
                          <Form.Item name={["dimensions", "length"]} noStyle>
                            <InputNumber placeholder="Dài" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name={["dimensions", "width"]} noStyle>
                            <InputNumber placeholder="Rộng" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name={["dimensions", "height"]} noStyle>
                            <InputNumber placeholder="Cao" style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>

          {/* Bottom Actions */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Text type="secondary">Hoàn thành: {getCompletionPercentage()}%</Text>
                <Progress percent={getCompletionPercentage()} size="small" className="w-32" />
              </div>
              <Space size="middle">
                <Button icon={<CloseOutlined />} size="large">
                  Hủy
                </Button>
                <Button icon={<SaveOutlined />} size="large">
                  Lưu nháp
                </Button>
                <Button type="primary" htmlType="submit" icon={<CheckOutlined />} size="large">
                  Xuất bản sản phẩm
                </Button>
              </Space>
            </div>
          </div>

          {/* Add bottom padding to prevent content being hidden behind fixed footer */}
          <div className="h-20"></div>
        </Form>
      </div>
    </div>
  )
}

export default DetailSanPham
