import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const NavBar = () => {
  return (
    <Container fluid className="">
      <Row>
        <Col className="flex justify-between align-middle bg-yellow-500 py-2 items-center px-3 ">
          <Link
            to="/"
            className="hover:brightness-50 active:scale-95 transition-all duration-300 font-bold text-2xl sm:text-3xl flex no-underline text-black"
          >
            <img src={logo} alt="logo" className="w-10" />
            Easy Shopping{" "}
          </Link>
          <Link to="/Cart" className="flex hover:brightness-50 active:scale-95 transition-all duration-300 no-underline w-32 text-white p-2 rounded-full justify-center bg-orange-600">
            <FaCartPlus className="text-xl" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
