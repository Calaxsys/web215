import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate, useOutletContext } from "react-router-dom";

export default function SkillGoalForm() {
  const [form, setForm] = useState({
    goalDescription: "",
    completed: false,
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useOutletContext();

  useEffect(() => {
    document.title = `${isNew ? 'Add' : 'Edit'} Skill Goal - RuneTrack 2.0`;
  }, [isNew]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/skill-goals/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const goal = await response.json();
      if (!goal) {
        console.warn(`Goal with id ${id} not found`);
        navigate("/skill-goals");
        return;
      }
      setForm(goal);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const goal = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/skill-goals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goal),
        });
      } else {
        response = await fetch(`http://localhost:5050/skill-goals/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goal),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ goalDescription: "", completed: false });
      navigate("/skill-goals");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">
        {isNew ? "Add Skill Goal" : "Update Skill Goal"}
      </h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Goal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Set and track your RuneScape skill goals
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label
                htmlFor="goalDescription"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Goal Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    name="goalDescription"
                    id="goalDescription"
                    rows="3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Get 99 Woodcutting"
                    value={form.goalDescription}
                    onChange={(e) => updateForm({ goalDescription: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {!isNew && (
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="completed"
                    checked={form.completed}
                    onChange={(e) => updateForm({ completed: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="completed"
                    className="text-sm font-medium leading-6 text-slate-900"
                  >
                    Mark as completed
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="submit"
          value="Save Goal"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
