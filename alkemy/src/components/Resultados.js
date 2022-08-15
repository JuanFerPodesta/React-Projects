import React, { useState, useEffect } from "react";
import axios from "axios";

import defaultImage from "../assets/default-image.png";

import { Link, useNavigate, Navigate } from "react-router-dom";

import swAlert from "@sweetalert/with-react";

const Resultados = () => {
  useNavigate();
  let query = new URLSearchParams(window.location.search);
  const token = sessionStorage.getItem("token");

  let keyword = query.get("keyword");

  console.log("desde Resultado", keyword);

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=bd1c5ded5ffa02bb7fec04eb7f79db16&language=en-US&page=1&include_adult=false&query=${keyword}`;
    console.log(endPoint);
    axios
      .get(endPoint)
      .then((response) => {
        const movieData = response.data.results;

        if (movieData.length === 0) {
          swAlert(<h2>Tu busqueda no arrojo resultados</h2>);
        }

        console.log("datos desde rdos: ", movieData);
        setMoviesResults(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword]);

  return (
    <>
      <div className="section bg-clear-1">
        {!token && <Navigate to="/" />}
        <div
          className="flex ai-c

        "
        >
          <h2 className="row-fs bg-clear-1 pi-1">
            {`Buscaste:
            ${keyword}`}
          </h2>
          {moviesResults.length === 0 && (
            <h2
              className="pi-2 ta-right text-bold text-fail
            "
            >
              <em>No hay resultados</em>
            </h2>
          )}
        </div>
        <div className="row bg-clear-1">
          {moviesResults.map((oneMovie, idx) => {
            const { title, overview, poster_path, id } = oneMovie;
            let posterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
            if (posterPath === "https://image.tmdb.org/t/p/w500null") {
              posterPath = defaultImage;
            }
            return (
              <div className="bg-accent card m-1" key={idx}>
                <div className="no-decoration">
                  <img src={posterPath} className="card-img" alt="Poster Img" />
                  <div className="card-content pi-1">
                    <h1 className="">{title}</h1>
                    <p className="">{overview.substring(0, 50)} ...</p>
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
    </>
  );
};

export default Resultados;
