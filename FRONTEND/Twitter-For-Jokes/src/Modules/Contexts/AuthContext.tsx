import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    isAuthenticated: boolean;
    userId: number;
    userName: string;
}

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
            fetch('http://localhost:65451/api/Authentication/this', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((data: User) => {
                setUser(data)
            })


    }, []);

    return (
        <AuthContext.Provider value={{ user, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth musí být použit uvnitř AuthProvideru');
    }
    return context;
};