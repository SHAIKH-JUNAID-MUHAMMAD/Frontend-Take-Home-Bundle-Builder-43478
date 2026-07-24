import React from "react";
import { imageMap } from "../../data/imageMap";
import type { ProductItem } from "../../types";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";

interface ProductCardProps {
  product: ProductItem;
  qty: number;
  activeVariantIdx: number | null;
  onIncrement: () => void;
  onDecrement: () => void;
  onSelectVariant: (idx: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  qty,
  activeVariantIdx,
  onIncrement,
  onDecrement,
  onSelectVariant,
}) => {
  return (
    <div
      className={`w-full h-full p-2.75 transition-all duration-300 border-2 border-solid ${
        qty >= 1 ? "border-[#4E2FD2B2]" : "border-white"
      } bg-white rounded-[10px] flex justify-between gap-4.75`}
    >
      <div className="w-25.25 overflow-hidden relative">
        {!!product.save && (
          <span className="absolute top-0 left-0 py-0.5 px-1.5 rounded-full bg-[#4E2FD2] flex justify-center items-center">
            <p className="font-semibold text-xs text-white">Save {product.save}%</p>
          </span>
        )}
        <img
          src={imageMap[product.productImageKey]}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 h-auto flex flex-col justify-center gap-2.5">
        <div className="w-full h-auto flex flex-col gap-2">
          <h1 className="font-semibold text-base text-[#1F1F1F] tracking-[0.6px]">{product.title}</h1>
          {product.desc && (
            <p className="font-medium text-xs text-[#1F1F1FBF] tracking-[0.6px]">
              {product.desc}
              <span className="ml-1 text-[#0000EE] underline cursor-pointer">Learn More</span>
            </p>
          )}
        </div>

        <VariantSelector
          variants={product.variants}
          activeIndex={activeVariantIdx}
          onSelect={onSelectVariant}
        />

        <div className="w-full h-auto flex justify-between gap-2.5">
          <QuantityStepper qty={qty} onIncrement={onIncrement} onDecrement={onDecrement} />
          <div className="w-fit h-auto flex justify-end items-center gap-0.75">
            <p className="font-normal text-[#D8392B] text-base flex flex-col tracking-[0.6px]">
              {!!product.save && <span className="line-through">${product.price}</span>}
              <span className="text-[#575757]">${product.newPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;