
import { Link } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';
import { singOut } from '../auth/utils';


const Header = () => {
    const { user, setUser } = useAuth();



    return (
        <header className="p-4 bg-gray-500">
            {user ? (
                <div className='flex flex-col items-start space-y-2'>
                    <span className='italic'>Welcome, {user.name}</span>
                    <Link to="/profile">
                        <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Profile</button>
                    </Link>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={async () => await singOut(setUser)}>Logout</button>
                </div>
            ) : (
                <div className='flex flex-col items-start space-y-2'>
                    <span>Please log in</span>
                    <div>
                        <Link to="/login">
                            <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Login</button>
                        </Link>
                        <Link to="/register">
                            <button className='ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Register</button>
                        </Link>
                    </div>
                    
                </div>
            )}
        </header>
    );
};

export default Header;