import React from "react";
import axios from "axios";

// los usamos en lugar de useHistory
import { useNavigate, Navigate } from "react-router-dom";

// importando sweet alert
import swAlert from "@sweetalert/with-react";

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // bajamos regular expression para testear el mail
    const regexEmail =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (email === "" || password === "") {
      swAlert(<h2>You need to insert a value</h2>);
      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      swAlert(<h2>Insert a valid email</h2>);
      return;
    }

    // solo me toma como valido ese user y esa ps
    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Invalid credentials</h2>);
      return;
    }

    // usando axios
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>Welcome</h2>);
        // busco el token para guardarlo en localStorage
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        //console.log(localStorage.getItem("token"));
        //console.log(localStorage);
        navigate("/listado");
      });
  };
  const token = sessionStorage.getItem("token");
  return (
    <>
      {token && <Navigate to="/listado" />}
      <div className="section bg-accent flex jc-c ai-c">
        <div className="flex flex-dir-col ai-c js-c bg-dark p-2 text-white border-radius">
          <h2 className="ta-c unerline m-tb-1">Formulario de Login</h2>
          <form
            onSubmit={submitHandler}
            className="form flex flow flex-dir-col jc-c ai-sb ta-center "
          >
            <label htmlFor="email">
              <span className="pi-2">Email</span>

              <input type="text" name="email" required />
            </label>

            <label htmlFor="password">
              <span className="pi-1 ">Password</span>
              <input type="password" name="password" required />
            </label>

            <br />
            <div>
              <button type="submit" className="btn">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
