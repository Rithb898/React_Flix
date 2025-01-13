import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Menu, Search, X } from "lucide-react";
import { Input } from "./ui/input";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const toggleMenu = () => setOpen(!open);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);
  const navigation = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
    navigation(`/search?q=${searchQuery}`);
  };

  return (
    <>
      <nav className='flex justify-between items-center text-lg md:text-xl font-bold px-2 md:px-10 relative w-full'>
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
      {/* {isSearchVisible && (
        <form
          onSubmit={handleSearchSubmit}
          className='md:right-64 h-8 flex justify-center items-center mt-2'
        >
          <Input
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search...'
            className='w-60 px-3 py-1 text-base h-full'
          />
          <button type='submit' className='bg-blue-500 text-white px-3 h-full'>
            <Search className='w-6 h-6' />
          </button>
        </form>
      )} */}

      {/* <form
        onSubmit={handleSearchSubmit}
        className='fixed top-16 right-0 left-0 mx-auto w-full max-w-lg md:max-w-xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md z-50'
      >
        <div className='flex items-center justify-between'>
          <Input
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search...'
            className='w-full px-4 py-2 text-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-4'
          >
            <Search className='w-6 h-6 inline-block mr-1' />
          </button>
        </div>
      </form> */}

      {/* <div class='flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='Search Something...'
          class='w-full outline-none bg-gray-100 text-gray-600 text-sm px-4 py-2'
        />
        {searchQuery && (
          <button
            type='button'
            onClick={handleSearchSubmit}
            class='flex items-center justify-center bg-[#007bff] px-5'
          >
            <Search />
          </button>
        )}
      </div> */}
    </>
  );
}

export default Navbar;
