import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <NavLink to="/dashboard" className="font-bold text-xl text-slate-900">
            RuneTrack 2.0
          </NavLink>
          <div className="flex gap-2">
            <NavLink
              to="/collection-log"
              className={({ isActive }) =>
                `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-md px-3 ${
                  isActive
                    ? 'bg-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Collection Log
            </NavLink>
            <NavLink
              to="/skill-goals"
              className={({ isActive }) =>
                `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-md px-3 ${
                  isActive
                    ? 'bg-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Skill Goals
            </NavLink>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-500 text-white hover:bg-red-600 h-9 rounded-md px-3"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}