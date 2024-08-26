import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { getTokenFromUrl } from "./Config/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./React Context API/DataLayer";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
const webapi = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      webapi.setAccessToken(_token);
      webapi.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      // webapi.getUserPlaylists().then((playlists) => {
      //     type: "SET_PLAYLISTS",
      //     playlists,
      //   });
      // });
      webapi.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });
    }
  }, []);

  return (
    <div className="App">
      {!!token ? <Home webapi={webapi} /> : <Login />}
      <ToastContainer />
    </div>
  );
}

export default App;