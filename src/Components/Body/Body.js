import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "../../React Context API/DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@mui/icons-material";
import SongRow from "./SongRow";

function Body({ webapi, setCurrentTrack, handlePlayPause }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  return (
    <div className="body">
      <Header webapi={webapi} />
      <div className="body__info">
        <img src={discover_weekly?.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilled className="body__shuffle" />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        {Array.isArray(discover_weekly?.tracks?.items) && !!discover_weekly.tracks.items.length && discover_weekly.tracks.items.map((item, index) => (
          <SongRow
            track={item.track}
            key={index}
            handlePlayPause={() => handlePlayPause(item.track)}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
