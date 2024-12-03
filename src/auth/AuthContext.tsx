import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserData, getCookie } from './utils';

interface AuthContextType {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	loading: boolean;
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [token, setToken] = useState<string>('');
	
	const cookieToken = getCookie('access_token');
	const { data, isLoading, isSuccess } = useUserData(cookieToken || '');
	console.log("data", data);
	

	useEffect(() => {
		if(isLoading) {
			setLoading(true);
		}
        else if (cookieToken && data && isSuccess) {
            setUser(data);
            setToken(cookieToken);
			setLoading(false);
        } else if (!isSuccess) {
			setLoading(false);
		}
    }, [cookieToken, data]);

	// useEffect(() => {
	// 	const token = getCookie('access_token');
	// 	if (token) {
	// 		// fetchUserData(token).then((userData) => {
	// 		// 	if (userData) {
	// 		// 		setUser(userData);
	// 		// 		setToken(token);
	// 		// 	}
	// 		// 	setLoading(false);
	// 		// });
	// 		const { data } = useUserData(token);
	// 		if (data) {
	// 			setUser(data);
	// 			setToken(token);
	// 		}
	// 	} else {
	// 		setLoading(false);
	// 	}
	// }, []);

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
