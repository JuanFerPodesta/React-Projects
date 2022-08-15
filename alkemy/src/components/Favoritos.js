import React from "react";
import { Link, Navigate } from "react-router-dom";

const Favoritos = ({ favorites, addOrRemoveFromFavs }) => {
  const token = sessionStorage.getItem("token");

  return (
    <div className="bg-clear-1 section row-fs">
      {!token && <Navigate to="/" />}
      <h1 className="pi-1 underline-1">Favoritos:</h1>
      {!favorites.length && <h1 className="#">No tenes nada en favoritos</h1>}
      <div className="bg-clear-1 row">
        {favorites.map((oneMovie, idx) => {
          const { title, overview, imgURL, id } = oneMovie;
          return (
            <div className="bg-accent card border-radius m-1" key={idx}>
              <div className="no-decoration">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imgURL}`}
                  className="card-img"
                  alt="..."
                />
                <button
                  className="favourite-btn"
                  onClick={addOrRemoveFromFavs}
                  data-movie-id={id}
                >
                  🖤
                </button>
                <div className="card-content pi-1">
                  <h1 className="#">{title}</h1>
                  <p>{overview.substring(0, 50)} ...</p>
                  <Link
                    to={`/detalle?movieID=${id}`}
                    className="btn bottom pi-1 m-tb-1"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favoritos;
