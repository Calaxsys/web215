import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-semibold mb-8">You're logged in!</h1>

      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        <div
          onClick={() => navigate("/collection")}
          className="p-4 bg-white rounded shadow cursor-pointer hover:bg-green-200 transition"
        >
          Collection Log
        </div>

        <div
          onClick={() => navigate("/boss")}
          className="p-4 bg-white rounded shadow cursor-pointer hover:bg-green-200 transition"
        >
          Boss KillCount
        </div>

        <div
          onClick={() => navigate("/goals")}
          className="p-4 bg-white rounded shadow cursor-pointer hover:bg-green-200 transition col-span-2"
        >
          Goals
        </div>
      </div>
    </div>
  );
}

