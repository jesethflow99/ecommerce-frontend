import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { loginUser,signupUser } from "../../utils";




const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  

  const handleLogin = async (e) =>{
    e.preventDefault()
    try {
      const data = await loginUser({email,password})
      localStorage.setItem('token',data.access_token);
      

      navigate('/');
    }catch (error){
      const errorMessage = error.response?.data?.msg || error.message || "Error desconocido";
      setAlertMessage('Error al iniciar sesion: '+ errorMessage);
      setAlertSeverity('error');
      setAlertOpen(true)
    }
  }

  

  const handleSignUp = async (e) =>{
    e.preventDefault()
    const address = `${street} ${number}, ${neighborhood}, C.P. ${postalCode}`;

    try{
      const data = await signupUser({username,email,password,phone,address})
      const loginData = await loginUser({ email, password });
      localStorage.setItem('token', loginData.access_token); // Guarda el token en localStorage
  
      console.log(data)
      navigate('/')
    }catch(error){
      setAlertMessage('Error en el regstro: ' +data)
      setAlertSeverity("error")
      setAlertOpen(true)
      
    }
    
  }

  const toggleForm = () => {
    setIsFlipped(!isFlipped);
  };
  

  return (
    <StyledWrapper>
      <div className="wrapper">
        {!isFlipped ? (
          // Formulario de Login
          <form className="form" onSubmit={handleLogin}>
            <span className="title">Login</span>
            <div className="input-container">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="gradient-stroke"
                    x1={0}
                    y1={0}
                    x2={24}
                    y2={24}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="black" />
                    <stop offset="100%" stopColor="white" />
                  </linearGradient>
                </defs>
                <g stroke="url(#gradient-stroke)" fill="none" strokeWidth={1}>
                  <path d="M21.6365 5H3L12.2275 12.3636L21.6365 5Z" />
                  <path d="M16.5 11.5L22.5 6.5V17L16.5 11.5Z" />
                  <path d="M8 11.5L2 6.5V17L8 11.5Z" />
                  <path d="M9.5 12.5L2.81805 18.5002H21.6362L15 12.5L12 15L9.5 12.5Z" />
                </g>
              </svg>
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="url(#gradient-stroke)" fill="none" strokeWidth={1}>
                  <path d="M3.5 15.5503L9.20029 9.85L12.3503 13L11.6 13.7503H10.25L9.8 15.1003L8 16.0003L7.55 18.2503L5.5 19.6003H3.5V15.5503Z" />
                  <path d="M16 3.5H11L8.5 6L16 13.5L21 8.5L16 3.5Z" />
                  <path d="M16 10.5L18 8.5L15 5.5H13L12 6.5L16 10.5Z" />
                </g>
              </svg>
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-button">
              <input className="input" type="submit" value="Login" />
            </div>
            <p className="toggle-form" onClick={toggleForm}>
              ¿No tienes cuenta? <span>Regístrate</span>
            </p>
            <div className="texture" />
          </form>
        ) : (
          // Formulario de Registro
          <form className="form" onSubmit={handleSignUp}>
            <span className="title">Registro</span>

            <div className="input-container">
              <input
                className="input"
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                min={10}
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="text"
                placeholder="Calle"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="text"
                placeholder="Número"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="text"
                placeholder="Colonia"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <input
                className="input"
                type="text"
                placeholder="Código Postal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="login-button">
              <input className="input" type="submit" value="Registrarse" />
            </div>

            <p className="toggle-form" onClick={toggleForm}>
              ¿Ya tienes cuenta? <span>Inicia sesión</span>
            </p>

            <div className="texture" />
          </form>
        )}
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wrapper {
    width: 100%;
    height: 100vh;
    display: grid;
    place-content: center;
    background: black;
    z-index: -2;
    overflow: scroll;
  }

  .form {
    padding: 2rem 3rem;
    display: grid;
    place-items: center;
    gap: 1.5rem;
    border: 1px solid transparent;
    border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
    border-width: 0 2px 0px 2px;
    background: radial-gradient(
        100% 61.73% at 100% 50%,
        rgba(255, 224, 166, 0.05) 0%,
        transparent 100%
      ),
      radial-gradient(
        91.09% 56.23% at 0% 50%,
        rgba(255, 224, 166, 0.05) 0%,
        transparent 100%
      );
    position: relative;
    max-width: 400px;
  }
  .form::before,
  .form::after {
    content: "";
    position: absolute;
    border: 1px solid transparent;
    border: inherit;
    z-index: -1;
  }
  .form::before {
    inset: -1rem;
    opacity: 15%;
  }
  .form::after {
    inset: -2rem;
    opacity: 5%;
  }
  .form .title {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: 1rem;
    text-transform: uppercase;
    background: linear-gradient(rgb(170, 170, 170), rgb(78, 78, 78));
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    margin-bottom: 1rem;
  }
  .form .input-container {
    display: flex;
    align-items: center;
    background: radial-gradient(
      47.3% 73.08% at 50% 94.23%,
      rgba(255, 255, 255, 0.1) 5%,
      rgba(0, 0, 0, 0) 100%
    );
    border: 1px solid transparent;
    border-image: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.445) 0%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
    border-width: 0 0 1px 0;
    width: 100%;
  }
  .form .input-container svg {
    stroke: grey;
  }
  .form .input-container svg g {
    transition: all 0.2s ease-in-out;
  }
  .form .input-container .input {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    width: 100%;
  }
  .form .input-container .input:focus {
    outline: none;
    color: #ffe0a6;
  }
  .form .input-container:focus-within {
    background: radial-gradient(
      47.3% 73.08% at 50% 94.23%,
      rgba(255, 224, 166, 0.1) 5%,
      rgba(0, 0, 0, 0) 100%
    );
    border-image: radial-gradient(circle, #ffe0a6 0%, transparent 100%) 1;
  }
  .form .input-container:focus-within svg g {
    stroke: #ffe0a6;
  }
  .form .login-button {
    width: 100%;
    position: relative;
    transition: all 0.2s ease-in-out;
    margin-top: 1rem;
  }
  .form .login-button .input {
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    background: radial-gradient(
        100% 45% at 100% 50%,
        rgba(255, 224, 166, 0.084) 0%,
        rgba(115, 115, 115, 0) 100%
      ),
      radial-gradient(
        100% 45% at 0% 50%,
        rgba(255, 224, 166, 0.084) 0%,
        rgba(115, 115, 115, 0) 100%
      );
    border: 1px solid transparent;
    border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
    border-width: 0 1px 0 1px;
    text-align: center;
    color: #ffe0a6;
    font-size: 1rem;
  }
  .form .login-button::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3764705882) 0.5px,
      transparent 0.5px
    );
    background-size: 0.1px 3px;
    mix-blend-mode: soft-light;
    mask-image: radial-gradient(40% 45% at 100% 50%, white 0%, transparent 100%),
      radial-gradient(40% 45% at 0% 50%, white 0%, transparent 100%);
  }
  .form .login-button:hover {
    animation: flicker 0.5s infinite;
    width: 105%;
  }
  .form .login-button:active {
    width: 95%;
  }
  .form .texture {
    position: absolute;
    background-image: linear-gradient(0deg, #ffffff 1px, transparent 1px);
    background-size: 1px 5px;
    inset: 0;
    mix-blend-mode: soft-light;
    mask-image: radial-gradient(30% 45% at 100% 50%, white 0%, transparent 100%),
      radial-gradient(30% 45% at 0% 50%, white 0%, transparent 100%);
    pointer-events: none;
    animation: movingLines 1s linear infinite;
  }

  .toggle-form {
    color: #aaa;
    font-size: 0.9rem;
    cursor: pointer;
    margin-top: 1rem;
    text-align: center;
  }

  .toggle-form span {
    color: #ffe0a6;
    text-decoration: underline;
    transition: all 0.2s ease;
  }

  .toggle-form span:hover {
    text-decoration: none;
    opacity: 0.8;
  }

  @keyframes flicker {
    0% {
      filter: brightness(100%);
    }
    10% {
      filter: brightness(80%);
    }
    20% {
      filter: brightness(120%);
    }
    30% {
      filter: brightness(90%);
    }
    40% {
      filter: brightness(110%);
    }
    50% {
      filter: brightness(100%);
    }
    60% {
      filter: brightness(85%);
    }
    70% {
      filter: brightness(95%);
    }
    80% {
      filter: brightness(105%);
    }
    90% {
      filter: brightness(115%);
    }
    100% {
      filter: brightness(100%);
    }
  }
  @keyframes movingLines {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 5px;
    }
  }
`;

export default AuthForm;
