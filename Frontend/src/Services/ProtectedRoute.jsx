import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import Cookies from "js-cookie";
import axios from "axios";

export const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading, setUser } = useContext(AuthContext);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("jwt");

            if (!user && token) {
                try {
                    const response = await axios.get("http://localhost:5000/api/auth/UserDetails", {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true, // Ensures cookies are sent with request
                    });

                    // console.log("User fetched:", response.data);
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }

            setAuthChecked(true);
        };

        checkAuth();
    }, [user, setUser]); // Ensure it runs if `user` changes

    // console.log("Auth Checked:", authChecked, "User:", user);

    // Ensure we wait for authentication check before redirecting
    if (loading || !authChecked) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    // Debugging logs before redirection
    if (!user) {
        console.log("Redirecting to login... User is:", user);
        return <Navigate to={allowedRoles.includes("institute") ? "/InstituteLogin" : "/StudentLogin"} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        console.log("Unauthorized access attempt! Role:", user.role);
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};
