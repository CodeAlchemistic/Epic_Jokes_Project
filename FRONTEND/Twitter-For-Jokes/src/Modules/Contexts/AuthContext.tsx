import { createContext, useContext, useState, useEffect,  type ReactNode } from 'react';

interface User {
    isAuthenticated: boolean;
    userId: number;
    userName: string;
}

interface AuthContextType {
    user: User | null;
    logOut: () => Promise<void>;
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
        <AuthContext.Provider value={{ user, logOut }}>
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
