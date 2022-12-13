import { useCallback, useState } from 'react'

/**
 * Stores state with local storage, remains after refresh, 
 * if windows object is not available (SSR) will return initialValue 
 * 
 * @param {string} key 
 * @param initialValue 
 */
function useLocalStorage<T>(
    key: string, 
    initialValue: T): [T, (value: T | ((val: T) => T)) => void] {

    const readValue = useCallback((): T => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return initialValue
        }
    }, [key, initialValue]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    /** 
     * Utilizes useState setter function, 
     * wraps the setter to persist in local storage
     * @param value 
     */
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.warn(`Error setting local storage`,error);
        }
    };


    return [storedValue, setValue]
}

export default useLocalStorage

