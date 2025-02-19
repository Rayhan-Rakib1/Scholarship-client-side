import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOutUser = () => {
    signOutUser()
      .then((res) => {
        console.log('Successful sign out');
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
  };

  const links = (
    <>
      <li className="hover:bg-white hover:text-black">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="allScholarship">All Scholarship</Link>
      </li>
      <li>
        <Link to="dashboard/myApplication">dashboard</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-black text-white fixed z-10 bg-opacity-50 max-w-screen-xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Scholarships.com</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">welcome,{user?.displayName || 'User'}</span>
            {/* {user?.photoURL && (
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )} */}
            <Link
              onClick={handleSignOutUser}
              className="btn text-sm"
            >
              LogOut
            </Link>
          </div>
        ) : (
          <Link to="login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
