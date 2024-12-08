import React from "react";
import "./BeforeFooter.css";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { useTheme } from "../ThemeContext/ThemeContext"; // Import useTheme for dark mode context

const beforeFooter = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];

const BeforeFooter = () => {
  const { isDarkMode } = useTheme(); // Get dark mode state

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 4000,
    rtl: true,
    pauseOnHover: false,
    pauseOnFocus: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 768, // Screen width <= 768px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Screen width <= 480px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`text-center ${isDarkMode ? "bg-dark text-white" : ""}`}>
      <div data-aos="fade-up" data-aos-delay="100">
        <p
          className={`p1 text-md ${
            isDarkMode ? "text-orange-200" : "text-orange-300"
          }`}
        >
          What our customers are saying
        </p>
        <h1 className="h1 text-4xl font-bold">Testimonials</h1>
        <p className="p2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores modi Sit asperiores modi
        </p>
      </div>

      <Slider {...settings}>
        {beforeFooter.map((beforeFooterr) => (
          <Container
            data-aos="zoom-in"
            data-aos-delay="100"
            key={beforeFooterr.id}
            className={`min-h-[300px] relative ${isDarkMode ? "bg-dark" : ""}`}
          >
            <Row className="gap-4">
              <Col
                className={` col min-h-[200px] shadow-md rounded-lg w-1/3 px-4 mx-2 flex flex-col py-2 text-start ${
                  isDarkMode ? "bg-gray-800 text-white" : ""
                }`}
              >
                <div>
                  <img
                    src={beforeFooterr.img}
                    alt="gg"
                    className="img rounded-full"
                  />
                </div>
                <div>
                  <p className="txt text-sm">{beforeFooterr.text} </p>
                  <h2 className="nam text-lg font-bold">
                    {beforeFooterr.name}{" "}
                  </h2>
                </div>
                <p
                  className={`comma absolute -top-8 right-3 font-serif text-9xl ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  ,,
                </p>
              </Col>
            </Row>
          </Container>
        ))}
      </Slider>
    </div>
  );
};

export default BeforeFooter;
