import "./Dates.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OffLogo from "../assets/official-logo.png";
import HomeOverview from "./HomeOverview.jsx";
import Data from "../data/data.js";

const Dates = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [nestedDropdown, setNestedDropdown] = useState({});
  const [nnDropdown, setNnDropdown] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [recalculateTrigger, setRecalculateTrigger] = useState(false);
  const dropdownRef = useRef(null);

  const datePlatforms = {
    "March 2024": {
      Instagram: [
        "Overview",
        "IG_videos_TNK",
        "IG_Teaser_video",
        "IG_advt_video",
      ],
      Facebook: [
        "Overview",
        "FB_advt_video",
        "FB_teaser_video",
        "FB_banner_ads",
      ],
      Youtube: ["Overview", "YT_advt_videos", "YT_teaser"],
      Programmactic: ["Overview", "PR_advt_videos", "PR_teaser_video"],
      OTT: ["Overview", "OTT_videos", "OTT_teaser"],
      Google: ["Overview", "Google_banner_ads"],
    },
    "April 2024": {
      Facebook: [
        "Overview",
        "FB_advt_video",
        "FB_teaser_video",
        "FB_video",
        "FB_troll_video",
        "FB_banner_ads",
      ],
      Youtube: [
        "Overview",
        "YT_advt_videos",
        "YT_teaser",
        "YT_song",
        "YT_troll_video",
      ],
      Programmactic: ["Overview", "PR_advt_videos", "PR_teaser_video"],
      OTT: ["Overview", "OTT_teaser"],
    },
  };

  const optionPlatforms = {
    "March 2024": {
      FB_advt_video: ["Tailor_Girl", "Workers", "School_girl", "One_tap"],
      YT_advt_videos: [
        "28_March_Company_turn",
        "28_March_Dr._student",
        "28_March_Tailor",
        "28_March_Working",
        "28_March_Hello_Ma",
        "DR_120x600_27_March.png",
        "DR_250x250_27_March.png",
        "DR_300x250_27_March.png",
        "DR_320x50_27_March.png",
        "DR_336x280_27_March.png",
        "DR_468x60_27_March.png",
        "DR_728x90_27_March.png",
        "DRG_120X600.jpg",
        "DRG_160X600.jpg",
        "DRG_300X250.jpg",
        "DRG_320x50.png",
        "DRG_336X280.png",
        "DRG_468X60.png",
        "DRG_728X90.png",
        "EB_120X600.jpg",
        "EB_160X600.jpg",
        "EB_300X250.jpg",
        "EB_320x50.jpg",
        "EB_336X280.jpg",
        "EB_728x90.jpg",
        "FL_120X600.jpg",
        "FL_160X600.jpg",
        "FL_300X250.jpg",
        "FL_320x50.jpg",
        "FL_336X280.jpg",
        "FL_728x90.jpg",
        "Kaveri_120X600.png",
        "Kaveri_160X600.png",
        "Kaveri_200X200.png",
        "Kaveri_250X250.png",
        "Kaveri_300X250.png",
        "Kaveri_320x50.png",
        "Kaveri_336X280.png",
        "Kaveri_468X60.png",
        "Kaveri_728x90.png",
        "KV_120x600_27_March.png",
        "KV_160x600_27_March.png",
        "KV_250x250_27_March.png",
        "KV_300x250_27_March.png",
        "KV_320x50_27_March.png",
        "KV_336x280_27_March.png",
        "KV_468x60_27_March.png",
        "KV_728x90_27_March.png",
        "LO_120X600.jpg",
        "LO_160X600.jpg",
        "LO_250x250_27_March.png",
        "LO_300X250.jpg",
        "LO_300x250_27_March.png",
        "LO_320x50.png",
        "LO_336X280.png",
        "LO_336x280_27_March.png",
        "LO_468x60_27_March.png",
        "LO_728x90.jpg",
        "PP1",
        "TH_120x600_27_March.png",
        "TH_160x600_27_March.png",
        "TH_250x250_27_March.png",
        "TH_300x250_27_March.png",
        "TH_320x50_27_March.png",
        "TH_336x280_27_March.png",
        "TH_468x60_27_March.png",
        "TH_728x90_27_March.png",
        "TT3",
        "Video_1",
        "VL_120x600_27_March.png",
        "VL_160x600_27_March.png",
        "VL_250x250_27_March.png",
        "VL_300x250_27_March.png",
        "VL_320x50_27_March.png",
        "VL_336x280_27_March.png",
        "VL_468x60_27_March.png",
        "VL_728x90_27_March.png",
      ],
    },
    "April 2024": {
      FB_advt_video: [
        "Barber_shop",
        "30000_Crores",
        "School_girl",
        "Tailor_Girl",
        "Lady_doctor",
        "Double_leaf",
        "Workers",
        "Children",
        "7.5%",
      ],
      YT_advt_videos: [
        "28_March_Company_turn",
        "28_March_Dr_student",
        "28_March_Tailor",
        "28_March_Working",
        "28_March_Hello_Ma",
        "double_leaf",
        "Barbar_Shop",
        "Main_Song",
        "Troll_Song",
        "Santosh_srinivasan",
      ],
    },
  };

  const calculateTotalDropdownHeight = () => {
    // Get the initial height of the main dropdown
    let mainDropdownHeight = dropdownRef.current
      ? dropdownRef.current.offsetHeight
      : 0;

    let extraHeight = 0;

    // Iterate over nested dropdowns and add their exceeding height
    Object.keys(nestedDropdown).forEach((key) => {
      if (nestedDropdown[key]) {
        const nestedDropdownEl = document.getElementById(
          `nested-dropdown-${key}`
        );
        if (nestedDropdownEl) {
          const nestedRect = nestedDropdownEl.getBoundingClientRect();
          const mainRect = dropdownRef.current.getBoundingClientRect();
          // Calculate if the nested dropdown exceeds the main dropdown
          const heightExcess = Math.max(0, nestedRect.bottom - mainRect.bottom);
          extraHeight += heightExcess;
        }
      }
    });

    // Iterate over nn-dropdowns and add their exceeding height
    Object.keys(nnDropdown).forEach((key) => {
      if (nnDropdown[key]) {
        const nnDropdownEl = document.getElementById(`nn-dropdown-${key}`);
        if (nnDropdownEl) {
          const nnRect = nnDropdownEl.getBoundingClientRect();
          const mainRect = dropdownRef.current.getBoundingClientRect();
          // Calculate if the nn-dropdown exceeds the main dropdown
          const heightExcess = Math.max(0, nnRect.bottom - mainRect.bottom);
          extraHeight += heightExcess;
        }
      }
    });

    // Total height is the main dropdown height plus any additional required height
    return mainDropdownHeight + extraHeight;
  };

  const toggleDropdown = (date) => {
    setSelectedDate(date);
    setDropdownVisible((prev) => !prev);
    // Close all nested and nnDropdowns when toggling main dropdown
    setNestedDropdown({});
    setNnDropdown({});
  };

  // Use this function to toggle nested dropdowns
  const toggleNestedDropdown = (platform, e) => {
    e.stopPropagation();
    setNestedDropdown((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
    // Set the trigger for recalculation
    setRecalculateTrigger((prev) => !prev);
  };

  // Use this function to toggle nn-dropdowns
  const toggleNnDropdown = (option, e) => {
    e.stopPropagation();
    setNnDropdown((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
    // Set the trigger for recalculation
    setRecalculateTrigger((prev) => !prev);
  };
  // Effect to recalculate the height when dropdowns change
  useEffect(() => {
    const newHeight = calculateTotalDropdownHeight();
    setDropdownHeight(newHeight);
  }, [recalculateTrigger]); // Dependency on the trigger

  // Adjust dropdownHeight when main dropdown visibility changes
  useEffect(() => {
    if (dropdownVisible && dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.offsetHeight);
    } else {
      setDropdownHeight(0);
    }
  }, [dropdownVisible, dropdownRef]);

  // Adjust dropdownHeight when nested dropdowns visibility changes
  useEffect(() => {
    const newHeight = calculateTotalDropdownHeight();
    setDropdownHeight(newHeight);
  }, [nestedDropdown, nnDropdown]);

  // Adjust dropdown position dynamically
  useEffect(() => {
    if (dropdownRef.current && dropdownVisible) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      if (dropdownRect.bottom > window.innerHeight) {
        dropdownRef.current.style.top = `-${dropdownRect.height}px`;
      } else {
        dropdownRef.current.style.top = "initial";
      }
    }
  }, [nestedDropdown, nnDropdown, dropdownVisible]);

  return (
    <>
      <div className="official-logo">
        <img src={OffLogo} alt="Official logo" />
        <h2>AIADMK</h2>
      </div>
      <div
        className="dates-container"
        onClick={() => setDropdownVisible(false)}
      >
        {Object.keys(datePlatforms).map((date, index) => (
          <div key={index} className="date-dropdown">
            <button
              className="date-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the container click from triggering
                toggleDropdown(date);
              }}
            >
              {date}
              {dropdownVisible && selectedDate === date ? (
                <IoIosArrowUp className="arrow-icon" />
              ) : (
                <IoIosArrowDown className="arrow-icon" />
              )}
            </button>
            {dropdownVisible && selectedDate === date && (
              <div className="dropdown-content" ref={dropdownRef}>
                {Object.keys(datePlatforms[date]).map((platform, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={(e) => toggleNestedDropdown(platform, e)}
                  >
                    {platform}
                    {nestedDropdown[platform] && (
                      <div
                        id={`nested-dropdown-${platform}`}
                        className="nested-dropdown-content"
                      >
                        {datePlatforms[date][platform].map(
                          (option, nestedIndex) => (
                            <div
                              key={nestedIndex}
                              className="nested-dropdown-item"
                              onClick={(e) => {
                                const data = {
                                  month: date,
                                  option,
                                  mainOption: platform,
                                };
                                if (option === "Overview") {
                                  navigate("/overview", { state: data });
                                } else if (
                                  option === "FB_advt_video" ||
                                  option === "YT_advt_videos"
                                ) {
                                  toggleNnDropdown(option, e);
                                } else {
                                  navigate("/graphs", { state: data });
                                }
                              }}
                            >
                              {option}
                              {nnDropdown[option] && (
                                <div
                                  id={`nn-dropdown-${option}`}
                                  className="nn-dropdown-content"
                                >
                                  {optionPlatforms[date][option].map(
                                    (nestedOption, nestedIndex) => (
                                      <div
                                        key={nestedIndex}
                                        className="nested-dropdown-item"
                                        onClick={() => {
                                          const data = {
                                            month: date,
                                            option: nestedOption,
                                            mainOption: platform,
                                            subOption: option,
                                          };
                                          if (nestedOption === "Overview") {
                                            navigate("/overview", {
                                              state: data,
                                            });
                                          } else {
                                            navigate("/graphs", {
                                              state: data,
                                            });
                                          }
                                        }}
                                      >
                                        {nestedOption}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="cards-wrapper"
        style={{
          marginTop: `${dropdownHeight}px`,
          transition: "margin-top 0.3s ease",
        }}
      >
        <HomeOverview data={Data.Home_OverviewData} />
      </div>
    </>
  );
};

export default Dates;
