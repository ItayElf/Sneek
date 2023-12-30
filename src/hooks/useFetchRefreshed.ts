import { useCallback, useEffect, useState } from "react";

function useFetchRefreshed<T>(url: string, refreshRate?: number): T | null {
  const [object, setObject] = useState<T | null>(null);

  const fetchObject = useCallback(async () => {
    const response = await fetch(url);
    const result = await response.json();
    return result as T;
  }, [url]);

  useEffect(() => {
    fetchObject().then(setObject);
  }, [fetchObject]);

  useEffect(() => {
    if (!refreshRate) {
      return;
    }
    const intervalId = setInterval(async () => {
      const newObject = await fetchObject();
      setObject(newObject);
    }, refreshRate);

    return () => clearInterval(intervalId);
  }, [fetchObject, refreshRate]);

  return object;
}

export default useFetchRefreshed;
