export async function fetchUserData(token: string) {
    try {
        const response = await fetch('http://localhost:3000/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
    return null;
};

export async function singOut(setUser: React.Dispatch<React.SetStateAction<any>>) {
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
    setUser(null);
}