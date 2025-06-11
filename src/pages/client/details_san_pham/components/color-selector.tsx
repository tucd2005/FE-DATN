"use client"

interface Color {
  name: string
  value: string
}

interface ColorSelectorProps {
  colors: Color[]
  selectedColor: string
  onColorChange: (color: string) => void
}

export function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Color</h3>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color.name ? "border-gray-800" : "border-gray-300"
            }`}
            style={{ backgroundColor: color.value }}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  )
}
