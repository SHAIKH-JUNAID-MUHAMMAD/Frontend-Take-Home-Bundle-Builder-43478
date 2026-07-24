import React from "react";
import { Chevron } from "../../icons";
import type { Category, ProductItem } from "../../types";
import type { BundleState } from "../../hooks/useBundleState";
import StepProductsGrid from "../ProductCard/StepProductsGrid";

interface AccordionStepProps {
  index: number;
  title: Category;
  icon: React.ReactNode;
  sIcon: React.ReactNode;
  isActive: boolean;
  isLastStep: boolean;
  nextTitle?: Category;
  products: ProductItem[];
  bundle: BundleState;
  onToggle: () => void;
  onNext: () => void;
}

const AccordionStep: React.FC<AccordionStepProps> = ({
  index,
  title,
  icon,
  sIcon,
  isActive,
  isLastStep,
  nextTitle,
  products,
  bundle,
  onToggle,
  onNext,
}) => {
  const selectedCount = bundle.selectedCountForCategory(title);

  return (
    <div
      className={`w-full h-auto flex flex-col gap-1.25 rounded-[10px] transition-colors duration-300 ${
        isActive ? "bg-[#EDF4FF] pt-3.75" : ""
      }`}
    >
      <p className="font-medium px-3.75 text-[10px] md:text-xs text-[#484848] tracking-[1.6px]">
        STEP {index + 1} of 4
      </p>

      <div
        onClick={onToggle}
        className={`w-full h-auto border-t-[0.5px] ${
          !isActive && "border-b-[0.5px]"
        } border-solid border-[#1F1F1F] py-5 px-3.75 flex justify-between items-center cursor-pointer select-none`}
      >
        <div className="w-fit h-auto flex justify-start items-center gap-2">
          <span className="hidden md:block">
          {icon}
          </span>
          <span className="block md:hidden">
          {sIcon}
          </span>
          <p className="font-semibold text-lg md:text-[22px] text-[#0B0D10]">{title}</p>
        </div>
        <div className="w-fit h-auto flex justify-end items-center gap-2.5">
          {selectedCount >= 1 && (
            <p className="font-medium text-sm text-[#4E2FD2]">{selectedCount} selected</p>
          )}
          <span className={`inline-flex transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"}`}>
            <Chevron />
          </span>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="w-full max-h-500 min-h-0 px-3.75 pb-5">
            <StepProductsGrid products={products} bundle={bundle} />

            {!isLastStep && nextTitle && (
              <div className="w-full h-auto flex justify-center items-center pt-3.75">
                <button
                  onClick={onNext}
                  className="w-auto h-9.75 cursor-pointer rounded-[7px] py-1.25 px-6 border border-solid border-[#4E2FD2] text-[#4E2FD2] font-semibold text-base md:text-lg leading-6"
                >
                  Next: {nextTitle}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionStep;