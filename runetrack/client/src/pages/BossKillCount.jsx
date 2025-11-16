import HomeButton from "../components/HomeButton";

export default function BossKillCount() {
  return (
<div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-green-700 text-center">
          📜 Boss Killcount
        </h1>

        {/* your content goes here */}

        <HomeButton />
      </div>
    </div>
  );
}
