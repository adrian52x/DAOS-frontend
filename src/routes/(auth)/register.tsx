import { createFileRoute, Navigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';
import styles from '/src/styles/globalStyles.module.css';

export const Route = createFileRoute('/(auth)/register')({
	component: Register,
});

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const { user, setUser, setToken } = useAuth();

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
				setToken(data.access_token);
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
			<div className={styles.grayBackground}>
				<form onSubmit={handleSubmit} className={styles.formSectionWrapper}>
					<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl">Register</h2>

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

					<Button type="submit">Register</Button>
				</form>
			</div>
		);
	} else {
		return <Navigate to="/" />;
	}
}
