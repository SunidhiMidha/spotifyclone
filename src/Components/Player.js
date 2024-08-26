import React, { useState, useRef } from "react";
import "./Player.css";
import Sidebar from "./SideBar/Sidebar";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

function Player({ webapi }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState(null);
  const audioRef = useRef(new Audio());

  const showErrorToast = () => {
    toast.error("Play url not found", {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handlePlayPause = (track) => {
    if (!track?.preview_url) {
      showErrorToast();
      return;
    }
    if (audioRef?.current) {
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
    if (Array.isArray(trackList) && trackList.length) {
      let curr = trackList.findIndex((it) => it?.track?.id == currentTrack?.id);
      let next = 0;
      if (curr != -1 && curr != trackList.length - 1) next = curr + 1;
      let next_item = trackList[next]?.track || null;
      let initial_next = next;
      while (!next_item?.preview_url) {
        if (next == trackList.length - 1) next = 0;
        else next++;

        if (next == initial_next) {
          showErrorToast();
          return;
        }
        next_item = trackList[next]?.track || null;
      }
      audioRef.current.src = next_item?.preview_url;
      audioRef.current.play();
      setCurrentTrack(next_item);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (Array.isArray(trackList) && trackList.length) {
      let curr = trackList.findIndex((it) => it?.track?.id == currentTrack?.id);
      let next = 0;
      if (curr != -1) next = curr - 1;
      else if (curr == 0) next = trackList.length - 1;

      let next_item = trackList[next]?.track || null;
      let initial_next = next;
      while (!next_item?.preview_url) {
        if (next < 0) next = trackList.length - 1;
        else next--;

        if (next == initial_next) {
          showErrorToast();
          return;
        }
        next_item = trackList[next]?.track || null;
      }
      audioRef.current.src = next_item?.preview_url;
      audioRef.current.play();
      setCurrentTrack(next_item);
      setIsPlaying(true);
    }
  };

  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body
          webapi={webapi}
          handlePlayPause={handlePlayPause}
          setTrackList={setTrackList}
        />
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
