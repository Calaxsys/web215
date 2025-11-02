export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-semibold">You're logged in!</h1>
          <div className="min-h-screen p-6 bg-green-100">
      <h2 className="text-3xl font-bold mb-4">RuneTrack</h2>
      <p>Welcome, web215user!</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Collection Log</div>
        <div className="p-4 bg-white rounded shadow">Boss KillCount</div>
        <div className="p-4 bg-white rounded shadow">Goals</div>
      </div>
    </div>
    </div>

  );
}
