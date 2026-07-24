import React from "react";
import type { ReviewGroup } from "../../types";
import type { BundleState } from "../../hooks/useBundleState";
import { categoryLabel } from "../../constants/steps";
import ReviewLineItem from "./ReviewLineItem";

interface ReviewGroupSectionProps {
  group: ReviewGroup;
  bundle: BundleState;
}

const ReviewGroupSection: React.FC<ReviewGroupSectionProps> = ({ group, bundle }) => {
  return (
    <div className="w-full h-auto border-t border-solid border-[#CED6DE] pt-3.75 flex flex-col gap-2">
      <p className="font-normal text-xs leading-4 text-[#A8B2BD] uppercase">
        {categoryLabel[group.category]}
      </p>
      <div className="w-full h-auto flex flex-col gap-3">
        {group.lines.map((line) => (
          <ReviewLineItem
            key={`${line.id}-${line.variantIdx}`}
            line={line}
            planBillingId={bundle.planBilling["plan-cam-unlimited"]}
            onIncrement={() => bundle.handleIncrement(line.id, line.variantIdx)}
            onDecrement={() => bundle.handleDecrement(line.id, line.variantIdx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewGroupSection;