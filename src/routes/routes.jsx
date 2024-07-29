import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import TaskDetail from "../pages/TaskDetail";
import ForgotPassword from "../authentication/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Layout></Layout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/task-detail",
        element: <TaskDetail></TaskDetail>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
]);
