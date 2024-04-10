import "./App.css";
import React from "react";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Protected from "./components/Protected";
import Graphs from "./components/Graphs";
import Login from "./pages/Login";
import Overview from "./components/Overview";
import Header from "./components/Header";
import Dates from "./components/Dates";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      {!isLoginPage ? (
        <div className="screen">
          <Header />
          <div className="main">
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <Protected cmp={<App />} />,
    path: "/",
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Protected cmp={<Dates />} />,
        path: "/home",
      },
      {
        element: <Protected cmp={<Overview />} />,
        path: "/overview",
      },
      {
        element: <Protected cmp={<Graphs />} />,
        path: "/graphs",
      },
    ],
  },
]);

export default appRouter;
