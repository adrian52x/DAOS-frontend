import { Link } from "@tanstack/react-router";
import { useAuth } from "../auth/AuthContext";
import { singOut } from "../auth/utils";
import { Button } from "./Button";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = user ? (
    <>
      <Link
        to="/"
        className="font-bold text-blue-800"
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/profile"
        className="font-bold text-blue-800"
        onClick={() => setMenuOpen(false)}
      >
        Profile
      </Link>
      <Link
        to="/posts"
        className="font-bold text-blue-800"
        onClick={() => setMenuOpen(false)}
      >
        See posts
      </Link>
      <Button
        variant="secondary"
        onClick={async () => {
          await singOut(setUser);
          setMenuOpen(false); // Close menu after logout
        }}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Link
        to="/"
        className="font-bold text-blue-800"
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/posts"
        className="font-bold text-blue-800"
        onClick={() => setMenuOpen(false)}
      >
        See posts
      </Link>
      <Link to="/login" onClick={() => setMenuOpen(false)}>
        <Button variant="secondary">Login</Button>
      </Link>
      <Link to="/register" onClick={() => setMenuOpen(false)}>
        <Button>Register</Button>
      </Link>
    </>
  );

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md relative">
      {/* Logo Section */}
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

      {/* Burger Icon for Mobile */}
      <div
        className="cursor-pointer sm:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MdMenu className="w-8 h-8 text-black" />
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-[30px] absolute sm:static top-full left-0 right-0 bg-white sm:bg-transparent shadow-md sm:shadow-none p-4 sm:p-0`}
      >
        {links}
      </div>
    </header>
  );
};

export default Header;
