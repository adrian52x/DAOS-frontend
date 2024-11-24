import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserData, getCookie } from './utils';

interface AuthContextType {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	loading: boolean;
	token: string | null;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const token = getCookie('access_token');
		if (token) {
			fetchUserData(token).then((userData) => {
				if (userData) {
					setUser(userData);
					setToken(token);
				}
				setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, []);

	return <AuthContext.Provider value={{ user, setUser, loading, setToken, token }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	//console.log("context", context);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
