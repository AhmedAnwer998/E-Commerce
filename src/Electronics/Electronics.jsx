import React, { useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { useTheme } from "../ThemeContext/ThemeContext"; // Import the useTheme hook

const Electronics = ({ limit }) => {
  const { products, setSelectedProduct, addToCart } =
    useContext(ProductContext);
  const { isDarkMode } = useTheme(); // Get the dark mode state

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const electronics = products.filter(
    (product) => product.category === "electronics"
  );

  const displayedProducts = limit ? electronics.slice(0, limit) : electronics;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center justify-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <AiFillStar key={index} className="text-yellow-400" />
        ))}
        {halfStar && (
          <div className="relative inline-block overflow-hidden">
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
    <Container
      className={`overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        className={`${isDarkMode ? "text-white" : "text-black"}`}
      >
        Electronics
      </h1>
      <div className="grid grid-cols-4 gap-4 mx-auto mb-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay={index * 300}
              key={product.id}
              className={`w-80 shadow-md rounded-md min-h-96 flex flex-col items-center p-4 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } ${index >= 4 ? "col-span-2 justify-self-center" : ""}`}
            >
              <div className="h-64 w-full flex items-center justify-center">
                <img
                  src={product.image}
                  alt="product-img"
                  className="h-full object-contain"
                />
              </div>

              <div className="w-full flex flex-col items-center text-center mt-4">
                <p
                  className={`font-semibold h-12 flex items-center justify-center text-center ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {product.title}{" "}
                </p>
                <span
                  className={`font-bold ${
                    isDarkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  Price: ${product.price}{" "}
                </span>
                <div className="mt-1 flex items-center">
                  {renderStars(product.rating.rate)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating.rate})
                  </span>
                </div>
                <Link
                  to={`/products/${product.id}`}
                  onClick={() => handleSelectedProduct(product)}
                  className="text-white bg-amber-400 mt-2 block no-underline rounded-full px-4 py-2 hover:bg-amber-600 active:bg-amber-200 active:scale-95 transition-all duration-300"
                >
                  More Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 active:bg-amber-200 active:scale-95 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </Container>
  );
};

export default Electronics;
