import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import SubmitRequirements from "./pages/SubmitRequirements.jsx";
import RegisterYourBusiness from "./pages/RegisterYourBusiness.jsx";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/submitRequirement",
    element: <SubmitRequirements />,
  },
  {
    path: "/RegisterBusiness",
    element: <RegisterYourBusiness />,
  },
  {
    path: "/auction",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "auction",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
