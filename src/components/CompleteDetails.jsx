import React, { useEffect, useState , useRef  } from "react";
import { useParams, Link } from "react-router-dom";
const backend = import.meta.env.VITE_DATABASE_URL;
import Header from "./Header";
import Footer from "./Footers";
import { encryptId } from "../cryptoUtils";
import success from "../assets/success.jpg";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa"; // Import the search icon
import "../Styles/Description.css";

const CompleteDetails = () => {
  const { zone } = useParams();
  const [portfolioData, setPortfolioData] = useState({ education: [] });
  const initialItemsToShow = 6;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [filter, setFilter] = useState("All Zones");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showZoneSelector, setShowZoneSelector] = useState(false);
  const inputRef = useRef(null);


  const zones = [
    "Bantwal",
    "Belthangady",
    "MangaloreNorth",
    "MangaloreSouth",
    "Puttur",
    "Sullia",
    "Moodabidre",
  ];

  const toggleZoneSelector = () => {
    setShowZoneSelector(!showZoneSelector);
  };

  const handleZoneSelect = (selectedZone) => {
    window.scrollTo(0, 0);
    setShowZoneSelector(false);
    setFilter(selectedZone);
    if (selectedZone === "All Zones") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.zone === selectedZone
      );
      setFilteredProjects(filtered);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      handleZoneSelect(zone);
    }
  }, [projects, zone]);

  useEffect(() => {
    const filtered = projects.filter((project) =>
      (project.name || project.schoolName || project.projectName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(`${backend}/users/getAllProjects`);
      const result = await response.json();
      setPortfolioData({ education: result.education || [] });
      setProjects(result.education || []);
      setFilteredProjects(result.education || []);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const handleLoadMore = () => {
    const remainingItems = getTotalItems() - itemsToShow;
    if (remainingItems <= initialItemsToShow) {
      setItemsToShow(itemsToShow + remainingItems);
      setShowLoadMore(false);
    } else {
      setItemsToShow(itemsToShow + initialItemsToShow);
    }
  };

  const getTotalItems = () => {
    if (filter === "All Zones") {
      return projects.length;
    }
    return projects.filter((item) => item.zone === filter).length;
  };

  const renderPortfolioItems = () => {
    return filteredProjects.slice(0, itemsToShow).map((item) => (
      <div
        className="col-lg-4 col-md-6 portfolio-item"
        key={item._id}
        data-zone={item.zone}
      >
        <div className="portfolio-wrap">
          <Link to={`/description/${encryptId(item._id)}/education`}>
            <div
              className="portfolio-image"
              style={{
                backgroundImage: item.imagePath
                  ? `url(${backend + item.imagePath[0]})`
                  : "none",
                backgroundColor: item.imagePath ? "transparent" : "#f0f0f0",
              }}
            >
              {!item.imagePath && <p>No Image Available</p>}
            </div>
            <div
              className="portfolio-title"
              style={{ backgroundColor: "#ecf5f9" }}
            >
              <p className="portfolio-name" style={{ color: "black" }}>
                <Link
                  to={`/description/${encryptId(item._id)}/education`}
                  style={{ color: "black" }}
                  className="link"
                >
                  {item.name || item.schoolName || item.projectName}
                </Link>
              </p>
            </div>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <>
       <div className="head fixed-top header-transparent">
        <header id="header">
          <Header />
        </header>
      </div>

      <div className="successimage" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <img
          src={success}
          alt="Success in Education"
          className="img-fluid"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="container">
        <div className="section-title">
          <h2
            style={{
              fontFamily: "cursive",
              marginBottom: "-20px",
              marginTop: "20px",
            }}
          >
            {filter} Schools
          </h2>
        </div>

        <div className="text-center mb-4">
          <blockquote
            className="mt-3"
            style={{ fontStyle: "italic", fontSize: "1.2rem" }}
          >
            "Educate and raise the masses, and thus alone a nation is possible."
            <br />
            <small>- Swami Vivekananda</small>
          </blockquote>
        </div>

        {/* Search Input with Icon */}
        <div className="search-container mb-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: '100%', maxWidth: '800px', borderRadius: '8px', overflow: 'hidden' }}>
            <span
              onClick={() => inputRef.current.focus()}
              style={{
                backgroundColor: '#fff',
                border: '2px solid black',
                borderRight: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px',
                borderRadius: '8px 0 0 8px', // Rounded left side
                cursor: 'pointer', // Add pointer cursor to indicate it's clickable
              }}
            >
              <FaSearch />
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search schools by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: '2px solid black',
                borderLeft: 'none',
                padding: '10px',
                width: '100%',
                borderRadius: '0 8px 8px 0', // Rounded right side
              }}
            />
          </div>
        </div>
        <hr className="section-divider" />

        <div className="row portfolio-container">{renderPortfolioItems()}</div>

        {showLoadMore && itemsToShow < getTotalItems() && (
          <div className="text-center mt-4" style={{ marginBottom: "30px" }}>
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>

      <footer id="footer" style={{ marginTop: "30px" }}>
        <Footer />
      </footer>

      <div className="jump-container">
        <div className="floating-icon" onClick={toggleZoneSelector}>
          <FaMapMarkerAlt size={30} />
        </div>

        {showZoneSelector && (
          <div className="zone-selector">
            {zones.map((zone) => (
              <button
                key={zone}
                className={`zone-btn ${
                  filter === zone ? "active-zone-btn" : ""
                }`}
                onClick={() => handleZoneSelect(zone)}
              >
                {zone}
              </button>
            ))}
            <button
              className={`zone-btn ${
                filter === "All Zones" ? "active-zone-btn" : ""
              }`}
              onClick={() => handleZoneSelect("All Zones")}
            >
              All Zones
            </button>
          </div>
        )}
      </div>

      <style jsx="true">{`
        @keyframes jump {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .jump-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          animation: jump 1s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          align-items: center; /* Center the icon and selector */
        }

        .floating-icon {
          background-color: #007bff;
          color: white;
          border-radius: 50%;
          padding: 10px;
          cursor: pointer;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .zone-selector {
          background-color: white;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          padding: 10px;
          border-radius: 8px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center; /* Center buttons horizontally */
          justify-content: center; /* Center buttons vertically */
        }

        .zone-btn {
          margin: 5px 0;
          color: black;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
          text-align: center;
          width: 100%;
          background-color: #f0f0f0;
          transition: background-color 0.3s, color 0.3s;
        }

        .zone-btn:hover {
          background-color: #e0e0e0;
        }

        .active-zone-btn {
          background-color: #007bff;
          color: white;
        }
        .active-zone-btn:hover {
          background-color: #e0e0e0;
          color: black;
        }
      `}</style>
    </>
  );
};

export default CompleteDetails;
