import React from "react";
import "./Footer.css";
import { Grid, Slider } from "@mui/material";
import {
  PlayCircleOutline,
  SkipPrevious,
  SkipNext,
  PlaylistPlay,
  Shuffle,
  Repeat,
  VolumeDown,
  PauseCircleOutline,
} from "@mui/icons-material";

function Footer({
  currentTrack,
  isPlaying,
  handlePlayPause,
  handleNext,
  handlePrevious
}) {
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          src={currentTrack?.album.images[0]?.url || require("../../Images/footer_placeholder.png")}
          alt=""
          className="footer__albumLogo"
        />
        <div className="footer__songInfo">
          <h4>{currentTrack?.name || "No song playing"}</h4>
          <p>{currentTrack?.artists.map((artist) => artist.name).join(", ") || "No artist"}</p>
        </div>
      </div>
      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious className="footer__icon" onClick={handlePrevious} />
        {isPlaying ? <PauseCircleOutline
          fontSize="large"
          className="footer__icon"
          onClick={() => handlePlayPause(currentTrack)}
        /> : <PlayCircleOutline
          fontSize="large"
          className="footer__icon"
          onClick={() => handlePlayPause(currentTrack)}
        />}
        <SkipNext className="footer__icon" onClick={handleNext} />
        <Repeat className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlay />
          </Grid>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
