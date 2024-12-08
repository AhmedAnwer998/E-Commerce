import React, { useContext } from "react";
import "./ProductDetails.css";
import { ProductContext } from "../ProductContext/ProductContext";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useTheme } from "../ThemeContext/ThemeContext";

const ProductDetails = () => {
  const { selectedProduct, addToCart } = useContext(ProductContext);
  const {isDarkMode} = useTheme();

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
    }
  };

  if (!selectedProduct) return <div>Loading...</div>;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <AiFillStar key={index} className="text-yellow-400" />
        ))}
        {halfStar && (
          <div className="relative inline-block overflow-hidden ">
            <AiFillStar className="text-yellow-400" />
            <div className="absolute top-0 left-0 inset-0 w-1/2 h-full bg-white transform translate-x-full"></div>
          </div>
        )}
        {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }).map(
          (_, index) => (
            <AiOutlineStar key={index} className="text-yellow-400" />
          )
        )}
      </div>
    );
  };

  return (
    <div className={`${isDarkMode ? "bg-dark text-white" : ""}`}>
<Container>
      <Row className="p-4">
        <Col xl={4}>
          <img
            src={selectedProduct.image}
            style={{ width: "300px" }}
            alt={selectedProduct.title}
          />
        </Col>
        <Col xl={8} className="flex flex-col justify-start items-start">
          <h1 className="title">{selectedProduct.title}</h1>
          <p className="descc font-semibold text-lg leading-8">
            {selectedProduct.description}
          </p>
          <span className="pr font-bold text-xl"> $ {selectedProduct.price} </span>
          <div className="mt-1 mb-1 flex items-center">
            {renderStars(selectedProduct.rating.rate)}
            <span className="ml-2 text-sm text-gray-600">
              ({selectedProduct.rating.rate})
            </span>
          </div>
          <button
            className="btnn  p-2 text-md rounded-full bg-amber-400 hover:bg-amber-500 active:bg-amber-200 active:scale-95 transition-all duration-300"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default ProductDetails;
