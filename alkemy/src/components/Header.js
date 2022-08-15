import React from "react";
import { Link } from "react-router-dom";

import Buscador from "./Buscador";

const Header = ({ favorites }) => {
  return (
    <header className="flex container ai-c bg-dark text-white letter-spacing-3 capitalize h-10">
      <nav className="flex ai-c w-100 pi-5">
        <div className="w-50">
          <ul
            className="flex jc-fs primary-nav no-decoration underline"
            style={{ "--gap": "4rem" }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listado">Listado</Link>
            </li>
            <li>
              <Link to="/favoritos">Favoritos</Link>
            </li>
            {favorites.length !== 0 && (
              <li>
                <span>Pelis Favoritas: {favorites.length}</span>
              </li>
            )}
          </ul>
        </div>
        <Buscador />
      </nav>
    </header>
  );
};

export default Header;
