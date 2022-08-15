import React, { useEffect, useState } from "react";
import axios from "axios";

// importando sweet alert
import swAlert from "@sweetalert/with-react";

// los usamos en lugar de useHistory
import { Link, Navigate } from "react-router-dom";

const Listado = ({ addOrRemoveFromFavs }) => {
  // addOrRemoveFromFavs("pendorchesku");
  // para que solo me lo permita ver si esta logueado
  const token = sessionStorage.getItem("token");

  const [moviesList, setMoviesList] = useState([]);
  console.log("Listitaje 1", moviesList);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=bd1c5ded5ffa02bb7fec04eb7f79db16&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMoviesList(apiData.results);
      })
      .catch((error) => {
        swAlert(<h2>Error, intenta más tarde</h2>);
      });
  }, [setMoviesList]);

  console.log("Listitaje", moviesList);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="section  row  bg-clear-1">
        {moviesList.map((oneMovie, idx) => {
          const { title, overview, poster_path, id } = oneMovie;
          return (
            <div key={idx} className="bg-accent card border-radius m-1">
              <div className="no-decoration">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt="..."
                  className="card-img"
                />
                <button
                  onClick={addOrRemoveFromFavs}
                  data-movie-id={id}
                  className="favourite-btn"
                >
                  🖤
                </button>
                <div className="card-content pi-1">
                  <h1>{title}</h1>
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
    </>
  );
};

export default Listado;
