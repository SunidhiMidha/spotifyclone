import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import "./Header.css";
import { useDataLayerValue } from "../../React Context API/DataLayer";

function Header() {
  const [{ user }] = useDataLayerValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input placeholder="Search for Artists, Songs, or Albums" type="text" />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
