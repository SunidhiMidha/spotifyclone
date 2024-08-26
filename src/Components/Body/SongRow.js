import React from "react";
import "./SongRow.css";
import formatDuration from "../../Helpers";

function SongRow({ track, index, isPlaying, handlePlayPause }) {
  const { name, album, duration_ms, artists } = track || {};

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
          </div>
          <div
            style={{ height: 1, backgroundColor: "#b3b3b3", opacity: 0.5 }}
          />
        </>
      )}

      <div
        className={`songRow ${isPlaying ? "playing" : ""}`}
        onClick={handlePlayPause}
        key={index + name}
      >
        <div className="songRow__horizontal">
          <div className="songRow__no">{index}</div>
          <img
            src={
              album?.images[0]?.url ||
              require("../../Images/footer_placeholder.png")
            }
            alt=""
            className="songRow__album"
          />
          <div className="songRow__info">
            <h1>{name}</h1>
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
      </div>
    </>
  );
}

export default SongRow;
