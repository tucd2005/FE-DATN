import { useState } from "react";

interface ProductTabsProps {
  description: string;
  specifications: {
    size: string;
    style: string;
    material: string;
  };
}

const tabList = [
  { value: "description", label: "Description" },
  { value: "size-guide", label: "Size Guide" },
  { value: "shipping", label: "Shipping" },
  { value: "reviews", label: "Reviews" },
];

export function ProductTabs({ description, specifications }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16 w-full">
      {/* Tabs header */}
      <div className="grid grid-cols-4 border-b">
        {tabList.map((tab) => (
          <button
            key={tab.value}
            className={`py-2 text-center font-medium transition-colors ${
              activeTab === tab.value
                ? "border-b-2 border-red-500 text-red-600 bg-gray-50"
                : "text-gray-600 hover:text-red-500"
            }`}
            onClick={() => setActiveTab(tab.value)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="mt-6">
        {activeTab === "description" && (
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <h4 className="font-medium mb-2">Size</h4>
                <p className="text-gray-600">{specifications.size}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Style</h4>
                <p className="text-gray-600">{specifications.style}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Material</h4>
                <p className="text-gray-600">{specifications.material}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "size-guide" && (
          <p className="text-gray-600">Size guide information would go here.</p>
        )}
        {activeTab === "shipping" && (
          <p className="text-gray-600">Shipping information would go here.</p>
        )}
        {activeTab === "reviews" && (
          <p className="text-gray-600">Customer reviews would go here.</p>
        )}
      </div>
    </div>
  );
}
