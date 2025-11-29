import { useEffect, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { API_URL } from "../config";

const SkillGoalItem = (props) => (
  <div className="flex items-center gap-4 p-4 border-b hover:bg-slate-50">
    <input
      type="checkbox"
      checked={props.goal.completed}
      onChange={() => props.toggleComplete(props.goal._id, props.goal.completed)}
      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
    />
    <div className="flex-1">
      <p className={`text-base ${props.goal.completed ? 'line-through text-gray-500' : 'text-amber-400'}`}>
        {props.goal.goalDescription}
      </p>
    </div>
    <div className="flex gap-2">
      <Link
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
        to={`/skill-goals/edit/${props.goal._id}`}
      >
        Edit
      </Link>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
        type="button"
        onClick={() => {
          props.deleteGoal(props.goal._id);
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

export default function SkillGoals() {
  const [goals, setGoals] = useState([]);
  const { isAuthenticated } = useOutletContext();

  useEffect(() => {
    document.title = "Skill Goals - RuneTrack 2.0";
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Fetch skill goals from the database
  useEffect(() => {
    async function getGoals() {
      const response = await fetch(`${API_URL}/skill-goals/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const goals = await response.json();
      setGoals(goals);
    }
    getGoals();
    return;
  }, [goals.length]);

  // Toggle goal completion status
  async function toggleComplete(id, currentStatus) {
    const response = await fetch(`${API_URL}/skill-goals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !currentStatus }),
    });

    if (response.ok) {
      setGoals(goals.map(goal =>
        goal._id === id ? { ...goal, completed: !currentStatus } : goal
      ));
    }
  }

  // Delete a skill goal
  async function deleteGoal(id) {
    await fetch(`${API_URL}/skill-goals/${id}`, {
      method: "DELETE",
    });
    const newGoals = goals.filter((el) => el._id !== id);
    setGoals(newGoals);
  }

  // Separate completed and incomplete goals
  const incompleteGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold p-4">Skill Goals</h3>
        <Link
          to="/skill-goals/add"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-md px-4"
        >
          Add Goal
        </Link>
      </div>

      {/* Active Goals */}
      <div className="border rounded-lg overflow-hidden mb-6 bg-amber-950 text-amber-400">
        <div className="bg-amber-800 p-3 border-b">
          <h4 className="font-semibold text-slate-900">Active Goals ({incompleteGoals.length})</h4>
        </div>
        <div className="relative w-full">
          {incompleteGoals.length === 0 ? (
            <p className="p-4 text-slate-500 text-center">No active goals. Add one to get started!</p>
          ) : (
            incompleteGoals.map((goal) => (
              <SkillGoalItem
                goal={goal}
                toggleComplete={toggleComplete}
                deleteGoal={() => deleteGoal(goal._id)}
                key={goal._id}
              />
            ))
          )}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-slate-100 p-3 border-b">
            <h4 className="font-semibold text-slate-900">Completed ({completedGoals.length})</h4>
          </div>
          <div className="relative w-full">
            {completedGoals.map((goal) => (
              <SkillGoalItem
                goal={goal}
                toggleComplete={toggleComplete}
                deleteGoal={() => deleteGoal(goal._id)}
                key={goal._id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
