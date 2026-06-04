import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // load user on refresh
  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (token && username) {
      setUser({ username });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);

    setUser({ username: data.username }); // 🔥 instant re-render
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setUser(null); // 🔥 instant re-render
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}