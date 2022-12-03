import { useState, useEffect } from "react";

/**
 * Custom Hook allows you to debounce fast changing values, e.c. search bar
 * @param {string} value 
 * @param {number} delay 
 * @returns {string}
 */
function useDebounce(value: string, delay?: number): string {
    const [debounce, setDebounced] = useState<string>(value);

    useEffect(() => {
        const debounceId = setTimeout(() => setDebounced(value), delay || 800);
        return () => clearTimeout(debounceId);
    }, [value])

    return debounce;
};

export default useDebounce;