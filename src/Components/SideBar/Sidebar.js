import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useDataLayerValue } from "../../React Context API/DataLayer";

function Sidebar() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src={require("../../Images/spotify_name_logo.png")}
        alt="Spotify logo"
      />

      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      {Array.isArray(playlists?.items) && !!playlists?.items.length && (
        <>
          <strong className="sidebar__title">PLAYLISTS</strong>
          <hr />
          {/* sunidhi playlists are rendered here.. if any */}
          {playlists?.items?.map((playlist) => (
            <SidebarOption key={playlist.id} title={playlist.name} />
          ))}
        </>
      )}
    </div>
  );
}

export default Sidebar;
