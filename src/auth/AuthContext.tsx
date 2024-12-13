import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCurrentUserData } from '../hooks/useCurrentUserData';

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
	const { data, isLoading, isSuccess } = useCurrentUserData(cookieToken || '');

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
		} else if (cookieToken && data && isSuccess) {
			setUser(data);
			setToken(cookieToken);
			setLoading(false);
		} else if (!isSuccess) {
			setLoading(false);
		}
	}, [cookieToken, data]);

	return <AuthContext.Provider value={{ user, setUser, loading, setToken, token }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop()?.split(';').shift();
	}
	return null;
}

export async function singOut(setUser: React.Dispatch<React.SetStateAction<any>>, setToken: React.Dispatch<React.SetStateAction<any>>) {
	try {
		await fetch('http://localhost:3000/auth/logout', {
			method: 'POST',
			credentials: 'include',
		});
	} catch (error) {
		console.error('Error during sign out:', error);
	}

	// Update the user state in the context to null
	setToken(null);
	setUser(null);
}
