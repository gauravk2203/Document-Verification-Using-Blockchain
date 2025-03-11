import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import InstituteLogin from "./pages/InstituteLogin.jsx";
import HeroElement from "./components/LandingComponent/LandingComponent.jsx";
import Verifier from "./pages/Verification.jsx";
import InstituteRegistration from "./pages/InstitueRegistration.jsx";
import { InstituteDashboard } from './pages/InstituteDashboard.jsx';
import { StudentDashboard } from "./pages/StudentDashboard.jsx";
import { Vault } from "./pages/Vault.jsx";  // Import Vault Page

function App() {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    }
  }, [userType]);

  return (
    <Router>
      <Routes>
        {/* Wrap all pages that should include the Navbar inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HeroElement />} />
          <Route path="/institute-login" element={<InstituteLogin setUserType={setUserType} />} />
          <Route path="/student-login" element={<StudentLogin setUserType={setUserType} />} />
          <Route path="verify" element={<Verifier />} />
        </Route>

        {/* Standalone page (without Navbar) */}
        <Route path="registration" element={<InstituteRegistration />} />

        {/* Protected Routes */}
        <Route path="/institute-dashboard" element={
          userType === "institute" ? <InstituteDashboard /> : <Navigate to="/institute-login" />
        } />
        
        <Route path="/student-dashboard" element={
          userType === "student" ? <StudentDashboard /> : <Navigate to="/student-login" />
        } />

        {/* Vault Route (Only accessible by students) */}
        <Route path="/vault" element={
          userType === "student" ? <Vault /> : <Navigate to="/student-login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
