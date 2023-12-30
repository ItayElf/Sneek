import { API_URL } from "../config";
import Message from "../interfaces/message";
import useFetchRefreshed from "./useFetchRefreshed";

const useFetchMessages = (token: string, refreshRate?: number) => {
  return useFetchRefreshed<Message[]>(API_URL + "messages", refreshRate, token);
};

export default useFetchMessages;
