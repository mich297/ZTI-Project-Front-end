import React from "react";
export const userData = {
  username: "",
  role: "",
  conferences: [],
};

export const handleContextUpdate = (username, role, conferences) => {
  userData.username = username;
  userData.role = role;
  userData.conferences = [...conferences];
};

export const DataContext = React.createContext(userData);
