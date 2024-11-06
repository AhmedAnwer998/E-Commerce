import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { ProductContext } from "../ProductContext/ProductContext.jsx";
import MenClothing from "../MenClothing/MenClothing.jsx";
import WomenClothes from "../WomenClothes/WomenClothes.jsx";
import Jewelery from "../Jewelery/Jewelery.jsx";
import Electronics from "../Electronics/Electronics.jsx";

const ProductList = () => {
  const { products, setSelectedProduct, addToCart } =
    useContext(ProductContext);

  const [searchProducts, setSearchProducts] = useState("");

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchProducts.toLowerCase())
  );

  return (
    <div className="">
      <div className="">
        <Navbar expand="lg" className="bg-amber-500 shadow-md">
          <Container fluid className="px-2">
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="gap-3 me-auto flex items-center"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link
                  className="!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000"
                  to="/MenClothing"
                >
                  Men's Clothes
                </Link>
                <Link
                  className="!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000"
                  to="/Jewelery"
                >
                  Jewelery
                </Link>
                <Link
                  className="!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000"
                  to="/Electronics"
                >
                  Electronics
                </Link>
                <Link
                  className="!text-black hover:!text-white no-underline hover:scale-95 transition duration-1000"
                  to="/WomenClothes"
                >
                  Women's Clothes
                </Link>
                <div className="group relative cursor-pointer flex items-center">
                  <span className="flex items-center cursor-pointer gap-[2px] !text-black hover:!text-white no-underline hover:scale-95 transition duration-1000">
                    Trending Products{" "}
                    <span className="transition-transform duration-200 transform group-hover:rotate-180 ">
                      <IoMdArrowDropdown />
                    </span>
                  </span>
                  <ul className="absolute z-[100] hidden group-hover:block shadow-lg rounded-lg p-2 top-full left-0 bg-white w-48">
                    <li className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      Products
                    </li>
                    <li className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      Best Selling
                    </li>
                    <li className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      Top Rated
                    </li>
                  </ul>
                </div>
              </Nav>
              <Form className="flex group relative">
                <input
                  type="search"
                  placeholder="Search"
                  className=" me-2 w-52 sm:w-48 hover:w-80 transition-all duration-1000 ease-in-out rounded-full border bord-whitetext-white px-2 pe-4 py-1 outline-none focus:outline-none placeholder:text-sm"
                  aria-label="Search"
                  value={searchProducts}
                  onChange={(e) => setSearchProducts(e.target.value)}
                />
                <button className="absolute top-1/2 -translate-y-1/2 right-4 text-lg font-extrabold hover:text-amber-600 d-whitetext-white ">
                  <IoIosSearch />
                </button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <Container
        fluid
        className="px-3 py-2 w-screen flex flex-col justify-center items-center"
      >
        <Row className="gap-4 w-full flex flex-col justify-center items-center">
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
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
