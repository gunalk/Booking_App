import { useAppContext } from "@/contexts/AppContext";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-900 py-6 w-full">
      <div className="container mx-auto flex  justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex ">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <button>Sign out</button>
            </>
          ) : (
            <Link
              to="/signIn"
              className="flex items-center bg-white rounded-md text-blue-900 px-6 py-2 font-bold hover:bg-gray-100 "
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
