export type Category =
  | "Choose your cameras"
  | "Choose your plan"
  | "Choose your sensors"
  | "Add extra protection";

export type StepKey = Category | "";

export interface Variant {
  title: string;
  imageKey: string;
}

export interface BillingOption {
  id: string;
  label: string;
  price: number;
  newPrice: number;
}

export interface ProductItem {
  id: string;
  category: Category;
  title: string;
  productImageKey: string;
  desc?: string;
  variants: Variant[];
  price?: number;
  newPrice?: number;
  save?: number;
  isSubscription?: boolean;
  billingOptions?: BillingOption[];
}

export interface SavedConfig {
  quantities: Record<string, number>;
  activeVariant: Record<string, number | null>;
  planBilling: Record<string, string>;
  currentStep: StepKey;
  savedAt: string;
}

export interface ReviewLine {
  id: string;
  title: string;
  image: string;
  variantIdx: number | null;
  qty: number;
  price: number;
  newPrice: number;
  isSubscription?: boolean;
  billingLabel?: string;
}

export interface ReviewGroup {
  category: Category;
  lines: ReviewLine[];
}