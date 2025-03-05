import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import FetchDocument from "./components/FetchDocument";
import Login from "./pages/Login";
import HeroElement from "./components/LandingComponent/LandingComponent";
import Verifier from "./pages/Verification";
import InstituteRegistration from "./pages/InstitueRegistration";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all pages that should include the Navbar inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HeroElement />} />
          <Route path="login" element={<Login />} />
          <Route path="fetchdocument" element={<FetchDocument />} />
          <Route path="verify" element={<Verifier />} />
        </Route>

        {/* Standalone page (without Navbar) */}
        <Route path="registration" element={<InstituteRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
