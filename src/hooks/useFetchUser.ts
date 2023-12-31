import { useEffect, useState } from "react";
import UserData from "../interfaces/userData";
import { API_URL } from "../config";

const useFetchUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(API_URL + "user_data");
      const result = await response.json();
      setUserData(result);
    };
    fetchUser();
  }, []);

  return userData;
};

export default useFetchUser;
