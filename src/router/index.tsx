import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../modules/login";
import List from "../modules/list";
import Form from "../modules/form";

// definicion del router principal dle proyecto
export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "",
                element: <Login />,
              },
              {
                path: "form",
                element: <Form />,
              },
              {
                path: "list",
                element: <List />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
