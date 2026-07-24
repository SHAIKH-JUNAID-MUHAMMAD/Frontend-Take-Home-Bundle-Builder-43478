import React from "react";
import { DecrementorIcon, DisableDecrementorIcon, IncrementorIcon } from "../../icons";

interface QuantityStepperProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  theme?: "light" | "dark";
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({ qty, onIncrement, onDecrement, theme = "light" }) => {
  return (
    <div className="w-fit h-auto py-1 px-1.5 flex justify-center items-center gap-2.5">
      <button
        type="button"
        onClick={onDecrement}
        disabled={qty === 0}
        className={`flex items-center justify-center ${qty === 0 ? "cursor-not-allowed":"cursor-pointer"}`}
      >
        {qty === 0 ? <DisableDecrementorIcon /> : <DecrementorIcon theme={theme} />}
      </button>
      <p className="font-medium text-sm text-[#0B0D10]">{qty}</p>
      <button type="button" onClick={onIncrement} className="flex cursor-pointer items-center justify-center">
        <IncrementorIcon theme={theme} />
      </button>
    </div>
  );
};

export default QuantityStepper;