import { API_URL } from "../config";
import Channel from "../interfaces/channel";
import useFetchRefreshed from "./useFetchRefreshed";

export const useFetchChannels = (refreshRate?: number) => {
  return useFetchRefreshed<Channel[]>(API_URL + "channels", refreshRate);
};

export const useFetchChannel = (channelName: string, refreshRate?: number) => {
  return useFetchRefreshed<Channel>(
    API_URL + "channel/" + channelName,
    refreshRate
  );
};
