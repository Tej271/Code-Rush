import React from "react";
import Landing from "../Components/Landing";
import { useLocation } from "react-router-dom";

const PlayGround = (props) => {
  const location = useLocation();
  return <Landing file_data={location.state} />;
};

export default PlayGround;
