import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleSignOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className="px-4 py-2 text-md font-semibold">
          HOME
        </NavLink>
      </li>

      <li
        className="relative"
        onMouseEnter={() => setServiceOpen(true)}
        onMouseLeave={() => setServiceOpen(false)}
      >
        <NavLink
          to="/services"
          className="px-4 py-2 text-md font-semibold flex items-center gap-1"
        >
          SERVICES
        </NavLink>
      </li>

      <li>
        <NavLink to="/service-area" className="px-4 py-2 text-md font-semibold">
          SERVICE AREA  
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="px-4 py-2 text-md font-semibold">
          ABOUT
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/profile" className="px-4 py-2 text-md font-semibold">
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink to="/decorator" className="block px-4 py-2 rounded-md font-semibold text-white bg-yellow-500"
>
          DECORATOR
        </NavLink>
      </li>
    </>
  );

  const authLinks = user ? (
    <div className="relative">
      <img
        src={user?.photoURL || "https://i.ibb.co.com/4pQ5tY0/default-user.png"}
        alt="User"
        className="w-10 h-10 rounded-full cursor-pointer border"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />
      <div
        className={`absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg p-3 transition-all duration-200 ${
          dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:group-hover:opacity-100 lg:group-hover:visible`}
      >
        <div className="border-b pb-2 mb-2">
          <p className="font-bold text-gray-600">{user?.displayName}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className="block px-4 py-2 hover:bg-gray-100 rounded-md font-semibold text-gray-600"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md font-semibold text-gray-600"
            >
              Sign Out
            </button>
          </li>
          <li className="px-4 pt-2">
            <input
              type="checkbox"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={theme === "dark"}
              className="toggle"
            />
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <>
      <ul className="flex items-center">
        <li>
          <NavLink to="/login" className="block px-4 py-2 rounded-md font-semibold text-white hover:bg-yellow-500">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className="block px-4 py-2 rounded-md font-semibold text-white hover:bg-yellow-500">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </>
  );

  return (
    <div className="navbar bg-[#062416] text-gray-300 px-2 sm:px-4 py-4 items-center sticky top-0 z-50 shadow">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-2 w-52 p-2 shadow"
          >
            {commonLinks}
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-md font-semibold"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md font-semibold text-gray-600"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <h2 className="text-3xl font-semibold text-white">
          style<span className="text-yellow-500">Decor</span>
        </h2>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{commonLinks}</ul>
      </div>
      <div className="navbar-end flex items-center gap-4">{authLinks}</div>
    </div>
  );
};

export default NavBar;
