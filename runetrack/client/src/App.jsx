import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CollectionLog from "./pages/CollectionLog";
import BossKillCount from "./pages/BossKillCount";
import Goals from "./pages/Goals";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collection" element={<CollectionLog />} />
        <Route path="/boss" element={<BossKillCount />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </>
  );
}