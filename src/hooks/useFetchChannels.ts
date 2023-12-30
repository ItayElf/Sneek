import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config";
import Channel from "../interfaces/channel";

const useFetchChannels = (refreshRate?: number) => {
  const [channels, setChannels] = useState<Channel[] | null>(null);

  const fetchChannels = useCallback(async () => {
    const response = await fetch(API_URL + "channels");
    const result = await response.json();
    return result as Channel[];
  }, []);

  useEffect(() => {
    fetchChannels().then(setChannels);
  }, [fetchChannels]);

  useEffect(() => {
    if (!refreshRate) {
      return;
    }
    const intervalId = setInterval(async () => {
      const newChannels = await fetchChannels();
      setChannels(newChannels);
    }, refreshRate);

    return () => clearInterval(intervalId);
  }, [fetchChannels, refreshRate]);

  return channels;
};

export default useFetchChannels;
