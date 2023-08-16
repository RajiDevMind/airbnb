import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (user) {
        const response = await axios.get("/profile");
        setUser(response.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Data not found:", error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
