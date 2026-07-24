import React from "react";
import { ShippingIcon } from "../../icons";
import type { BundleState } from "../../hooks/useBundleState";
import ReviewGroupSection from "./ReviewGroupSection";
import ReviewSummary from "./ReviewSummary";

interface ReviewPanelProps {
  bundle: BundleState;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ bundle }) => {
  return (
    <div className="w-full xl:w-99.75 h-auto pt-3.75 bg-[#EDF4FF] rounded-[10px] sticky top-0">
      <p className="font-medium text-[10px] md:text-xs text-[#484848] px-5 pb-1.25">REVIEW</p>
      <div className="w-full h-auto p-5 pb-7.75">
        <div className="w-full h-auto flex flex-col justify-center gap-13">
          <div className="w-full h-auto flex flex-col gap-2.5">
            <div className="w-full h-auto flex flex-col gap-1.25">
              <p className="font-semibold text-[22px] text-[#1F1F1F] tracking-[0.6px]">
                Your security system
              </p>
              <p className="font-medium text-xs md:text-sm text-[#1F1F1FBF] tracking-[0.6px]">
                Review your personalized protection system designed to keep what matters most safe.
              </p>
            </div>

            <div className="w-full h-auto flex flex-col gap-2.5">
              {bundle.reviewGroups.map((group) => (
                <ReviewGroupSection key={group.category} group={group} bundle={bundle} />
              ))}

              <div className="w-full h-auto border-t border-solid border-[#CED6DE] pt-3.75 flex justify-between items-center gap-4">
                <div className="flex-1 h-auto flex justify-between items-center gap-3">
                  <div className="size-10.25 rounded-[5px] bg-white flex justify-center items-center">
                    <ShippingIcon />
                  </div>
                  <div className="flex-1 h-auto">
                    <p className="font-medium text-xs md:text-sm text-[#0B0D10] leading-4">Fast Shipping</p>
                  </div>
                </div>
                <div className="w-fit h-auto flex flex-col justify-between items-center gap-0">
                  <p className="font-medium text-xs md:text-sm leading-4 text-[#6F7882] line-through">$5.99</p>
                  <p className="font-semibold text-xs md:text-sm leading-4 text-[#4E2FD2]">FREE</p>
                </div>
              </div>
            </div>
          </div>

          <ReviewSummary
            subtotalCompare={bundle.subtotalCompare}
            subtotalActive={bundle.subtotalActive}
            savings={bundle.savings}
            monthlyFinancing={bundle.monthlyFinancing}
            saveMessage={bundle.saveMessage}
            onSaveForLater={bundle.handleSaveForLater}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;