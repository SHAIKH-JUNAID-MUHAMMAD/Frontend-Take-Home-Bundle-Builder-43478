import React from "react";
import type { ProductItem } from "../../types";
import type { BundleState } from "../../hooks/useBundleState";
import ProductCard from "./ProductCard";
import PlanCard from "./PlanCard";

interface StepProductsGridProps {
  products: ProductItem[];
  bundle: BundleState;
}

const StepProductsGrid: React.FC<StepProductsGridProps> = ({
  products,
  bundle,
}) => {
  const isOdd = products.length % 2 !== 0;
  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-3.75 items-stretch">
      {products.map((product, idx) => {
        const isLast = idx === products.length - 1;
        const spanFull = isOdd && isLast;

        const wrapperClass = spanFull
          ? "md:col-span-2 flex justify-center h-full"
          : "h-full";
        const innerClass = spanFull
          ? "w-full md:w-[calc(50%-0.46875rem)] h-full"
          : "w-full h-full";
        if (product.isSubscription && product.billingOptions) {
          const selectedId =
            bundle.planBilling[product.id] ?? product.billingOptions[0].id;
          return (
            <div
              key={product.id}
              className={wrapperClass}
            >
              <div
                className={innerClass}
              >
                <PlanCard
                  key={product.id}
                  product={product}
                  selectedBillingId={selectedId}
                  onSelectBilling={(billingId) =>
                    bundle.handleBillingSelect(product.id, billingId)
                  }
                />
              </div>
            </div>
          );
        }

        const activeIdx = bundle.activeVariant[product.id] ?? null;
        const qty = bundle.getQty(product.id, activeIdx);

        return (
          <div
            key={product.id}
            className={wrapperClass}
          >
            <div
              className={innerClass}
            >
              <ProductCard
                key={product.id}
                product={product}
                qty={qty}
                activeVariantIdx={activeIdx}
                onIncrement={() =>
                  bundle.handleIncrement(product.id, activeIdx)
                }
                onDecrement={() =>
                  bundle.handleDecrement(product.id, activeIdx)
                }
                onSelectVariant={(idx) =>
                  bundle.handleVariantSelect(product.id, idx)
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProductsGrid;
