import "./App.css";
import React from "react";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Protected from "./components/Protected";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./components/Home";

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
        element: <Protected cmp={<Home />} />,
        path: "/home",
      }
    ],
  },
]);

export default appRouter;
