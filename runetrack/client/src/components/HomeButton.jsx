import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition cursor-pointer"
    >
      ⬅ Back to Dashboard
    </button>
  );
}
