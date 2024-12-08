import { createFileRoute, Navigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import styles from '/src/styles/globalStyles.module.css';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';

export const Route = createFileRoute('/(auth)/login')({
	component: Login,
});

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user, setUser, setToken } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
				credentials: 'include',
			});
			const data = await response.json();
			console.log(data);

			if (response.ok) {
				setUser(data);
				setToken(data.access_token);
				alert('Login successful');
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
				<form onSubmit={handleSubmit} className={styles.sectionWrapper}>
					<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">Login</h2>

					<div className={styles.gaps}>
						<InputField label="Email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

						<InputField
							label="Password"
							name="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<Button type="submit">Login</Button>
				</form>
			</div>
		);
	} else {
		return <Navigate to="/" />;
	}
}
