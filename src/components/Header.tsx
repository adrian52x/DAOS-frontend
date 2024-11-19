import { Link } from "@tanstack/react-router";
import { useAuth } from "../auth/AuthContext";
import { singOut } from "../auth/utils";
import { Button } from "./Button";
import { MdMenu } from "react-icons/md";

const Header = () => {
  const { user, setUser } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div>
        <Link to="/" className="font-bold text-blue-800">
          <h1 className="text-red font-header text-3xl font-bold">
            Musik Samspil
          </h1>
        </Link>
        <p className="text-gray-800 font-body text-sm">
          Skabt af DAOS - Dansk Amatørorkester Samvirke
        </p>
      </div>

      <div className="cursor-pointer">
        <MdMenu className="w-8 h-8 text-black" />
      </div>

      {user ? (
        <div className="flex flex-col items-start space-y-2">
          <Link to="/" className="font-bold text-blue-800">
            Home
          </Link>
          <Link to="/profile" className="font-bold text-blue-800">
            Profile
          </Link>
          <Link to="/posts" className="font-bold text-blue-800">
            See posts
          </Link>
          <Button
            variant="secondary"
            onClick={async () => await singOut(setUser)}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-start space-y-2">
          <div>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
