import React, { useEffect, useState } from "react";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Styles/style.css";
import Progress from "../components/Progress.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footers.jsx";
import { useParams } from "react-router-dom";
import "../Styles/Description.css";
const backend = import.meta.env.VITE_DATABASE_URL;
import { decryptId } from "../cryptoUtils.jsx";
import { FaShareAlt } from "react-icons/fa";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Description = (item) => {

  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const { id, category } = useParams();
  const [itemDetails, setItemDetails] = useState([]);
  const [isCardOpen, setIsCardOpen] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setModal] = useState(false);
  const [showOtpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  let totalAmount;
  const shareUrl = `${window.location.origin}/description/${id}/${category}`; // Constructing share URL
  const [title, setTitle] = useState("Contribute to this school!");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [showShareIcon, setShowShareIcon] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, []);

  useEffect(() => {
    if (itemDetails.length > 0) {
      const { amountReceived, totalAmount } = itemDetails[0];
      if (totalAmount > 0) {
        setProgress(Math.floor((amountReceived / totalAmount) * 100));
      }
    }
  }, [itemDetails]);

  const handleDonate = () => {
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setModal(false);
    setOtpModal(false);
    document.body.style.overflow = "auto"; 
  };

  const handleCloseThanksModal = () =>{
  setShowThankYouDialog(false);
  window.location.reload();
  document.body.style.overflow = "auto";
};
  

  const handleSubmit = async () => {

    const newErrors = {};
    if (!name) newErrors.name = true;
    if (!address) newErrors.address = true;
    if (!phone) newErrors.phone = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitError('These fields are mandatory.');
      return; // Stop the submission if there are errors
    } else {
      setSubmitError('');
    }

    // Gather donated items details
    const donatedItems = itemDetails[0]?.items
      .filter((item) => item.quantitySelected > 0) // Only include items with a selected quantity
      .map((item) => ({
        id: item._id, // Assuming each item has a unique _id field
        name: item.item, // Assuming the item name is stored in the 'item' field
        quantity: item.quantitySelected,
        totalCost: calculateTotalAmount(item.quantitySelected, item.amount),
      }));

    // Calculate total donation cost
    const totalDonationCost = donatedItems.reduce(
      (total, item) => total + item.totalCost,
      0
    );

    // Prepare the data to send to the backend
    const donationData = {
      donatorName: name,
      donatorAddress: address,
      donatorMail: email,
      donatorPhone: phone,
      donatedItems: donatedItems,
      totalDonationCost: totalDonationCost,
      projectId: decryptId(id),
    };

    // Send user information to the backend
    try {
      setLoader(true);
      const response = await fetch(
        `${backend}/users/otpVerification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(donationData), // Send the complete donation data
        }
      );
      let result = await response.json();
      if (response.status === 200) {
        setUserId(result.userId);
        setOtpModal(true);
        setModal(false);
      } else {
        console.error("Failed to submit user information");
      }
    } catch (error) {
      console.error("Error submitting user information:", error);
    }finally{
      setLoader(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setLoader(true);
      const response = await fetch(
        // "http://localhost:2000/users/donatorsDetails",
        `${backend}/users/donatorsDetails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, otp }),
        }
      );
      let result = await response.json();
      if (response.status === 200) {
        setShowThankYouDialog(true);
        setTimeout(() => {
          confetti.start();
        }, 1000);
        setTimeout(() => {
          confetti.stop();
        }, 5000);
      } else {
        console.error("Failed to submit user information");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting user information:", error);
    }finally{
      setLoader(false);
    }
  };

  const fetchItemDetails = async () => {
    let endpoint = "";
    switch (category) {
      case "events":
        endpoint =
          // `http://localhost:2000/users/getApprovedEventDetails/${id}`;
          `${backend}/users/getApprovedEventDetails/${decryptId(id)}`;

        break;
      case "education":
        endpoint =
          // `http://localhost:2000/users/getApprovedEducationDetails/${id}`;
          `${backend}/users/getApprovedEducationDetails/${decryptId(id)}`;
        break;
      case "publicSpaces":
        endpoint =
          // `http://localhost:2000/users/getApprovedPublicSpacesDetails/${id}`;
          `${backend}/users/getApprovedPublicSpacesDetails/${decryptId(id)}`;
        break;
      case "health":
        endpoint =
          // `http://localhost:2000/users/getApprovedHealthDetails/${id}`;
          `${backend}/users/getApprovedHealthDetails/${decryptId(id)}`;
        break;
      default:
        console.error("Invalid category:", category);
        return;
    }

    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      const items = Array.isArray(result) ? result : [result];

      // Ensure quantitySelected is initialized
      const updatedItems = items[0]?.items?.map((item) => ({
        ...item,
        quantitySelected: item.quantitySelected || 0, // Initialize quantitySelected if not present
      }));

      setItemDetails([{ ...items[0], items: updatedItems }]);
      setTitle(
        `🌟HELP US CREATE A BRIGHTER TOMORROW! Contribute to This School ${items[0]?.schoolName?.split(" - ")[0] || "Unknown"
        }! 🌟`
      );
      const imageUrl = itemDetails.length > 0 && itemDetails[0]?.imagePath?.length > 0
        ? backend + itemDetails[0].imagePath[0]
        : "URL_TO_DEFAULT_IMAGE"; // Replace with a default image URL if needed
    } catch (error) {
      console.error("Error Fetching details.");
    }
  };



  const toggleCard = (index) => {
    setIsCardOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleQuantityChange = (index, change) => {
    const updatedDetails = [...itemDetails];
    const item = updatedDetails[0]?.items[index];

    if (item) {
      const newQuantity = item.quantitySelected + change;
      const clampedQuantity = Math.max(0, Math.min(item.quantity, newQuantity));
      item.quantitySelected = clampedQuantity;
      setItemDetails(updatedDetails);
    }
  };

  const handleInputChange = (index, event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity)) {
      handleQuantityChange(
        index,
        newQuantity - itemDetails[0]?.items[index]?.quantitySelected
      ); // Update based on new value
    }
  };

  // Calculate total amount for each card
  const calculateTotalAmount = (quantity, amount) => {
    totalAmount = quantity * amount;
    return totalAmount;
  };

  const calculateOverallTotalFunding = () => {
    if (!Array.isArray(itemDetails)) return 0; // Check if itemDetails is an array

    return itemDetails.reduce((total, item) => {
      if (!Array.isArray(item.items)) return total;
      return (
        total +
        item.items.reduce((itemTotal, card) => {
          return (
            itemTotal +
            calculateTotalAmount(card.quantitySelected || 0, card.amount)
          );
        }, 0)
      );
    }, 0);
  };

  useEffect(() => {
    if (item && item.schoolName) {
      setTitle(`Contribute to this school ${item.schoolName}!`);
    }
  }, [item]);

  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
    setRotate((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 700) {
        setShowShareIcon(true);
      } else {
        setShowShareIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
    }
};


  return (
    <>
      {itemDetails.map((item, index) => (
        <section key={index} className="title-section slide-in">
          <div className="container text-center">
            <h1 className="display-4 fst-italic title">
              {(item.schoolName && item.schoolName.split(" - ")[0]) ||
                item.name ||
                item.projectName}
            </h1>
          </div>
        </section>
      ))}

      <div className="container">
        {/* Image Carousel and Description Section */}
        <div className="row">
          {/* Image Carousel Section */}
          <div
            className="col-lg-6 d-flex flex-column"
            style={{ marginTop: "30px", padding: "0", marginBottom: "-30px" }}
          >
            <div
              className="rounded text-body-emphasis bg-body-secondary carousel-container"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                padding: "0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                marginBottom: "50px",
              }}
            >
              <div className="col-lg-12 px-0">
                <section
                  id="testimonials"
                  className="testimonials section-bg my-0"
                  style={{ padding: "0", margin: "0" }}
                >
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner"
                      style={{ padding: "10px", maxHeight:"445px" }}>
                      {itemDetails.length > 0 &&
                        itemDetails[0]?.imagePath?.map((image, index) => (
                          <div
                            className={`carousel-item ${index === 0 ? "active" : ""
                              }`}
                            key={index}
                          >
                            <img
                              src={backend + image}
                              className="img-fluid large-image h-100"
                              alt=""
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%", // Ensure the image takes full height
                              }}
                            />
                          </div>
                        ))}
                    </div>
                    {/* Dot indicators */}
                    <div className="carousel-indicators">
                      {itemDetails[0]?.imagePath?.map((_, index) => (
                        <button
                          type="button"
                          key={index}
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : "false"}
                          aria-label={`Slide ${index + 1}`}
                          style={{
                            backgroundColor: "black",
                            borderRadius: "50%",
                            width: "10px",
                            overflowY: "auto",
                            height: "10px",
                            margin: "0 5px",
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Dynamic Description Section */}
          <div
            className="col-lg-6 d-flex flex-column"
            style={{ padding: "0", marginTop: "30px" }}
          >
            {itemDetails.length > 0 && itemDetails[0].description && (
              <div
                className="border rounded shadow-sm p-4 mb-5 hover-shadow d-flex flex-column"
                style={{
                  height: "445px",
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: "#007bff",
                    padding: "20px",
                    fontSize: "2rem",
                    marginTop: "-10px"
                  }}
                >
                  About School
                </h2>

                <hr
                  style={{ marginTop: "-20px", marginBottom: "10px" }}
                  className="section-divider"
                />

                <div
                  className="description-container"
                  style={{
                    position: "relative",
                    flexGrow: 1,
                    overflowY: "auto",
                    maxHeight: "300px",
                    paddingRight: "10px",
                  }}
                >
                  <p
                    className="justify-text"
                    style={{
                      lineHeight: "2.2",
                      fontSize: "1.1rem",
                      color: "black",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "2rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {itemDetails[0].description.charAt(0)}
                    </span>
                    {itemDetails[0].description.slice(1)}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Title Section */}

      <section
        id="about"
        className="about section"
        style={{
          backgroundColor: "#e0f7fa",
          padding: "40px 0",
          paddingBottom:"0px",
          marginTop: "-15px",
        }}
      >
        <div className="container">
          <div className="row mb-4">
            {itemDetails?.map((item, index) => (
              <div key={index}>
                {/* About School Section - Top */}

                <div className="row">
                  {/* School Requirements Section */}
                  <div className="col-md-6 order-md-1 order-2">
                    <div
                      className="border rounded shadow-sm p-4 mb-5 hover-shadow"
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for card effect
                        marginTop: "20px",
                        height: "400px", // Set a fixed height for uniformity
                        overflow: "hidden", // Hide any overflow outside the box
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          fontSize: "1.5rem", // Adjusted font size
                          color: "#007bff",
                        }}
                      >
                        School Requirements
                      </h2>
                      <hr
                        style={{ marginTop: "10px" }}
                        className="section-divider"
                      />

                      <div
                        className="table-responsive"
                        style={{
                          marginBottom: "20px",
                          borderRadius: "0 0 10px 10px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Slight shadow for the table
                          height: "calc(100% - 70px)", // Adjust height to fit within the container
                          overflowY: "auto", // Make the table scrollable if content overflows
                        }}
                      >
                        <table className="table table-striped table-hover">
                          <thead
                            style={{
                              backgroundColor: "#007bff",
                              color: "#fff",
                            }}
                          >
                            <tr>
                              <th>Sl.No</th>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Amount</th>
                              <th>Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item?.items?.map((items, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{items.item}</td>
                                <td>{items.quantity}</td>
                                <td>₹{items.amount}</td>
                                <td>₹{items.totalAmount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Fundraiser's Details Section */}
                  <div className="col-md-6 order-md-2 order-1">
                    <div
                      className="border rounded shadow-sm p-4 mb-5 hover-shadow"
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for card effect
                        marginTop: "20px",
                        height: "400px", // Set the same height as School Requirements
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          fontSize: "1.5rem", // Adjusted font size
                          color: "#007bff",
                        }}
                      >
                        School Contact Details
                      </h2>
                      <hr
                        style={{ marginTop: "10px", marginBottom: "5px" }}
                        className="section-divider"
                      />

                      <div
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          padding: "5px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          height: "calc(100% - 60px)", // Ensure the content fits within the section
                          overflowY: "auto", // Allow scrolling if content is larger
                        }}
                      >
                        {/* Fundraiser Details with custom icon colors */}
                        {[
                          {
                            icon: "fa-user",
                            label: "NAME",
                            value: item.fundRaiserName,
                            iconColor: "#007bff", // Blue for name
                          },
                          {
                            icon: "fa-phone",
                            label: "CONTACT",
                            value: item.contact,
                            iconColor: "#ff5722", // Orange for contact
                          },
                          {
                            icon: "fa-map-marker-alt",
                            label: "ZONE",
                            value: item.zone,
                            iconColor: "#ff9800", // Yellow-orange for zone
                          },
                          {
                            icon: "fa-map-signs",
                            label: "TALUK",
                            value: item.taluk,
                            iconColor: "#2196f3", // Light blue for taluk
                          },
                          {
                            icon: "fa-home",
                            label: "VILLAGE",
                            value: item.village,
                            iconColor: "#4caf50", // Green for village
                          },
                          {
                            icon: "fa-money-bill-wave",
                            label: "TOTAL AMOUNT",
                            value: item.totalAmount,
                            iconColor: "#28a745", // Dark green for amount
                          },
                        ].map((detail, index) => (
                          <p
                            key={index}
                            className="detail-item"
                            style={{
                              fontWeight: "bold",
                              color: "#343a40",
                              display: "flex",
                              alignItems: "center",
                              fontSize: "0.9rem",
                              marginBottom: "20px",
                            }}
                          >
                            <i
                              className={`fas ${detail.icon}`}
                              style={{
                                marginRight: "10px",
                                color: detail.iconColor || "#007bff",
                              }}
                            ></i>
                            {detail.label}: {detail.value}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <style jsx>{`
              .justify-text {
                text-align: justify;
                line-height: 1.6;
              }

              .hover-shadow {
                transition: box-shadow 0.3s ease-in-out;
              }

              .hover-shadow:hover {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
              }

              @media (max-width: 768px) {
                .description-container,
                .fundraiser-details-container {
                  text-align: justify;
                }
                .detail-item {
                  font-size: 0.2rem;
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {showShareIcon && (
        <div className="floating-share-icon">
          <button
            className={`share-icon ${rotate ? "rotate" : ""}`}
            onClick={toggleShareOptions}
          >
            <FaShareAlt size={30} />
          </button>

          <div className={`share-options ${showShareOptions ? "show" : ""}`}>
            <div className="d-flex justify-content-center">
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <TelegramShareButton url={shareUrl} title={title}>
                <TelegramIcon size={40} round />
              </TelegramShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="Check out these school details:"
              >
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "50px",
          zIndex: "1000",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#0056b3",
            padding: "20px",
          }}
        >
          TARGET REACHED SO FAR
        </h2>
        <Progress progress={progress} />
        {itemDetails.map((item,index) => (
          <h2 className="mt-3">{item.amountReceived === 0 ? "" : '₹'+item.amountReceived}</h2>
        )
      ) }
        
      </div>

      <div
        className="container-fluid"
        style={{ backgroundColor: "#e9f7ff", overflowX: "hidden" }}
      >
        <div className="row g-5">
          <h2
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#0056b3",
              marginBottom: "30px",
              marginTop: "55px",
              padding: "20px",
            }}
          >
            ITEMS TO BE DONATED
          </h2>
          <hr style={{ margin: "0 auto " }} className="section-divider" />
          <div className="container">
            <div className="row justify-content-center">
              {itemDetails.length > 0 &&
                itemDetails[0].items &&
                itemDetails[0].items.map((item, index) => (
                  <div
                    className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center mb-4"
                    key={index}
                  >
                    <div
                      className={`icon-box position-relative text-center service-item ${isCardOpen[index] ? "expanded" : "collapsed"
                        }`}
                      onClick={() => toggleCard(index)}
                      style={{
                        backgroundColor: "#cce5ff",
                        width: "80%",
                        boxSizing: "border-box",
                        overflow: "hidden",
                        borderRadius: "8px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="icon mb-3" style={{ marginBottom: "0" }}>
                        <i
                          class="bi bi-bag-check"
                          style={{ fontSize: "1.5rem",}}
                        ></i>
                      </div>
                      <h3
                        className="title"
                        style={{ color: "#0056b3", marginBottom: "30px" }}
                      >
                        {item.item}
                      </h3>{" "}
                      {isCardOpen[index] && (
                        <div>
                          <p style={{ color: "#333" }}>
                            {" "}
                            Max Quantity Needed: {item.quantity}
                          </p>
                          <div className="quantity-control">
                            <button
                              className="btn btn-danger m-2 minus"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(index, -1);
                              }}
                              disabled={item.quantitySelected <= 0}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantitySelected}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleInputChange(index, e);
                              }}
                              min="0"
                              max={item.quantity}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.target.value = "";
                              }}
                              onBlur={(e) => {
                                if (e.target.value === "") {
                                  handleQuantityChange(
                                    index,
                                    -item.quantitySelected
                                  );
                                }
                              }}
                              style={{ width: "50px", textAlign: "center" }}
                            />
                            <button
                              className="btn btn-primary m-2 plus"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(index, 1);
                              }}
                              disabled={item.quantitySelected >= item.quantity}
                            >
                              +
                            </button>
                          </div>
                          <p style={{ color: "#333" }}>
                            Amount: ₹{item.amount}
                          </p>
                          <p style={{ color: "#333" }}>
                            Total Amount: ₹
                            {calculateTotalAmount(
                              item.quantitySelected || 0,
                              item.amount
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Total Funding Section */}
          <div className="position-sticky" style={{ top: "2rem" }}>
            <div
              className="p-4 mb-3 rounded shadow"
              style={{
                background:
                  "linear-gradient(to bottom right, #007bff, #5bc0de)",
              }}
            >
              <section id="total-funding" className="total-funding section">
                <div className="container">
                  <h3 className="text-center text-light">
                    Total Funding Amount
                  </h3>
                  <p
                    className="text-center"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#f8f9fa",
                    }}
                  >
                    ₹{calculateOverallTotalFunding()}
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-light"
                      onClick={handleDonate}
                      disabled={calculateOverallTotalFunding() === 0}
                      style={{
                        padding: "10px 30px",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div id="overlay"></div>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Donate Now</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {submitError && <div className="alert alert-danger">{submitError}</div>}
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z0-9. ]/g, ''))}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= 10) setPhone(value);
                        }}
                        maxLength="10"
                      />
                    </div>
                    <div className="mb-3" style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loader}
                      >
                        {loader ? "Submitting.." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-dialog-otp" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content-otp">
              <div className="modal-header">
                <h5 className="modal-title">OTP Verification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      className="form-control"
                      value={otp}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleOtpSubmit}
                    style={{ textAlign: "center" }}
                    disabled={loader}
                  >
                    {loader ? "Verifing OTP" : "Verify OTP"} 
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showThankYouDialog && (
        <>
          <div id="overlay"></div>

          <div className="thank-you-dialog">
            <div className="dialog-content">
              <h6>🎉Thank you for your donation!🎉</h6>
              <p>Your support means a lot to us ❤️</p>
              <button onClic = {handleCloseThanksModal}>Close</button>
            </div>
          </div>
        </>
      )}
      <style jsx>{`
       
       .thank-you-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          z-index: 1001;
          padding: 20px;
          width: 90%; /* Set a max width for smaller screens */
          max-width: 400px; /* Limit maximum width */
          text-align: center;
          animation: pop 0.3s ease;
        }
        .dialog-content h5 {
          margin-bottom: 15px;
          font-size: 1.5em;
          color: #333;
        }
        .dialog-content p {
          margin-bottom: 20px;
          color: #555;
        }
        .dialog-content button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .dialog-content button:hover {
          background-color: #0056b3;
        }
        @keyframes pop {
          from {
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @media (max-width: 600px) {
          .thank-you-dialog {
            padding: 15px;
          }
          .dialog-content h5 {
            font-size: 1.3em;
          }
          .dialog-content p {
            font-size: 0.9em;
          }
          .dialog-content button {
            padding: 8px 16px;
          }
        }
      `}</style>



      <header id="header" className="head fixed-top header-transparent">
        <Header />
      </header>

      <main className="container my-5"></main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Description;
