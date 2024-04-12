import "./HomeOverview.css";
import React from "react";
import EyePie from "../assets/eye-pie.svg";
import Clicks from "../assets/clicks.svg";
import Cost from "../assets/cost.svg";
import Views from "../assets/views.svg";

const HomeOverview = ({ data }) => {
  return (
    <div className="data-container">
      <div className="info-card">
        <div className="info-section">
          <div className="info-field">
            <p className="info-title">Impressions</p>
            <p className="info-count">{data.impressions.count}</p>
          </div>
          <div className="info-image">
            <img src={EyePie} alt="Eye Pie" />
          </div>
        </div>
      </div>
      <div className="info-card">
        <div className="info-section">
          <div className="info-field">
            <p className="info-title">Clicks</p>
            <p className="info-count">{data.clicks.count}</p>
          </div>
          <div className="info-image">
            <img src={Clicks} alt="Clicks" />
          </div>
        </div>
      </div>
      <div className="info-card">
        <div className="info-section">
          <div className="info-field">
            <p className="info-title">Cost</p>
            <p className="info-count">{data.cost.count}</p>
          </div>
          <div className="info-image">
            <img src={Cost} alt="Cost" />
          </div>
        </div>
      </div>
      <div className="info-card">
        <div className="info-section">
          <div className="info-field">
            <p className="info-title">Views</p>
            <p className="info-count">{data.views.count}</p>
          </div>
          <div className="info-image">
            <img src={Views} alt="Views" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOverview;
