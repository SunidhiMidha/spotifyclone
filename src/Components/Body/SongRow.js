import React from "react";
import "./SongRow.css";
import formatDuration from "../../Helpers/Helpers";
import AudioBars from "../../Helpers/AudioBars";
import { FileDownloadOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

function SongRow({ track, index, currentTrack, isPlaying, handlePlayPause }) {
  const { name, album, duration_ms, artists } = track || {};

  let curr = false
  if(currentTrack?.id == track?.id) {
    curr = true;
  }

  const downloadSong = async (e) =>{
    e.preventDefault();
    e.stopPropagation();
    const url = track?.preview_url;
    try {
      if(!url) throw new Error("URL not found.")
      const response = await fetch(url, {
        mode: 'cors'
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = urlObject;
      a.download = track?.name || 'song.mp3';
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      toast.error("Couldn't download file. Please try again later.", {
        autoClose: 2000,
        hideProgressBar: true,
      })
    }
  }

  return (
    <>
      {index == 1 && (
        <>
          <div className="songRow" style={{ paddingBottom: 8 }}>
            <div className="songRow__horizontal">
              <div className="songRow__no">{"#"}</div>
              <div className="songRow__no">{"Title"}</div>
            </div>
            <div
              className="songRow__horizontal"
              style={{ justifyContent: "space-between" }}
            >
              <div className="songRow__info">
                <p>{"Album"}</p>
              </div>
              <div className="songRow__info">
                <p> {"Duration"}</p>
              </div>
            </div>
            <div className="download_icon"/>
          </div>
          <div
            style={{ height: 1, backgroundColor: "#b3b3b3", opacity: 0.5 }}
          />
        </>
      )}

      <div
        className={`songRow`}
        onClick={handlePlayPause}
        key={index + name}
      >
        <div className="songRow__horizontal">
          <div style={{width: 32}}>{!!curr && !!isPlaying ? <AudioBars/> : <div className="songRow__no" style={curr ? {color: "#1ed15e", opacity: 1} : {}}>{index}</div>}</div>
          <img
            src={
              album?.images[0]?.url ||
              require("../../Images/footer_placeholder.png")
            }
            alt=""
            className="songRow__album"
          />
          <div className="songRow__info">
            <h1 style={curr ? {color: "#1ed15e"} : {}}>{name}</h1>
            <p>
              {Array.isArray(artists) &&
                !!artists &&
                artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
        <div
          className="songRow__horizontal"
          style={{ justifyContent: "space-between" }}
        >
          <div className="songRow__info">
            <p>{album?.name}</p>
          </div>
          <div className="songRow__info">
            <p> {formatDuration(duration_ms)}</p>
          </div>
        </div>
        <FileDownloadOutlined className="download_icon" onClick={downloadSong}/>
      </div>
    </>
  );
}

export default SongRow;
