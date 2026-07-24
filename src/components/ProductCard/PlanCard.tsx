import React from "react";
import { imageMap } from "../../data/imageMap";
import type { ProductItem } from "../../types";

interface PlanCardProps {
  product: ProductItem;
  selectedBillingId: string;
  onSelectBilling: (billingId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ product, selectedBillingId, onSelectBilling }) => {
  if (!product.billingOptions) return null;

  const option =
    product.billingOptions.find((o) => o.id === selectedBillingId) ?? product.billingOptions[0];

  return (
    <div className="w-full h-full p-2.75 border-2 border-solid border-[#4E2FD2B2] bg-white rounded-[10px] flex gap-4.75">
      <div className="w-25.25 h-auto overflow-hidden relative">
        <img
          src={imageMap[product.productImageKey]}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 h-auto flex flex-col gap-2.5">
        <div className="w-full h-auto flex flex-col gap-2">
          <h1 className="font-semibold text-base text-[#1F1F1F] tracking-[0.6px]">{product.title}</h1>
          {product.desc && (
            <p className="font-medium text-xs text-[#1F1F1FBF] tracking-[0.6px]">{product.desc}</p>
          )}
        </div>

        {/* Billing cycle selector replaces quantity stepper for subscriptions */}
        <div className="w-full h-auto flex flex-wrap gap-1.5">
          {product.billingOptions.map((billing) => {
            const isSelected = selectedBillingId === billing.id;
            return (
              <div
                key={billing.id}
                onClick={() => onSelectBilling(billing.id)}
                className={`h-6.5 rounded-xs flex justify-center items-center py-px px-2.5 cursor-pointer transition-colors duration-150 ${
                  isSelected
                    ? "border-[0.5px] border-solid border-[#0AA288] bg-[#1DF0BB0A]"
                    : "border-[0.5px] border-solid border-[#CCCCCC]"
                }`}
              >
                <p className="font-normal text-[10px] text-[#1F1F1F]">{billing.label}</p>
              </div>
            );
          })}
        </div>

        <div className="w-full h-auto flex justify-end gap-2.5">
          <div className="w-fit h-auto flex justify-end items-center gap-0.75">
            <p className="font-normal text-[#D8392B] text-base flex flex-col items-end tracking-[0.6px]">
              <span className="line-through mr-1">${option.price}</span>
              <span className="text-[#575757]">${option.newPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;