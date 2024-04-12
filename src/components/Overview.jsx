import "./Overview.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OffLogo from "../assets/official-logo.png";
import Arrow from "../assets/arrow.svg";
import OverviewCards from "./OverviewCards";
import Data from "../data/data.js";

const Overview = () => {
  const location = useLocation();
  const data = location.state;
  const month = data.month.split(" ")[0];

  const OVdatasetKey = `${data.mainOption}_OverviewData_${month}`;

  const OVData = Data[OVdatasetKey];


  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="official-logo">
        <img src={OffLogo} alt="Official logo" />
        <h2>AIADMK</h2>
      </div>

      <div className="head">
        <div onClick={() => navigate("/home")}>
          <img src={Arrow} alt="Back" />
        </div>
        <h3>{data.mainOption} - Overall</h3>
      </div>
      <OverviewCards data={OVData} />
    </div>
  );
};

export default Overview;
