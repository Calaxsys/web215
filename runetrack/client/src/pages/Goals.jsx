import HomeButton from "../components/HomeButton";

export default function Goals() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-700">🎯 Goals</h1>
        <p className="text-gray-700">
          Set and track your RuneTrack goals and progress here.
        </p>
        <HomeButton />
      </div>
    </div>
  );
}
