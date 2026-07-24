import React from "react";
import { imageMap } from "../../data/imageMap";
import type { Variant } from "../../types";

interface VariantSelectorProps {
  variants: Variant[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, activeIndex, onSelect }) => {
  if (variants.length === 0) return null;

  return (
    <div className="w-full h-auto flex gap-1.5">
      {variants.map((variant, idx) => {
        const isSelected = activeIndex === idx;
        return (
          <div
            key={variant.title}
            onClick={() => onSelect(idx)}
            className={`w-16.25 h-6.5 border-[0.5px] border-solid rounded-xs flex justify-center items-center py-px px-1.25 cursor-pointer transition-colors duration-150 ${
              isSelected
                ? "border-[#0AA288] bg-[#1DF0BB0A]"
                : "border-[#CCCCCC]"
            }`}
          >
            <div className="size-5 overflow-hidden flex justify-center items-center">
              <img src={imageMap[variant.imageKey]} alt={variant.title} className="w-full h-full object-contain" />
            </div>
            <p className="font-medium text-[10px] text-[#1F1F1F]">{variant.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelector;