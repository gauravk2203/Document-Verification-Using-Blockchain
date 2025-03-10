import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the child routes */}
    </>
  );
}
