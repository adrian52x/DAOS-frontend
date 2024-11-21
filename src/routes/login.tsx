
import { createFileRoute, Navigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export const Route = createFileRoute("/login")({
    component: Login,
});

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setUser(data);
                alert('Login successful');

            } else {
                alert(data.message)
            }

        } catch (error) {
            console.error(error);
        }
    };
    
    
    if (!user) {  
        return (  
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />

                <button className="underline" type="submit">Login</button>
            </form>
        );
    } else {
        return <Navigate to="/" />;
    }
};