import React, { useContext, useMemo } from "react";
import "./NavBar.css";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DarkMode from "../DarkMode/DarkMode";
import { VscAccount } from "react-icons/vsc";
import { ProductContext } from "../ProductContext/ProductContext";
import { useTheme } from "../ThemeContext/ThemeContext"; // Import the useTheme hook

const NavBar = () => {
  const { calculateTotalQuantities } = useContext(ProductContext);
  const { isDarkMode } = useTheme(); // Get isDarkMode from ThemeContext

  // Use useMemo to memoize the calculation of the cart quantity
  const cartQuantity = useMemo(
    () => calculateTotalQuantities(),
    [calculateTotalQuantities]
  );

  return (
    <Container fluid className={isDarkMode ? "bg-dark text-white" : ""}>
      <Row>
        <Col
          className={`flex justify-between align-middle z-20 ${
            isDarkMode
              ? "brightness-90 bg-yellow-700  text-white "
              : "bg-yellow-500 text-black"
          } items-center px-3`}
        >
          <Link
            to="/"
            className={`logo-name hover:brightness-75 active:scale-95 transition-all duration-300 font-bold text-2xl flex justify-center items-center no-underline ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <img src={logo} alt="logo" className="logo w-10" />
            Easy Shopping
          </Link>
          <div className="div1 flex items-center justify-between transition-all duration-300 rounded-full w-44 p-2">
            <div className="dark-mode mx-auto">{<DarkMode />}</div>
            <div
              className={`flex items-center justify-between transition-all duration-300 hover:brightness-75 rounded-full w-20 p-2 ${
                isDarkMode ? "bg-orange-700 brightness-90" : "bg-orange-600"
              }`}
            >
              <Link
                to="/Cart"
                className="flex active:scale-95 no-underline justify-center relative text-white"
              >
                <FaCartPlus className="text-xl" />
                {cartQuantity > 0 && (
                  <div className="flex justify-center items-center absolute top-[-10px] right-[-10px] w-5 h-5 rounded-full bg-amber-500 text-white">
                    {cartQuantity}
                  </div>
                )}
              </Link>
              <Link
                to="/SignIn"
                className="no-underline active:scale-95 text-white"
              >
                <VscAccount className="text-xl font-semibold" />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
