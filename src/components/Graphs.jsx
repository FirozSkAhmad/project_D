import styles from "./Graphs.module.css";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import Arrow from "../assets/arrow.svg";
import OffLogo from "../assets/official-logo.png";
import Data from "../data/data.js";
import OverviewCards from "./OverviewCards.jsx";

const Graphs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const month = data.month.split(" ")[0];
  let keys;
  let filteredKeys;
  let dataAccToKeys;
  let DIdatasetKey;
  let DCdatasetKey;
  let DCLdatasetKey;
  let DIdata;
  let DCdata;
  let DCLdata;
  let OVdatasetKey;
  let OVData;
  if (["YT_advt_videos", "FB_advt_video"].includes(data?.subOption)) {
    keys = Object.keys(Data).filter((key) => key.includes(`${data.option}`));
    filteredKeys = keys.filter((key) =>
      Data[key]["labels"].some((monthAndDate) => monthAndDate.includes(month))
    );
    dataAccToKeys = {
      DIdata: {
        title: "Daily Impressions",
        backgroundColor: "rgba(98,207,115,0.6)",
        borderColor: "rgba(98,207,115, 1)",
      },
      DCdata: {
        title: "Daily Cost",
        backgroundColor: "rgba(153, 153, 153, 0.6)",
        borderColor: "rgba(153, 153, 153, 1)",
      },
      DCLdata: {
        title: "Daily Clicks",
        backgroundColor: "orange",
        borderColor: "orange",
      },
      DVdata: {
        title: "Daily Views",
        backgroundColor: "rgba(255,255,0,0.6)",
        borderColor: "rgba(255,255,0,1)",
      },
      DRdata: {
        title: "Daily Reach",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    };
  } else {
    DIdatasetKey = `${data.option}_DIdata_${month}`;
    DCdatasetKey = `${data.option}_DCdata_${month}`;
    DCLdatasetKey = `${data.option}_DCLdata_${month}`;
    DIdata = Data[DIdatasetKey];
    DCdata = Data[DCdatasetKey];
    DCLdata = Data[DCLdatasetKey];
    OVdatasetKey = `${data.option}_OverviewData_${month}`;
    OVData = Data[OVdatasetKey];
  }

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
        {data?.subOption === "YT_advt_videos" ||
        data?.subOption === "FB_advt_video" ? (
          filteredKeys.map((key, index) => {
            const matchingKey = Object.keys(dataAccToKeys).find((dataKey) =>
              key.includes(dataKey)
            );
            return (
              <div className={styles.graphCard} key={index}>
                <div className={styles.graphTitleContainer}>
                  <h2 className={styles.graphTitle}>
                    {dataAccToKeys[matchingKey]?.title}
                  </h2>
                  <div
                    className={styles.colorIndicator}
                    style={{
                      backgroundColor: `${dataAccToKeys[matchingKey]?.backgroundColor}`,
                      border: `1px solid ${dataAccToKeys[matchingKey]?.borderColor}`,
                    }}
                  />
                </div>
                <BarGraph
                  data={Data[key]}
                  backgroundColor={dataAccToKeys[matchingKey]?.backgroundColor}
                  borderColor={dataAccToKeys[matchingKey]?.borderColor}
                  option={data?.subOption}
                />
              </div>
            );
          })
        ) : (
          <>
            <div className={styles.graphCard}>
              <div className={styles.graphTitleContainer}>
                <h2 className={styles.graphTitle}>Daily Impressions</h2>
                <div
                  className={styles.colorIndicator}
                  style={{
                    backgroundColor: "rgba(98,207,115,0.6)",
                    border: "1px solid rgba(98,207,115, 1)",
                  }}
                />
              </div>
              <BarGraph data={DIdata} />
            </div>
            <div className={styles.graphCard}>
              <div className={styles.graphTitleContainer}>
                <h2 className={styles.graphTitle}>Daily Clicks</h2>
                <div
                  className={styles.colorIndicator}
                  style={{
                    backgroundColor: "orange",
                    border: "1px solid orange",
                  }}
                />
              </div>
              <LineGraph data={DCLdata} />
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
              <BarGraph data={DCdata} option={data.option} />
            </div>
          </>
        )}
      </div>
      {!["YT_advt_videos", "FB_advt_video"].includes(data?.subOption) ? (
        <OverviewCards data={OVData} />
      ) : null}
    </>
  );
};

export default Graphs;
