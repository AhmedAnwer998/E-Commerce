import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import footerpattern from "/images/footer-pattern.jpg";

const bgImagg = {
    backgroundImage: `url(${footerpattern})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
}



const Footer = () => {
  return (
    <div style={bgImagg} className="h-96 w-screen ">
      <Container className="h-96  ">
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
