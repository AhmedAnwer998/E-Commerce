import React, { useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { useTheme } from "../ThemeContext/ThemeContext";

const MenClothing = () => {
  const { products, addToCart, setSelectedProduct } =
    useContext(ProductContext);
  const { isDarkMode } = useTheme();

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const mensClothing = products.filter(
    (product) => product.category === "men's clothing"
  );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
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
    <div
      className={`${isDarkMode ? "bg-dark text-white" : "bg-white text-black"}`}
    >
      <Container
        className={`${
          isDarkMode ? "bg-dark text-white" : "bg-white text-black"
        } p-4 rounded-md`}
      >
        <h1 className="" data-aos="fade-up" data-aos-delay="100">
          Men's Clothing
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-6 mx-auto">
          {mensClothing.length > 0 ? (
            mensClothing.map((product, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 300}
                key={product.id}
                className={`shadow-md rounded-md flex flex-col items-center p-4 ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                } ${index < 4 ? "lg:col-span-1" : "lg:col-span-2"}`}
              >
                <div className="h-64 w-full flex items-center justify-center">
                  <img
                    src={product.image}
                    alt="product-img"
                    className="h-full object-contain "
                  />
                </div>

                <div className="w-full flex flex-col items-center text-center mt-4">
                  <p className="font-semibold h-12 flex items-center justify-center text-center">
                    {product.title}{" "}
                  </p>
                  <span className="font-bold">Price: ${product.price}</span>
                  <div className="mt-1 flex items-center">
                    {renderStars(product.rating.rate)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.rating.rate})
                    </span>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    onClick={() => handleSelectedProduct(product)}
                    className={`text-white bg-amber-400 mt-2 block no-underline rounded-full px-4 py-2 hover:bg-amber-600 active:bg-amber-200 active:scale-95 transition-all duration-300`}
                  >
                    More Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className=" mt-2 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 active:bg-amber-200 active:scale-95 transition-all duration-300 "
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MenClothing;
