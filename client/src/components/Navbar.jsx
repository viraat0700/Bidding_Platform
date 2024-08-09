import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, deleteAccount } from "../store/auth/authSlice";

const navMenu = [
  { title: "Home", url: "/dashboard" },
  { title: "My Auction", url: "#" },
  { title: "Create Auction", url: "/create-auction" },
  { title: "Accounts", url: "#" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const openMenu = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  // User logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await dispatch(deleteAccount(user.email)).unwrap();
        navigate("/");
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-white border-gray-200 sticky top-0 z-50 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/dashboard"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            Kipa Auction
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="relative">
            <button
              id="dropdownUserAvatarButton"
              onClick={openMenu}
              ref={buttonRef}
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
              type="button"
            >
              <span className="sr-only">open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="user photo"
              />
            </button>

            {open && (
              <div
                id="dropdownAvatar"
                ref={dropdownRef}
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0 mt-2"
              >
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div>{user.name}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  {navMenu.map((menu, index) => (
                    <li key={index} onClick={() => setOpen(false)}>
                      <Link
                        to={menu.url}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {menu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="py-2">
                  <Link
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button> */}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            {navMenu.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.url}
                  className="block py-2 px-3 text-gray-900 hover:text-gray-900 rounded md:text-gray-800 md:p-0"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
