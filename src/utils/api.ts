import { JoinRequestAction, UserDataUpdate, User } from '../types/types';

export async function fetchUserById(userId: string): Promise<User> {
	try {
		const response = await fetch(`http://localhost:3000/api/users/${userId}`);

		if (!response.ok) {
			throw new Error('Failed to fetch user data');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error; // Rethrow to let components handle it
	}
}

export async function fetchCurrentUserData(token: string) {
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

// Update user data ---------------- Good example of how to handle errors
export async function updateUser(token: string, userData: UserDataUpdate) {
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

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

// Fetch all posts by user
export async function fetchAllPostsByUser(userId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/posts/author/${userId}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Fetch all ensembles that the user is member of
export async function fetchAllEnsemblesByUser(userId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/ensembles/member/${userId}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Fetch all ensembles that the user owns
export async function fetchAllEnsemblesUserOwns(token: string) {
	try {
		const response = await fetch('http://localhost:3000/api/ensembles/own', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			credentials: 'include',
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Fetch ensemble by ID
export async function fetchEnsembleById(ensembleId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/ensembles/one/${ensembleId}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Create new post
export async function createNewPost(token: string, post: any) {
	try {
		const response = await fetch('http://localhost:3000/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(post),
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			alert('Post created successfully');
			console.log('Post created:', data);
		} else {
			alert(`Error: ${data.message}`);
		}
	} catch (error) {
		console.error('Error creating post:', error);
		alert('Error creating post');
	}
}

// Fetch post by ID
export async function fetchPostById(postId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
// Join ensemble
export async function handleJoin(token: string, ensembleId: string, postId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/ensembles/join/${ensembleId}/${postId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (response.ok) {
			alert('Request sent successfully');
			console.log(data);
		} else {
			alert(`Error: ${data.message}`);
		}
	} catch (error) {
		console.error('Error :', error);
		alert('Error ');
	}
}

// Accept or reject join request
export async function handleJoinRequest(action: JoinRequestAction, userId: string, token: string, ensembleId: string, postId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/ensembles/${ensembleId}/${postId}/handle-request/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ action }),
			credentials: 'include',
		});
		const data = await response.json();

		if (response.ok) {
			alert('Request handled successfully');
			console.log(data);
			//window.location.reload();
		} else {
			alert(`Error: ${data.message}`);
		}
	} catch (error) {
		console.error('Error handling join request:', error);
	}
}

// Delete an instrument
export async function deleteInstrument(token: string, instrumentData: { name: string; level: number }) {
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				action: 'delete',
				instrumentData, // Contains the name and level of the instrument to delete
			}),
		});

		const data = await response.json();

		if (response.ok) {
			return data; // Return the response data (updated user)
		} else {
			alert(`Error: ${data.message}`);
			throw new Error(data.message);
		}
	} catch (error) {
		console.error('Error deleting instrument:', error);
		throw error;
	}
}

//fetch the posts for a particular ensemble
export async function fetchPostsByEnsembleId(ensembleId: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/posts/ensemble/${ensembleId}`);
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}
		return response.json();
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw error;
	}
}
