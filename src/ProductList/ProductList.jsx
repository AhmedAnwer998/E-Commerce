import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductList.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { ProductContext } from "../ProductContext/ProductContext.jsx";
import MenClothing from "../MenClothing/MenClothing.jsx";
import WomenClothes from "../WomenClothes/WomenClothes.jsx";
import Jewelery from "../Jewelery/Jewelery.jsx";
import Electronics from "../Electronics/Electronics.jsx";
import Offers from "../Offers/Offers.jsx";
import SideBarCategory from "../SideBarCategory/SideBarCategory.jsx";
import { useTheme } from "../ThemeContext/ThemeContext"; // Import useTheme

const ProductList = () => {
  const { products, setSelectedProduct, categories } =
    useContext(ProductContext);
  const { isDarkMode } = useTheme(); // Access dark mode state
  const [searchProducts, setSearchProducts] = useState("");
  const [keyWord, setKeyWord] = useState({ id: 0, category: "all" });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCategoryWidth, setSelectedCategoryWidth] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchProducts.trim()) return;

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchProducts.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchProducts.toLowerCase());

      const matchesCategory =
        keyWord.category === "all" || product.category === keyWord.category;

      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  const handleChangeCategory = (category) => {
    setKeyWord({ ...keyWord, category });
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  useEffect(() => {
    const element = document.getElementById("category-width");
    if (element) {
      setSelectedCategoryWidth(element.offsetWidth);
    }
  }, [selectedCategory]);

  return (
    <div
      className={` overflow-hidden ${isDarkMode ? "bg-dark text-white" : ""}`}
    >
      <div
        className={`biggg-cont py-2  z-50 shadow-md  ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-amber-500"
        }`}
        style={{ position: "relative", overflow: "visible" }}
      >
        <Container fluid className="big-cont ">
          <div className="flex justify-between ">
            <div
              className="remove-992 gap-3 flex items-center"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <SideBarCategory />
              <Link
                className={`!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000 ${
                  isDarkMode ? "!text-white" : "!text-black"
                }`}
                to="/MenClothing"
              >
                Men's Clothes
              </Link>
              <Link
                className={`!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000 ${
                  isDarkMode ? "!text-white" : "!text-black"
                }`}
                to="/WomenClothes"
              >
                Women's Clothes
              </Link>
              <Link
                className={`!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000 ${
                  isDarkMode ? "!text-white" : "!text-black"
                }`}
                to="/Jewelery"
              >
                Jewelery
              </Link>
              <Link
                className={`!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000 ${
                  isDarkMode ? "!text-white" : "!text-black"
                }`}
                to="/Electronics"
              >
                Electronics
              </Link>

              <div className="group relative cursor-pointer flex items-center">
                <span
                  className={`flex items-center cursor-pointer gap-[2px] !text-black hover:!text-white no-underline hover:scale-95 transition duration-1000 ${
                    isDarkMode ? "!text-white" : "!text-black"
                  }`}
                >
                  Trending Products{" "}
                  <span className="transition-transform duration-200 transform group-hover:rotate-180 ">
                    <IoMdArrowDropdown />
                  </span>
                </span>
                <ul
                  className={`absolute z-[100] hidden group-hover:block shadow-lg rounded-lg p-2 top-full left-0 w-48 ${
                    isDarkMode ? "bg-dark text-white" : "bg-white text-black"
                  }`}
                >
                  <li
                    className={`block px-4 py-2 hover:bg-gray-100 rounded-lg ${isDarkMode ? "hover:bg-gray-600" : ""}`}
                  >
                    Products
                  </li>
                  <li
                    className={`block px-4 py-2 hover:bg-gray-100 rounded-lg ${isDarkMode ? "hover:bg-gray-600" : ""}`}
                  >
                    Best Selling
                  </li>
                  <li
                    className={`block px-4 py-2 hover:bg-gray-100 rounded-lg ${isDarkMode ? "hover:bg-gray-600" : ""}`}
                  >
                    Top Rated
                  </li>
                </ul>
              </div>
            </div>
            <div className="bigg-div">
              <form
                onSubmit={handleSearch}
                className="big-big-div flex group relative"
              >
                <div
                  id="category-width"
                  className="category-search px-4 cursor-pointer text-sm pointer-events-none invisible flex items-center justify-center"
                  style={{ visibility: "hidden" }}
                >
                  {selectedCategory}
                </div>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`category-search1 group relative cursor-pointer left-0 !rounded-s-full px-2 py-1 text-sm font-medium flex items-center justify-center border ${
                    isDarkMode ? "bg-dark text-white" : "bg-white text-black"
                  }`}
                  style={{ width: selectedCategoryWidth }}
                >
                  {selectedCategory}
                  <IoMdArrowDropdown className="ml-1" />
                  {isDropdownOpen && (
                    <ul
                      className={`absolute z-[100] top-full left-0 shadow-lg rounded-lg w-48 p-2 ${
                        isDarkMode
                          ? "bg-dark text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className={`block px-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                          onClick={() => handleChangeCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="big-div flex relative">
                  <input
                    type="search"
                    placeholder="Search"
                    className={`fill-the-screen me-2 w-52 sm:w-48 hover:w-80 transition-all duration-1000 ease-in-out rounded-e-full border px-2 pe-4 py-1 outline-none placeholder:text-sm ${
                      isDarkMode ? "text-white bg-dark" : "text-black"
                    }`}
                    aria-label="Search"
                    value={searchProducts}
                    onChange={(e) => setSearchProducts(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-lg font-extrabold hover:text-amber-600"
                  >
                    <IoIosSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
      <Container className="mt-4 px-3 py-2 w-screen flex justify-center items-center">
        <Row className="w-full flex flex-row justify-center items-center ">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col
                xs={12}
                sm={6}
                md={3}
                key={product.id}
                className="flex flex-col mb-4 "
              >
                <Link
                  to={`/products/${product.id}`}
                  onClick={() => handleSelectedProduct(product)}
                  className={`no-underline shadow-md rounded-md  ${
                    isDarkMode ? "bg-gray-800 text-white" : "text-black"
                  }`}
                >
                  <div className="h-64 flex items-center justify-center ">
                    <img
                      src={product.image}
                      alt="product-img"
                      className="h-full object-contain p-3"
                    />
                  </div>
                  <p className="title-clamp font-semibold h-12 flex items-center justify-center text-center">
                    {product.title}
                  </p>
                </Link>
              </Col>
            ))
          ) : (
            <>
              <Col xs={12}>
                <Offers />
              </Col>
              <Col xs={12} className="flex justify-center items-center mb-4">
                <MenClothing />
              </Col>
              <Col xs={12} className="flex justify-center items-center mb-4">
                <WomenClothes limit={4} />
              </Col>
              <Col xs={12} className="flex justify-center items-center mb-4">
                <Jewelery />
              </Col>
              <Col xs={12} className="flex justify-center items-center mb-4">
                <Electronics limit={4} />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
