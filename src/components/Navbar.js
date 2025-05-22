"use client";

import { Menu, MoveRight } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["About", "News", "Services", "Our Team", "Make Enquiry"];

  return (
    <nav className="w-full p-0 md:p-4 fixed z-300 bg-transparent">
      <div className="bg-white w-full mx-auto shadow-sm px-4 md:px-12 py-3 md:flex items-center justify-between">
        {/* Left - Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-black font-medium">
          {navItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-gray-700 transition"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Right - Contact + Mobile Toggle */}
        <div className="flex items-center justify-between gap-4">
          {/* Contact Button */}
          <button className="border border-black bg-[#FFFCFA] px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-black hover:text-white transition cursor-pointer">
            Contact us <MoveRight size={16} />
          </button>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 bg-[#f9f5ef] rounded-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white w-full max-w-7xl mx-auto shadow-sm px-6 py-4 flex flex-col gap-4 text-sm text-black font-medium">
          {navItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-gray-700 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
