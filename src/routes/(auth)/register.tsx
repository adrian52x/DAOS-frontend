import { createFileRoute, Navigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

export const Route = createFileRoute('/(auth)/register')({
	component: Register,
});

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const { user, setUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
				credentials: 'include',
			});
			const data = await response.json();

			if (response.ok) {
				setUser(data);
				alert('Register successful');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (!user) {
		return (
			<form onSubmit={handleSubmit}>
				<InputField label="Name" name="name" placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} required />

				<InputField label="Email" name="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

				<InputField
					label="Password"
					name="password"
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />

				<Button type="submit">Register</Button>
			</form>
		);
	} else {
		return <Navigate to="/" />;
	}
}
