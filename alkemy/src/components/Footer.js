import React from "react";

const Footer = () => {
  return (
    <footer className="flex bg-dark text-white h-10">
      <nav className="flex jc-c">
        <ul className="no-decoration flex jc-sb ai-c w-100 pi-5">
          <li>
            <a
              href="https://www.alkemy.org/acceleration"
              rel="noopener noreferrer"
              target="_blank"
            >
              Alkemy
            </a>
          </li>
          <li>
            <p>Copyright Alkemy</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
