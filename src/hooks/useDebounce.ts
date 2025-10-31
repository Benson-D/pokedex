import { useState, useEffect } from "react";

/**
 *
 * A custom React hook that delays updating a value until after a specified delay.
 * Useful for preventing frequent updates from rapidly changing inputs (e.g. search fields, window resizing, etc.).
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debounce, setDebounced] = useState<T>(value);

  useEffect(() => {
    const debounceId = setTimeout(() => setDebounced(value), delay || 800);

    return () => clearTimeout(debounceId);
  }, [value, delay]);

  return debounce;
}

export default useDebounce;
