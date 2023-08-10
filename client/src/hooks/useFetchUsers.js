import { useState, useEffect } from "react";
import { fetchAllUsers } from "../services/user";

export default function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllUsers();
        setUsers(response?.data?.users.reverse());
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { isLoading, users, setUsers };
}
