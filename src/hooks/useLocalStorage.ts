import { useState } from "react";

/**
 * Generic localStorage-backed state hook.
 * Falls back to `initialValue` if nothing is saved yet, or if parsing fails.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch (err) {
      console.error(`Failed to read localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  const save = (newValue: T) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(`Failed to write localStorage key "${key}":`, err);
    }
  };

  const clear = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(`Failed to clear localStorage key "${key}":`, err);
    }
  };

  return { value, save, clear };
}