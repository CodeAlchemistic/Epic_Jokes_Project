import { createContext, useContext, useState, useEffect,  type ReactNode } from 'react';

interface User {
    isAuthenticated: boolean;
    userId: number;
    userName: string;
}

interface AuthContextType {
    user: User | null;
    logOut: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

   const checkAuth = async () => {
        try {
            const res = await fetch('http://localhost:65451/api/Authentication/this', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            const data: User = await res.json();
            setUser(data);
            console.log(data);
        } catch (error) {
            console.error("Chyba při kontrole autorizace", error);
        }
    };

    useEffect(() => {
        checkAuth()
    }, []);


     const logOut = async () => {
        const response = await fetch('http://localhost:65451/api/Authentication/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
            setUser(null);
        }
        else{
            console.error('Unable to log in');
            console.log(response);
        }
    }
    return (
        <AuthContext.Provider value={{ user, logOut, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('error');
    }

    return context;
};
