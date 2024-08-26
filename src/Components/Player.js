import React, { useState, useRef } from "react";
import "./Player.css";
import Sidebar from "./SideBar/Sidebar";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

function Player({ webapi }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const handlePlayPause = (track) => {
    if (!track?.preview_url) {
      toast.error("Play url not found", {
        autoClose: 2000,
        hideProgressBar: true
      });
      return;
    }
    if(audioRef?.current) {

    if (currentTrack?.id === track.id) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      audioRef.current.src = track.preview_url;
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }
  };

  const handleNext = () => {
    // Implement logic to play the next track
  };

  const handlePrevious = () => {
    // Implement logic to play the previous track
  };

  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body webapi={webapi} setCurrentTrack={setCurrentTrack} handlePlayPause={handlePlayPause} />
      </div>
      <Footer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        audioRef={audioRef}
      />
    </div>
  );
}

export default Player;
