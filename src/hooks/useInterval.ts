import { useEffect, useRef } from "react";

/**
 * Utilizes setInterval with custom hooks
 * @param callback
 * @param {number} delay
 */
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  //Remembers previous callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
