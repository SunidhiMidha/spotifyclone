import React from "react";
import "./Login.css";
import { loginUrl } from "../../Config/spotify";

function Login() {
  return (
    <div className="login">
      <img
        src={require("../Images/spotify_name_logo.png")}
        alt="Spotify logo"
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;