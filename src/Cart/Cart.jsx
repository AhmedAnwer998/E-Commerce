import React, { useContext } from "react";
import "./Cart.css";
import { ProductContext } from "../ProductContext/ProductContext";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(ProductContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const calculateSubTotal = () => {
    return cart
      .reduce((acc, product) => acc + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalQuantities = () => {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
  };


  const {isDarkMode} = useTheme();


  return (
    <div className={`cont py-4  ${isDarkMode ? "bg-dark text-gray-300" : ""}`}>
      <Container className="flex justify-center items-center">
        {cart.length === 0 ? (
          <h3
            className={`flex justify-center items-center text-center h-72 font-bold`}
          >
            Your Easy Shopping Cart is empty
          </h3>
        ) : (
          <Row className="flex">
            {cart.map((product, index) => (
              <React.Fragment key={product.id}>
                <Row>
                  <Col xl={2} md={4} className=" flex-1 p-0 mb-4">
                    <div className="imagee h-52 w-48 flex items-center justify-center ">
                      <img
                        src={product.image}
                        alt={product.description}
                        className={`py-2 w-full h-full object-contain ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} duration-300 rounded-md transition-all`}
                      />
                    </div>
                  </Col>
                  <Col
                    xl={6}
                    md={8}
                    className={`col2 flex flex-1 items-start justify-start h-52 mb-4 ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} duration-300 rounded-md transition-all`}
                  >
                    <div className=" w-full flex flex-col justify-start">
                      <p className="desc w-full overflow-hidden text-ellipsis text-lg font-semibold whitespace-normal line-clamp-2 ">
                        {product.description}{" "}
                      </p>
                      <p className="prr font-bold text-lg">
                        Price: ${product.price.toFixed(2)}
                      </p>
                      <p className="qty bg-orange-400 hover:bg-orange-300 w-20 rounded-2xl text-center text-white">
                        Qty: {product.quantity}{" "}
                      </p>

                      <div className=" flex gap-2">
                        <button
                          className="plus bg-amber-300 hover:bg-amber-400 active:bg-amber-200 text-white text-center rounded-md w-7 px-1 py-1"
                          onClick={() => handleIncreaseQuantity(product.id)}
                        >
                          +
                        </button>
                        <button
                          className="minus bg-amber-300 hover:bg-amber-400 active:bg-amber-200 text-white text-center rounded-md w-7 px-1 py-1"
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          -
                        </button>
                      </div>
                      <div>
                        <button
                          className="remove text-red-500 text-sm active:text-slate-400 transition-all duration-300"
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    </div>
                  </Col>
                  {/* <Col
                    xl={3} md={4}
                    className={`flex flex-1 justify-end h-52 ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} duration-300 rounded-md transition-all`}
                  >
               
                  </Col> */}
                  {index === 0 && (
                    <Col
                      xl={4}
                      md={12}
                      className={`total mb-2 h-52 shadow-md ${isDarkMode ? "hover:bg-slate-800 hover:shadow-xl" : "hover:bg-slate-100 hover:shadow-xl"} transition-all duration-300 flex flex-col items-center rounded-lg`}
                    >
                      <h2>Items: {calculateTotalQuantities()}</h2>
                      <h2>Subtotal: ${calculateSubTotal()}</h2>
                      <Link
                        to={`/SignIn`}
                        className="mt-2 px-4 py-2 bg-amber-500 text-white no-underline rounded-full hover:bg-amber-600 transition-all duration-300"
                      >
                        Proceed To Buy
                      </Link>
                    </Col>
                  )}
                </Row>
              </React.Fragment>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
