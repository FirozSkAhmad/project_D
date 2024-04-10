import styles from "./Graphs.module.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import APBarGraph from "./APBarGraph";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import Arrow from "../assets/arrow.svg";
import OffLogo from "../assets/official-logo.png";
import * as Data from "../data/data.js";
import OverviewCards from "./OverviewCards.jsx";

const Graphs = () => {
  const location = useLocation();
  const data = location.state;
  const month=data.month.split(" ")[0];

  const APdatasetKey = `${data.option}_APGraphsData_${month}`;
  const DIdatasetKey = `${data.option}_DIdata_${month}`;
  const DCdatasetKey = `${data.option}_DCdata_${month}`;
  const DCLdatasetKey = `${data.option}_DCLdata_${month}`;
  const APGraphsData = Data[APdatasetKey];
  const DIdata = Data[DIdatasetKey];
  const DCdata = Data[DCdatasetKey];
  const DCLdata = Data[DCLdatasetKey];

  const OVdatasetKey = `${data.option}_OverviewData_${month}`;

  const OVData = Data[OVdatasetKey];

  const navigate = useNavigate();
  return (
    <>
      <div className="official-logo">
        <img src={OffLogo} alt="Official logo" />
        <h2>AIADMK</h2>
      </div>
      <div className="head">
        <div onClick={() => navigate(-1)}>
          <img src={Arrow} alt="Back" />
        </div>
        <h3>
          {data.mainOption} - {data.option}
        </h3>
      </div>
      <div className={styles.graphsContainer}>
        {APGraphsData &&
          APGraphsData.map((graph, index) => (
            <div key={index} className={styles.graphCard}>
              <div className={styles.graphTitleContainer}>
                <h2 className={styles.graphTitle}>{graph.title}</h2>
                <div
                  className={styles.colorIndicator}
                  style={{
                    backgroundColor: graph.backgroundColor,
                    border: "1px solid rgba(54, 162, 235, 1)",
                  }} // This sets the color of the indicator
                />
              </div>
              <APBarGraph
                data={graph.data}
                backgroundColor={graph.backgroundColor}
                borderColor={graph.borderColor}
              />
            </div>
          ))}
        <div className={styles.graphCard}>
          <div className={styles.graphTitleContainer}>
            <h2 className={styles.graphTitle}>Daily Impressions</h2>
            <div
              className={styles.colorIndicator}
              style={{
                backgroundColor: "rgba(98,207,115,0.6",
                border: "1px solid rgba(98,207,115, 1)",
              }}
            />
          </div>
          <BarGraph data={DIdata} />
        </div>
        <div className={styles.graphCard}>
          <div className={styles.graphTitleContainer}>
            <h2 className={styles.graphTitle}>Daily Cost</h2>
            <div
              className={styles.colorIndicator}
              style={{
                backgroundColor: "orange",
                border: "1px solid orange",
              }}
            />
          </div>
          <LineGraph data={DCLdata}/>
        </div>
        <div className={styles.graphCard}>
          <div className={styles.graphTitleContainer}>
            <h2 className={styles.graphTitle}>Daily Cost</h2>
            <div
              className={styles.colorIndicator}
              style={{
                backgroundColor: "rgba(153, 153, 153, 0.6)",
                border: "1px solid rgba(153, 153, 153, 1)",
              }}
            />
          </div>
          <BarGraph data={DCdata} />
        </div>
      </div>
      <OverviewCards data={OVData} />
    </>
  );
};

export default Graphs;
