import React from "react";
import { imageMap } from "../../data/imageMap";

interface ReviewSummaryProps {
  subtotalCompare: number;
  subtotalActive: number;
  savings: number;
  monthlyFinancing: string;
  saveMessage: string;
  onSaveForLater: () => void;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  subtotalCompare,
  subtotalActive,
  savings,
  monthlyFinancing,
  saveMessage,
  onSaveForLater,
}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-2">
      <div className="w-full h-auto flex flex-col gap-1">
        <div className="w-full h-auto flex flex-row justify-between gap-4">
          <div className="w-fit h-auto flex justify-between items-center gap-6.25">
            <div className="size-19.5 overflow-hidden flex justify-center items-center">
              <img src={imageMap.Badge} alt="Badge" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="w-fit h-auto flex flex-col justify-between items-end gap-2">
            <div className="w-fit h-auto rounded-[3px] bg-[#4E2FD2] py-1.25 px-2">
              <p className="font-medium text-xs text-white">as low as ${monthlyFinancing}/mo</p>
            </div>
            <div className="flex-1 h-auto flex justify-end items-center gap-2">
              <p className="font-medium text-lg leading-5 text-[#6F7882] line-through">
                ${subtotalCompare.toFixed(2)}
              </p>
              <p className="font-bold text-2xl leading-8 text-[#4E2FD2]">
                ${subtotalActive.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 pt-2.5">
          <p className="text-center font-semibold text-xs text-[#0AA288]">
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
          <button className="w-full h-auto rounded-sm cursor-pointer py-3.25 px-4 bg-[#4E2FD2] font-bold text-[17px] text-white text-center flex justify-center items-center">
            Checkout
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onSaveForLater}
        className="font-normal text-xs md:text-sm text-[#484848] underline italic text-center bg-transparent border-none cursor-pointer"
      >
        Save my system for later
      </button>
      {saveMessage && <p className="text-center font-normal text-xs text-[#0AA288]">{saveMessage}</p>}
    </div>
  );
};

export default ReviewSummary;