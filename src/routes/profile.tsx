import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../auth/AuthContext';

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return (
        <div>
          <h1>Profile</h1>
          <p>{user.name}</p>
        </div>
    );
}
