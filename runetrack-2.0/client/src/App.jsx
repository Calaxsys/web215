import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full p-6 bg-amber-950 text-amber-400 flex flex-col min-h-full">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Outlet context={{ isAuthenticated, onLogin: handleLogin }} />
    </div>
  );
};
export default App
