import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../assets/icons8-recipe-book-78.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header>
      <nav className="flex w-full font-serif py-2 md:py-3 px-4 md:px-20 items-center justify-between bg-[#D84315]">
        {/* Logo & Title */}
        <div className="text-white text-lg font-bold">
          <Link to="/" className="flex items-center cursor-pointer">
            <img src={Logo} alt="Recipe Logo" className="w-14 " />
            <span className="text-xl text-yellow-300">Recipe</span>{" "}
            <span>Verse</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex text-white gap-8 text-lg">
          <li>
            <Link to="/recipes" className="hover:text-gray-300">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-gray-300">
              Favorites
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden block" onClick={toggleMenu}>
          {open ? (
            <AiOutlineClose className="text-3xl text-white cursor-pointer" />
          ) : (
            <MdMenu className="text-3xl text-white cursor-pointer" />
          )}
        </div>

        {/* Mobile Navigation - Dropdown Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#D84315] flex flex-col items-center justify-center transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button onClick={toggleMenu} className="absolute top-6 right-6">
            <AiOutlineClose className="text-3xl text-white" />
          </button>
          <ul className="text-white text-xl flex flex-col gap-6">
            <li>
              <Link to="/recipes" onClick={toggleMenu}>
                Recipes
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={toggleMenu}>
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
