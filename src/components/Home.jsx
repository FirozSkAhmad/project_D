import "./Home.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OffLogo from "../assets/official-logo.png";
import Loader from "./Loader.jsx";
import sharedContext from "../context/SharedContext";

const Home = () => {
  const navigate = useNavigate();
  const { setLoader } = useContext(sharedContext);

  const hiddenFileInput = useRef(null);
  const [filename, setFileName] = useState();
  const [file, setFile] = useState();
  const [selectedMainOption, setselectedMainOption] = useState();
  const token = sessionStorage.getItem("token")

  const onChangeInput = (e) => {
    const { value } = e.target;
    setselectedMainOption(value);
  };

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const uploadDoc = (event) => {
    setFileName(event.target?.files[0]?.name);
    setFile(event.target?.files[0]);
  };

  const uploadFile = (event) => {
    event.preventDefault();
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var formdata = new FormData();
    formdata.append("file", file, filename);
    formdata.append("mainOption", selectedMainOption);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_BASE_URL}/upload/bulkUploadData`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status !== 200) {
          setLoader(false);
          console.log(result.message);
          alert(result.message);
        } else {
          setLoader(false);
          setFile("");
          setFileName("");
          setselectedMainOption("");
          toast.success("Uploaded data successfully");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoader(false);
        toast.error("Error while uploading data");
      });
  };

  const downloadCSVTemplate = () => {
    // Example CSV content
    const csvContent = `Name,Date,Impressions,Clicks,Views,Money Spent`;

    // Create a Blob from the CSV Content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link and set the URL to the blob's URL
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Template_for_uploading_data.csv"); // Set the file name for the download

    // Append to the DOM, trigger the click to download, and then remove the element
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    // Clear filename and file state
    setFileName("");
    setFile("");
    setselectedMainOption("");

    // Reset the file input
    if (hiddenFileInput.current) {
        hiddenFileInput.current.value = "";
    }
  };

  return (
    <>
      <div className="official-logo">
        <img src={OffLogo} alt="Official logo" />
        <h2>AIADMK</h2>
      </div>
      <div className="card_con">
        <div className="uploadCard">
          <Loader />
          <div className="card_name">
            <h2 style={{ fontWeight: "bold" }}>Upload CSV File</h2>
          </div>
          <div className="actions_con">
            <div className="browseFile_con">
              <input
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={(event) => uploadDoc(event)}
                accept=".csv"
              />
              <div className="browseFile_texts" disabled>
                <div className="browseFile_input">
                  {filename ? filename : "Choose file"}
                </div>
                <button className="browse_btn" onClick={handleClick}>
                  Browse files
                </button>
              </div>
            </div>
            <div className="label-select-container">
              <label htmlFor="main_option" style={{ fontWeight: "bold" }}>
                Main Option * :
              </label>
              <select
                name="main_option"
                id="main_option"
                value={selectedMainOption}
                onChange={onChangeInput}
                required
              >
                <option value="">Select Main Option</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Youtube">Youtube</option>
                <option value="Google">Google</option>
                <option value="Programmatic">Programmatic</option>
                <option value="OTT">OTT</option>
              </select>
            </div>

            <div>
              <p
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "blue",
                }}
                onClick={() => downloadCSVTemplate("uploadProducts")}
              >
                Click here to download the CSV template for uploading data.
              </p>
            </div>
            <div className="Btns__container">
              <button onClick={handleClear}>clear</button>
              <button onClick={uploadFile}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
