import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get("jwt");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/auth/UserDetails", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error.response?.data || error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
