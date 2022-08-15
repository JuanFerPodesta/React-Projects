import React from "react";

const Genres = ({ generos }) => {
  console.log(typeof generos);
  console.log(generos);

  let genres = [];

  try {
    Object.keys(generos).map((key) => genres.push(generos[key].name));
  } catch (error) {
    console.log(error);
  }

  console.log(genres);

  return (
    <>
      <ul>
        {genres.map((genero, idx) => (
          <li key={idx}>{genero}</li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
