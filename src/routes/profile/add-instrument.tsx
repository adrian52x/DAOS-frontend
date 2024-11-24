import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../../auth/AuthContext';
import { instrumentsList, genresList } from '../../types/data';
import { useState } from 'react';


export const Route = createFileRoute('/profile/add-instrument')({
  component: RouteComponent,
})

function RouteComponent() {
    const { user, loading, token } = useAuth();
    const [instrumentName, setInstrumentName] = useState('');
    const [level, setLevel] = useState(0);
    const [genre, setGenre] = useState('');

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newInstrument = {
          name: instrumentName,
          level,
          genre,
        };
    
        const updatedUser = {
          instruments: [...(user.instruments || []), newInstrument],
        };
    
        try {
          const response = await fetch('http://localhost:3000/api/users', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(updatedUser),
            credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
            alert('Instrument added successfully');
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error('Error adding instrument:', error);
          alert('Error adding instrument');
        }
    };
 
    return (
        <div>
            <h1>Add Instrument</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    Instrument Name:
                    <select value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} required>
                    <option value="" disabled>Select an instrument</option>
                    {instrumentsList.map((instrument) => (
                        <option key={instrument} value={instrument}>
                        {instrument}
                        </option>
                    ))}
                    </select>
                </label>
                </div>
                <div>
                <label>
                    Level:
                    <input type="number" min={1} max={5} value={level} onChange={(e) => setLevel(Number(e.target.value))} required />
                </label>
                </div>
                <div>
                <label>
                    Genre:
                    <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
						<option value="" disabled>
							Select a genre
						</option>
						{genresList.map((genre) => (
							<option key={genre} value={genre}>
							    {genre}
							</option>
						))}
					</select>{' '}
                </label>
                </div>
                <button type="submit">Add Instrument</button>
            </form>
        </div>
    );
}
