import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CollectionLog from "./components/CollectionLog";
import CollectionItemForm from "./components/CollectionItemForm";
import SkillGoals from "./components/SkillGoals";
import SkillGoalForm from "./components/SkillGoalForm";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <CollectionLog />,
      },
      {
        path: "/collection-log",
        element: <CollectionLog />,
      },
      {
        path: "/collection-log/add",
        element: <CollectionItemForm />,
      },
      {
        path: "/collection-log/edit/:id",
        element: <CollectionItemForm />,
      },
      {
        path: "/skill-goals",
        element: <SkillGoals />,
      },
      {
        path: "/skill-goals/add",
        element: <SkillGoalForm />,
      },
      {
        path: "/skill-goals/edit/:id",
        element: <SkillGoalForm />,
      },
      {
        path: "/employees",
        element: <RecordList />,
      },
      {
        path: "/employees/edit/:id",
        element: <Record />,
      },
      {
        path: "/employees/create",
        element: <Record />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);