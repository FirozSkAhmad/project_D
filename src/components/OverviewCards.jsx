import "./OverviewCards.css";
import React from "react";
import EyePie from "../assets/eye-pie.svg";
import Clicks from "../assets/clicks.svg";
import Cost from "../assets/cost.svg";
import Views from "../assets/views.svg";

const OverviewCards = ({ data }) => {
    console.log(data)
  return (
    <div className="data-area">
      <div className="card">
        <div className="data-sec">
          <div className="data-field">
            <p className="data-title">Impressions</p>
            <p className="count">{data.impressions.count}</p>
            <p className="date">{data.impressions.start_end}</p>
          </div>
          <div className="data-type">
            <img src={EyePie} alt="Eye Pie" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="data-sec">
          <div className="data-field">
            <p className="data-title">Clicks</p>
            <p className="count">{data.clicks.count}</p>
            <p className="date">{data.clicks.start_end}</p>
          </div>
          <div className="data-type">
            <img src={Clicks} alt="Clicks" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="data-sec">
          <div className="data-field">
            <p className="data-title">Cost</p>
            <p className="count">{data.cost.count}</p>
            <p className="date">{data.cost.start_end}</p>
          </div>
          <div className="data-type">
            <img src={Cost} alt="Cost" />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="data-sec">
          <div className="data-field">
            <p className="data-title">Views</p>
            <p className="count">{data.views.count}</p>
            <p className="date">{data.views.start_end}</p>
          </div>
          <div className="data-type">
            <img src={Views} alt="Views" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;
