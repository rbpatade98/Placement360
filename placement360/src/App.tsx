import { BrowserRouter as Router, Routes, Route } from "react-router";
import AuthenticationLayout from "@/components/layouts/AuthLayout";
import ProtectedRoutes from "@/components/layouts/ProtetedRoutes";
import Home from "@/routes/home";
import SigninPage from "@/routes/signin";
import SignupPage from "@/routes/signup";
import Dashboard from "@/routes/dashboard";
import {MainLayout} from "./components/layouts/MainLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* public Routes */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Authentication layouts */}
        <Route element={<AuthenticationLayout />}>
           <Route path="/signin/*" element={<SigninPage />} />
           <Route path="/signup/*" element={<SignupPage />} />
        </Route>

        {/* protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

        {/* all the protected Routes will be declared here */}
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
