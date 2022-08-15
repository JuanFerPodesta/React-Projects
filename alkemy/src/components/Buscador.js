import React from "react";
// importando sweet alert
import swAlert from "@sweetalert/with-react";

import { useNavigate } from "react-router-dom";

const Buscador = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // dentro del currentTargete sigue keyword xq es el name que puse
    // saca espacios de adelante y atras
    const keyword = e.currentTarget.keyword.value.trim();
    console.log(keyword);

    // validando los ingresos
    if (keyword.length === 0) {
      swAlert(<h2>Escribí algo botón</h2>);
    } else if (keyword.length < 3) {
      swAlert(<h2>Escribí más de 3 caracteres</h2>);
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <div className="flex jc-fe ai-c w-50 pi-1 m-tb-1">
      <form onSubmit={submitHandler} className="form">
        <label htmlFor="email" className="pi-1">
          <input type="text" name="keyword" placeholder="Escribe algo..." />
        </label>

        <button type="submit" className="btn">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Buscador;
