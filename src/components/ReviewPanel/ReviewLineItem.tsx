import React from "react";
import type { ReviewLine } from "../../types";
import QuantityStepper from "../ProductCard/QuantityStepper";

interface ReviewLineItemProps {
  line: ReviewLine;
  planBillingId?: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ReviewLineItem: React.FC<ReviewLineItemProps> = ({
  line,
  planBillingId,
  onIncrement,
  onDecrement,
}) => {
  const billingSuffix = line.isSubscription ? (planBillingId === "monthly" ? "/mo" : "/yr") : "";

  return (
    <div className="w-full h-auto flex justify-between items-center gap-4">
      <div className="flex-1 h-auto flex justify-between items-center gap-3">
        <div className={`size-10.25 rounded-[5px] ${line.title !== "Cam Unlimited" && "bg-white"} flex justify-center items-center`}>
          <img src={line.image} alt={line.title} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 h-auto">
          <p className="font-medium text-xs md:text-sm text-[#0B0D10] leading-4">
            {
              line.title === "Cam Unlimited" ? <span className="font-bold text-black text-xs md:text-base">Cam <span className="text-[#4E2FD2]">Unlimited</span></span>:<>
              {line.title}
              </>
            }
            
          </p>
        </div>

        {/* No quantity stepper for subscription plan lines */}
        {!line.isSubscription && (
          <QuantityStepper qty={line.qty} onIncrement={onIncrement} onDecrement={onDecrement} theme="dark" />
        )}
      </div>

      <div className="w-fit h-auto flex flex-col justify-between items-center gap-0">
        {line.price !== line.newPrice && (
          <p className="font-medium text-xs md:text-sm leading-4 text-[#6F7882] line-through">
            ${(line.price * line.qty).toFixed(2)}
            {billingSuffix}
          </p>
        )}
        <p className="font-semibold text-xs md:text-sm leading-4 text-[#4E2FD2]">
          ${(line.newPrice * line.qty).toFixed(2)}
          {billingSuffix}
        </p>
      </div>
    </div>
  );
};

export default ReviewLineItem;