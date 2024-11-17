import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie] = useCookies(['access_token']);

    useEffect(() => {
        const token = cookies.access_token;
        console.log("test token", token);
        
        if (token) {
            console.log("token found");
            fetchUserData(token).then(userData => setUser(userData));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function getCookie(key : string) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "a";
  }

const fetchUserData = async (token: string) => {
    try {
        const response = await fetch('http://localhost:3000/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            //credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};