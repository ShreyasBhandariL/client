import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const backend = import.meta.env.VITE_DATABASE_URL;
import { encryptId } from '../cryptoUtils';
import { useTranslation } from 'react-i18next'; 

const Portfolio = () => {
  const [filter, setFilter] = useState("All Zones");
  const [portfolioData, setPortfolioData] = useState({ education: [] });

  const initialItemsToShow = 3; // Initial number of items to show
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const portfolioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    filterItems(filter);
  }, [filter, portfolioData]);

  const fetchPortfolioData = async () => {
    try {
      console.log(backend);
      
      const response = await fetch(`${backend}/users/getAllProjects`);
      const result = await response.json();
      setPortfolioData({ education: result.education || [] });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const handleFilter = (zone) => {
    setFilter(zone);
    setItemsToShow(initialItemsToShow);
    portfolioRef.current.scrollIntoView({ behavior: "smooth"});
  };

  const handleLoadMore = () => {
    if (itemsToShow < 6) {
      setItemsToShow(itemsToShow + initialItemsToShow);
    } else {
      // Navigate to the next page with the specific zone filter
      navigate(`/completeDetails/${filter}`);
    }
  };

  const getTotalItems = () => {
    if (filter === "All Zones") return portfolioData.education.length;
    return portfolioData.education.filter(item => item.zone === filter).length;
  };

  const filterItems = (zone) => {
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    portfolioItems.forEach((item) => {
      const itemZone = item.getAttribute("data-zone");
      item.style.display = zone === "All Zones" || itemZone === zone ? "block" : "none";
    });
  };

  const renderPortfolioItems = (items) => {
    const filteredItems = filter === "All Zones"
      ? items
      : items.filter(item => item.zone === filter);

    return filteredItems.slice(0, itemsToShow).map((item) => (
      <div className={`col-lg-4 col-md-6 portfolio-item`} data-zone={item.zone} key={item._id}>
        <div className="portfolio-wrap">
          <Link to={`/description/${encryptId(item._id)}/education`}>
            <div
              className="portfolio-image"
              style={{
                backgroundImage: item.imagePath ? `url(${backend + item.imagePath[0]})` : "none",
                backgroundColor: item.imagePath ? "transparent" : "#f0f0f0",
                objectFit: "cover",
              }}
            >
              {!item.imagePath && <p className="no-image-text">No Image Available</p>}
            </div>
            <div className="portfolio-title" style={{ backgroundColor: "#ecf5f9" }}>
              <p className="portfolio-name" style={{ color: "black" }}>
                <Link to={`/description/${encryptId(item._id)}/education`} style={{ color: "black" }} className="link">
                  {item.name || item.schoolName || item.projectName}
                </Link>
              </p>
            </div>
          </Link>
        </div>
      </div>
    ));
  };
  const { t } = useTranslation(); 
  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2>{t('portfolio')}</h2>
        <p style={{ color: "black" }}>
        {t('portfolioDescription')}
        </p>
      </div>

      <div className="row" data-aos="fade-in" ref={portfolioRef}>
        <div className="col-lg-12 d-flex flex-column justify-content-center">
          <ul id="portfolio-flters">
            {/* Filters */}
            <li onClick={() => handleFilter("All Zones")} className={filter === "All Zones" ? "filter-active" : ""}>{t('allZones')}</li>
            <li onClick={() => handleFilter("Bantwal")} className={filter === "Bantwal" ? "filter-active" : ""}>{t('bantwal')}</li>
            <li onClick={() => handleFilter("Belthangady")} className={filter === "Belthangady" ? "filter-active" : ""}>{t('belthangady')}</li>
            <li onClick={() => handleFilter("MangaloreNorth")} className={filter === "MangaloreNorth" ? "filter-active" : ""}>{t('mangaloreNorth')}</li>
            <li onClick={() => handleFilter("MangaloreSouth")} className={filter === "MangaloreSouth" ? "filter-active" : ""}>{t('mangaloreSouth')}</li>
            <li onClick={() => handleFilter("Moodabidre")} className={filter === "Moodabidre" ? "filter-active" : ""}>{t('moodabidre')}</li>
            <li onClick={() => handleFilter("Puttur")} className={filter === "Puttur" ? "filter-active" : ""}>{t('puttur')}</li>
            <li onClick={() => handleFilter("Sullia")} className={filter === "Sullia" ? "filter-active" : ""}>{t('sullia')}</li>
          </ul>
        </div>
      </div>

      <div className="row portfolio-container" data-aos="fade-up">
        {renderPortfolioItems(portfolioData.education)}
      </div>

      <div className="text-center mt-4">
        {getTotalItems() > itemsToShow && (
          <button className="btn btn-primary mx-5" onClick={handleLoadMore}>
            {itemsToShow < 6 ? "Load More" : "Load More on Next Page"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
