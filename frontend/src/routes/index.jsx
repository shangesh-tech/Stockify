import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"; // Your landing page (without Outlet)
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import StocksAnalysis from "../pages/StocksAnalysis";
import ProtectedRoute from "../components/ProtectedRoute";
import PortfolioTest from "../PortfolioTest";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home page remains separate (no Outlet required)
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/portfolio",
    element: (
      <ProtectedRoute>
        <Layout>
          <Portfolio />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/analysis",
    element: (
      <ProtectedRoute>
        <Layout>
          <StocksAnalysis />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

export default router;
