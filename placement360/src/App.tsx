import { BrowserRouter as Router, Routes, Route } from "react-router";
import AuthenticationLayout from "@/components/layouts/AuthLayout";
import ProtectedRoutes from "@/components/layouts/ProtectedRoutes";
import Home from "@/routes/home";
import SigninPage from "@/routes/signin";
import SignupPage from "@/routes/signup";
import { Dashboard } from "@/routes/dashboard";
import About from "@/routes/about";
import Contact from "@/routes/contact";
import Services from "@/routes/services";
import MainLayout from "@/components/layouts/MainLayout";
import AuthHandler from "@/Handlers/AuthHandler";
import { ToasterProvider } from "@/provider/toast-provider";

// New Route Components
import { Generate } from "@/components/Generate";
import { CreateEditPage } from "@/routes/create-edit";
import { MockLoadPage } from "@/routes/mock-load";
import { MockInterviewPage } from "@/routes/mock-interview";
import { Feedback } from "@/routes/feedback";

export default function App() {
  return (
    <Router>
      <ToasterProvider />
      <AuthHandler />
      <Routes>
        {/* public Routes */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Authentication layouts */}
        <Route element={<AuthenticationLayout />}>
           <Route path="/signin/*" element={<SigninPage />} />
           <Route path="/signup/*" element={<SignupPage />} />
        </Route>

        {/* protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route element={<Generate />} path="/generate">
              <Route index element={<Dashboard />} />
              <Route path=":interviewId" element={<CreateEditPage />} />
              <Route path="interview/:interviewId" element={<MockLoadPage />} />
              <Route
                path="interview/:interviewId/start"
                element={<MockInterviewPage />}
              />
              <Route path="feedback/:interviewId" element={<Feedback />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
