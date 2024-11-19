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
        <h1 className="text-red font-header text-3xl font-bold">
          Musik Samspil
        </h1>
        <p className="text-gray-800 font-body text-sm">
          Skabt af DAOS - Dansk Amatørorkester Samvirke
        </p>
      </div>

      <div className="cursor-pointer">
        <MdMenu className="w-8 h-8 text-black" />{" "}
        {/* Material Icon styled with Tailwind */}
      </div>

      {user ? (
        <div className="flex flex-col items-start space-y-2">
          <h3 className="italic">Welcome, {user.name}</h3>
          <Link to="/profile">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Profile
            </button>
          </Link>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={async () => await singOut(setUser)}
          >
            Logout
          </button>
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
