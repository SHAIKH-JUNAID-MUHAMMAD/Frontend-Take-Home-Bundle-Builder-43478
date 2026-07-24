import { useState } from "react";
import productsData from "../data/products.json";
import { imageMap } from "../data/imageMap";
import { useLocalStorage } from "./useLocalStorage";
import { REVIEW_ORDER, STEP_ORDER } from "../constants/steps";
import type {
  Category,
  ProductItem,
  ReviewGroup,
  SavedConfig,
  StepKey,
} from "../types";

const STORAGE_KEY = "bundle-builder:saved-system";

interface ProductsData {
  products: ProductItem[];
  initialQuantities: Record<string, number>;
  initialBilling: Record<string, string>;
}

const typedProductsData = productsData as ProductsData;

export const allProducts = typedProductsData.products;
const INITIAL_QUANTITIES = typedProductsData.initialQuantities;
const INITIAL_BILLING = typedProductsData.initialBilling;

const variantKey = (id: string, variantIdx: number | null) =>
  `${id}::${variantIdx === null ? "base" : variantIdx}`;

const buildDefaultActiveVariant = (): Record<string, number | null> => {
  const map: Record<string, number | null> = {};
  allProducts.forEach((p) => {
    if (!p.isSubscription) {
      map[p.id] = p.variants.length > 0 ? 0 : null;
    }
  });
  return map;
};

export function useBundleState() {
  const { value: savedConfig, save: persistConfig } = useLocalStorage<SavedConfig | null>(
    STORAGE_KEY,
    null,
  );

  // Seeded directly from the saved config (already read synchronously by
  // useLocalStorage's own initializer), so a returning visitor's saved system
  // is there on the very first render instead of flashing default state.
  const [currentStep, setCurrentStep] = useState<StepKey>(
    () => savedConfig?.currentStep ?? "Choose your cameras",
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => savedConfig?.quantities ?? INITIAL_QUANTITIES,
  );
  const [activeVariant, setActiveVariant] = useState<Record<string, number | null>>(
    () => savedConfig?.activeVariant ?? buildDefaultActiveVariant(),
  );
  const [planBilling, setPlanBilling] = useState<Record<string, string>>(
    () => savedConfig?.planBilling ?? INITIAL_BILLING,
  );
  const [saveMessage, setSaveMessage] = useState<string>("");

  const getQty = (id: string, variantIdx: number | null) =>
    quantities[variantKey(id, variantIdx)] ?? 0;

  const handleIncrement = (id: string, variantIdx: number | null) => {
    const key = variantKey(id, variantIdx);
    setQuantities((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
  };

  const handleDecrement = (id: string, variantIdx: number | null) => {
    const key = variantKey(id, variantIdx);
    setQuantities((prev) => ({ ...prev, [key]: Math.max((prev[key] ?? 0) - 1, 0) }));
  };

  const handleVariantSelect = (id: string, variantIdx: number) => {
    setActiveVariant((prev) => ({ ...prev, [id]: variantIdx }));
  };

  const handleBillingSelect = (id: string, billingId: string) => {
    setPlanBilling((prev) => ({ ...prev, [id]: billingId }));
  };

  const handleStepToggle = (title: Category) => {
    setCurrentStep((prev) => (prev === title ? "" : title));
  };

  const goToNextStep = (current: Category) => {
    const idx = STEP_ORDER.indexOf(current);
    const next = STEP_ORDER[idx + 1];
    if (next) setCurrentStep(next);
  };

  const handleSaveForLater = () => {
    persistConfig({
      quantities,
      activeVariant,
      planBilling,
      currentStep,
      savedAt: new Date().toISOString(),
    });
    setSaveMessage("Your system has been saved!");
    window.setTimeout(() => setSaveMessage(""), 3000);
  };

  const selectedCountForCategory = (category: Category) =>
    allProducts
      .filter((p) => p.category === category)
      .filter((p) => {
        if (p.isSubscription) return true; // plan is always considered selected
        return p.variants.length === 0
          ? getQty(p.id, null) > 0
          : p.variants.some((_, vIdx) => getQty(p.id, vIdx) > 0);
      }).length;

  const reviewGroups: ReviewGroup[] = REVIEW_ORDER.map((category) => {
    const lines: ReviewGroup["lines"] = [];

    allProducts
      .filter((p) => p.category === category)
      .forEach((p) => {
        if (p.isSubscription && p.billingOptions) {
          const selectedId = planBilling[p.id] ?? p.billingOptions[0].id;
          const option = p.billingOptions.find((o) => o.id === selectedId) ?? p.billingOptions[0];
          lines.push({
            id: p.id,
            title: p.title,
            image: imageMap[p.productImageKey],
            variantIdx: null,
            qty: 1,
            price: option.price,
            newPrice: option.newPrice,
            isSubscription: true,
            billingLabel: option.label,
          });
        } else if (p.variants.length === 0) {
          const qty = getQty(p.id, null);
          if (qty > 0) {
            lines.push({
              id: p.id,
              title: p.title,
              image: imageMap[p.productImageKey],
              variantIdx: null,
              qty,
              price: p.price ?? 0,
              newPrice: p.newPrice ?? 0,
            });
          }
        } else {
          p.variants.forEach((variant, vIdx) => {
            const qty = getQty(p.id, vIdx);
            if (qty > 0) {
              lines.push({
                id: p.id,
                title: `${p.title} (${variant.title})`,
                image: imageMap[p.productImageKey],
                variantIdx: vIdx,
                qty,
                price: p.price ?? 0,
                newPrice: p.newPrice ?? 0,
              });
            }
          });
        }
      });

    return { category, lines };
  }).filter((g) => g.lines.length > 0);

  const subtotalCompare = reviewGroups.reduce(
    (sum, g) => sum + g.lines.reduce((s, l) => s + l.price * l.qty, 0),
    0,
  );
  const subtotalActive = reviewGroups.reduce(
    (sum, g) => sum + g.lines.reduce((s, l) => s + l.newPrice * l.qty, 0),
    0,
  );
  const savings = Math.max(subtotalCompare - subtotalActive, 0);
  const monthlyFinancing = subtotalActive > 0 ? (subtotalActive / 12).toFixed(2) : "0.00";

  return {
    currentStep,
    activeVariant,
    planBilling,
    saveMessage,
    getQty,
    handleIncrement,
    handleDecrement,
    handleVariantSelect,
    handleBillingSelect,
    handleStepToggle,
    goToNextStep,
    handleSaveForLater,
    selectedCountForCategory,
    reviewGroups,
    subtotalCompare,
    subtotalActive,
    savings,
    monthlyFinancing,
  };
}

export type BundleState = ReturnType<typeof useBundleState>;