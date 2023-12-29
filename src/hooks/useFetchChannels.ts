import { useEffect, useState } from "react";
import { API_URL } from "../config";
import Channel from "../interfaces/channel";

const useFetchChannels = () => {
  const [channels, setChannels] = useState<Channel[] | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await fetch(API_URL + "channels");
      const result = await response.json();
      setChannels(result);
    };
    fetchChannels();
  }, []);

  return channels;
};

export default useFetchChannels;
