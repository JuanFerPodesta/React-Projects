// Libraries
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Detalle from "./components/Detalle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

// Styles
import "./css/app.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  // --- sino lo tengo cuando cargo de 0 no trae nada en favs
  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    console.log(favsInLocal);

    if (favsInLocal) {
      const favsArray = JSON.parse(favsInLocal);
      console.log(favsArray);
      setFavorites(favsArray);
    }
  }, []);
  // ---------------

  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem("favs");

    let tempMoviesInFavs;

    if (!favMovies) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    console.log("temporarias prev:", tempMoviesInFavs);

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h1").innerText;
    const overview = parent.querySelector("p").innerText;

    // key=value --> ahorro
    const movieData = { imgURL, title, overview, id: btn.dataset.movieId };

    // chequeo si esta la peli en favs
    let movieIsInArray = tempMoviesInFavs.find(
      (movie) => movie.id === movieData.id
    );

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log("Se agrego la pelicula a favoritos");
    } else {
      tempMoviesInFavs = tempMoviesInFavs.filter(
        (movie) => movie.id !== movieData.id
      );
      console.log("quedan: ", tempMoviesInFavs);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log("Se elimino la pelicula de favoritos");
    }
  };

  return (
    <>
      <div className="container">
        <Header favorites={favorites} />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route
            path="/listado"
            element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          ></Route>
          <Route path="/detalle" element={<Detalle />}></Route>
          <Route path="/resultados" element={<Resultados />}></Route>
          <Route
            path="/favoritos"
            element={
              <Favoritos
                favorites={favorites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
