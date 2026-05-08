import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import LoaderPage from "@/routes/loaderpage";
import React from "react";

const ProtectedRoutes = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;