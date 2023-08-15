import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setUser(data);
      });
    });
  }, []);

  // if (user) {
  //   axios.get("/profile").then((response) => {response.json()}).then(({ data }) => {
  //     setUser(data);
  //   });
  // }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
