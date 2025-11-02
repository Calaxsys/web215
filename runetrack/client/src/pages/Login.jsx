import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://runetrack.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#6f7165]">
      <h1 className="text-4xl mb-4 font-semibold text-[#dcdeea]">RuneTrack</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <input
          className="border w-full mb-3 p-2 rounded text-lg"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border w-full mb-3 p-2 rounded text-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="bg-[#848588] text-white w-full py-2 rounded hover:bg-[#4e4f58] cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}