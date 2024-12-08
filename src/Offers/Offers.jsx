import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sale from "/images/sale.png";
import shopping from "/images/shopping.png";
import women from "/images/women.png";
import { useTheme } from "../ThemeContext/ThemeContext";
import "./Offers.css";

const myOffers = [
  {
    id: 1,
    image: sale,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    image: shopping,
    title: "Upto 50% off on all Men's Wear",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    image: women,
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Offers = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 4000,
    rtl: true,
    pauseOnHover: false,
    pauseOnFocus: true,
    cssEase: "ease-in-out",
  };

  const { isDarkMode } = useTheme();

  return (
    <div
      className={`overflow-visible z-10  relative min-h-[550px] ${isDarkMode ? "bg-dark text-white" : ""}`}
    >
      <div
        className={`bg-offers w-[650px] h-[640px] absolute  rotate-45 -z-[8] -top-1/2 -right-14 rounded-3xl ${isDarkMode ? "bg-yellow-700 brightness-90" : "bg-yellow-500"}`}
      ></div>

      <Slider className="" {...settings}>
        {myOffers.map((offer) => (
          <Container className=" w-full h-[600px] flex items-center justify-center">
            <Row
              key={offer.id}
              className="custom-row w-full h-full flex items-center justify-center"
            >
              <Col className="">
                <h1 className="offer-title text-7xl font-bold">
                  {offer.title}
                </h1>
                <p className="text-sm">{offer.description}</p>
              </Col>
              <Col className="h-[400px] w-[400px] flex items-center justify-center">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="offer-image h-full object-contain "
                />
              </Col>
            </Row>
          </Container>
        ))}
      </Slider>
    </div>
  );
};

export default Offers;
