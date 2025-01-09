import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className='flex justify-between items-center text-lg md:text-xl font-bold px-4 md:px-10 relative w-full'>
      {/* Logo */}
      <Link to={"/"} className='cursor-pointer' aria-label='Home'>
        <div>RithFlix</div>
      </Link>

      {/* Navigation Links */}
      <div className='flex justify-center items-center gap-5 md:gap-10'>
        <ul className='hidden md:flex flex-row gap-5'>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500"
                : "hover:text-gray-500 transition-colors"
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to={"/movie"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500"
                : "hover:text-gray-500 transition-colors"
            }
          >
            <li>Movie</li>
          </NavLink>
          <NavLink
            to={"/web-series"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500"
                : "hover:text-gray-500 transition-colors"
            }
          >
            <li>Web Series</li>
          </NavLink>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden'
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>

        <ModeToggle />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className='fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-black shadow-md z-50 overflow-y-auto'>
          <ul className='flex flex-col gap-5 p-5'>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors"
              }
              onClick={() => setOpen(false)}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/movie"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors"
              }
              onClick={() => setOpen(false)}
            >
              <li>Movie</li>
            </NavLink>
            <NavLink
              to={"/web-series"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500"
                  : "hover:text-gray-500 transition-colors"
              }
              onClick={() => setOpen(false)}
            >
              <li>Web Series</li>
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
