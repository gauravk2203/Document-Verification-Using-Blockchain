import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Ensure ReactDOM is imported
import { AuthProvider } from "./Services/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
