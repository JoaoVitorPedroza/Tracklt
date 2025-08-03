// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Carregar dados do localStorage ao iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem('trackitUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}