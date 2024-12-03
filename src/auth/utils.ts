import { useQuery } from '@tanstack/react-query';

export async function fetchUserData(token: string) {
	try {
		const response = await fetch('http://localhost:3000/auth/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function updateUser(token: string, userData: any) {
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userData),
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			alert('User updated successfully');
		} else {
			alert(`Error: ${data.message}`);
		}
	} catch (error) {
		alert('Error updating user');
	}
}	


export function useUserData(token: string) {
	return useQuery({
		queryKey: ['user'],
		queryFn: () => fetchUserData(token),
		enabled: !!token,
	});
}

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
		const response = await fetch('http://localhost:3000/auth/logout', {
			method: 'POST',
			credentials: 'include',
		});

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error during sign out:', error);
	}

	// Update the user state in the context to null
	setToken(null);
	setUser(null);
}
