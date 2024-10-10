import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import { useState } from "react";


const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Prevent scrolling when menu is open
  };

  const handleLinkClick = (href) => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restore body scrolling after click

    const target = document.querySelector(href);
    const headerOffset = 80; // Adjust based on header height
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };


  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img src={headerLogo} alt="Logo"
          width={130}
          height={29} />

        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
            <a
            href={item.href} className="font-montserrat leading-normal text-lg text-slate-gray"
            >
              {item.label}
              
            </a>
            </li>
          ))}
        </ul>


        <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-1 bg-gray-800"></span>
        </div>

        {/* Mobile Menu */}
        <ul className={`lg:hidden absolute top-20 right-0 bg-white shadow-lg p-6 space-y-4 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat text-lg text-slate-gray"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  handleLinkClick(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>




      </nav>
    </header>
  )
}

export default Nav