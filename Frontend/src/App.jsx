import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage.jsx";
import { InstituteLoginPage } from "./Pages/InstituteLogin.jsx";
import { StudentLoginPage } from "./Pages/StudentLogin.jsx";
import { Verifier } from "./Pages/VerificationPage.jsx";
import { InstituteDashboard } from "./Pages/InstituteDashboard.jsx";
import { StudentDashboard } from "./Pages/StudentDashboard.jsx";
import { Vault } from "./Pages/Vault.jsx";
import { ProtectedRoute } from "./Services/ProtectedRoute.jsx";
import "./App.css";

function App() {
  console.log("App is rendering"); 
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/InstituteLogin" element={<InstituteLoginPage />} />
      <Route path="/StudentLogin" element={<StudentLoginPage />} />
      <Route path="/Verify" element={<Verifier />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["institute"]} />}>
        <Route path="/institute-dashboard" element={<InstituteDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/vault" element={<Vault />} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
