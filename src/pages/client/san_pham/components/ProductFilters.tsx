import { FilterOutlined, TagsOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { useCategoriesClient } from "../../../../hooks/useCategoryClient";
import { useState, useEffect } from "react";
import { Radio, Spin, Slider, Button, Card, Typography, Space } from "antd";

const { Title, Text } = Typography;

interface ProductFiltersProps {
  selectedCategory: string; // chỉ 1 thay vì mảng
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onResetFilters: () => void;
}

const ProductFilters = ({
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
  onResetFilters,
}: ProductFiltersProps) => {
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesClient();
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);
  


  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceRangeChange(localPriceRange);
    }, 500);
    return () => clearTimeout(timer);
  }, [localPriceRange, onPriceRangeChange]);

  const formatPrice = (price?: number) =>
    typeof price === "number" ? price.toLocaleString("vi-VN") + "đ" : "0đ";

  return (
    <div style={{ width: 300, flexShrink: 0 }}>
      <Card
        title={
          <Space>
            <FilterOutlined />
            <Title level={4} style={{ margin: 0 }}>
              Bộ lọc
            </Title>
          </Space>
        }
        bordered
        style={{ position: "sticky", top: 96 }}
      >
        {/* Categories */}
        <div style={{ marginBottom: 24 }}>
          <Space align="center" style={{ marginBottom: 12 }}>
            <TagsOutlined style={{ color: "#14b8a6" }} />
            <Text strong>Danh mục</Text>
          </Space>
          {categoriesLoading ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <Spin />
            </div>
          ) : (
            <Radio.Group
              onChange={(e) => onCategoryChange(e.target.value)}
              value={selectedCategory}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <Radio value="Tất cả">Tất cả</Radio>
              {categories?.map((category: any) => (
                <Radio key={category.id} value={category.id.toString()}>
                  {category.ten}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: 24 }}>
          <Space align="center" style={{ marginBottom: 12 }}>
            <ThunderboltOutlined style={{ color: "#14b8a6" }} />
            <Text strong>Khoảng giá</Text>
          </Space>

          <Slider
            range
            min={0}
            max={4000000}
            step={100000}
            value={localPriceRange}
            onChange={(val) => setLocalPriceRange(val as [number, number])}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>{formatPrice(localPriceRange[0])}</Text>
            <Text>{formatPrice(localPriceRange[1])}</Text>
          </div>
        </div>

        {/* Reset */}
        <Button block onClick={onResetFilters}>
          Xóa bộ lọc
        </Button>
      </Card>
    </div>
  );
};

export default ProductFilters;
