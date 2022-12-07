import { useState, useEffect } from "react";

/**
 * Custom Hook allows you to debounce fast changing values, e.c. search bar
 * 
 */
function useDebounce<T>(value: T, delay?: number): T {
    const [debounce, setDebounced] = useState<T>(value);

    useEffect(() => {
        const debounceId = setTimeout(() => setDebounced(value), delay || 800);
        return () => clearTimeout(debounceId);
    }, [value, delay])

    return debounce;
};

export default useDebounce;