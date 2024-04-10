import "./Dates.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OffLogo from "../assets/official-logo.png";

const Dates = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [nestedDropdown, setNestedDropdown] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const dropdownRef = useRef(null); // Ref to access the dropdown for measurements

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

  const toggleDropdown = (date) => {
    setSelectedDate(date);
    setDropdownVisible((prev) => !prev);
    setNestedDropdown({}); // Reset nested dropdown
  };

  const toggleNestedDropdown = (platform, e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setNestedDropdown((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

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
  }, [nestedDropdown, dropdownVisible]);

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
                      <div className="nested-dropdown-content">
                        {datePlatforms[date][platform].map(
                          (option, nestedIndex) => (
                            <div
                              key={nestedIndex}
                              className="nested-dropdown-item"
                              onClick={() => {
                                const data = {
                                  month: date,
                                  option,
                                  mainOption: platform,
                                };
                                if (option === "Overview") {
                                  navigate("/overview", { state: data });
                                } else {
                                  navigate("/graphs", { state: data });
                                }
                              }}
                            >
                              {option}
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
    </>
  );
};

export default Dates;
