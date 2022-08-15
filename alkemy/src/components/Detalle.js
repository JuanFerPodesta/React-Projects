import React, { useEffect, useState } from "react";
import axios from "axios";
import Genres from "./Genres";

import { Navigate } from "react-router-dom";

const Detalle = () => {
  const token = sessionStorage.getItem("token");
  let query = new URLSearchParams(window.location.search);

  // con este ID voy a llamar a la API
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=bd1c5ded5ffa02bb7fec04eb7f79db16&language=en-US`;
    console.log(endPoint);

    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p>cargando ...</p>}
      {movie && (
        <>
          <div className="bg-accent section flex w-100">
            <div className="flex flex-dir-col p-1 w-50">
              <h1 className="fs-500">
                <span className="underline-1 text-bold">Title:</span>{" "}
                {movie.title}
              </h1>

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="poster"
                className="p-1"
              />
            </div>

            <div className="pi-1 flex flex-dir-col p-2">
              <p>
                <span className="underline-1 text-bold">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="underline-1 text-bold">Overview:</span>{" "}
              </p>
              <p className="w-50">{movie.overview}</p>
              <p>
                <span className="underline-1 text-bold">Rating:</span>{" "}
                {movie.vote_average}
              </p>
              <p>
                <span className="underline-1 text-bold">Genres:</span>
                <Genres generos={movie.genres} />
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalle;
