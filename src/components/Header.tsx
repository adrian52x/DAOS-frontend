
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const authContext = useAuth();
  const user = authContext ? authContext.user : null;

  return (
    <header>
      {user ? (
        <div>
          <span>Welcome, {user.name}</span>
        </div>
      ) : (
        <div>
          <span>Please log in</span>
        </div>
      )}
    </header>
  );
};

export default Header;