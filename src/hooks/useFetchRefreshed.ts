import { useCallback, useEffect, useState } from "react";

interface FetchResult<T> {
  object?: T;
  error?: string;
}

function useFetchRefreshed<T>(
  url: string,
  refreshRate?: number,
  token?: string
): FetchResult<T> {
  const [object, setObject] = useState<T | null | undefined>();
  const [error, setError] = useState<string | null | undefined>();

  const fetchObject = useCallback(async () => {
    const options = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    const response = await fetch(url, options);
    if (!response.ok) {
      const text = await response.text();
      console.error(text);
      throw text;
    }
    const result = await response.json();
    return result as T;
  }, [url, token]);

  useEffect(() => {
    fetchObject().then(setObject).catch(setError);
  }, [fetchObject]);

  useEffect(() => {
    if (!refreshRate) {
      return;
    }
    const intervalId = setInterval(async () => {
      fetchObject().then(setObject).catch(setError);
    }, refreshRate);

    return () => clearInterval(intervalId);
  }, [fetchObject, refreshRate]);

  return { object: object ?? undefined, error: error ?? undefined };
}

export default useFetchRefreshed;
