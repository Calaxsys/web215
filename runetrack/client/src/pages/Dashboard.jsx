import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const buttonStyles =
    "p-6 bg-white rounded-xl shadow-md cursor-pointer border border-green-300 " +
    "hover:bg-green-200 hover:scale-[1.02] active:scale-95 transition-all";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-4xl font-semibold mb-8 text-green-800">You're logged in!</h1>

      <div className="grid grid-cols-2 gap-6 max-w-md w-full">
        <div
          onClick={() => navigate("/collection")}
          className={buttonStyles}
        >
          <p className="text-xl font-semibold text-center">📜 Collection Log</p>
        </div>

        <div
          onClick={() => navigate("/boss")}
          className={buttonStyles}
        >
          <p className="text-xl font-semibold text-center">⚔️ Boss Killcount</p>
        </div>

        <div
          onClick={() => navigate("/goals")}
          className={`${buttonStyles} col-span-2`}
        >
          <p className="text-xl font-semibold text-center">🎯 Goals</p>
        </div>
      </div>
    </div>
  );
}
