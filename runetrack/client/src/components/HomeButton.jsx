import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
    >
      ← Back to Dashboard
    </button>
  );
}
