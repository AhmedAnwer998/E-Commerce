import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { ProductContext } from "../ProductContext/ProductContext";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateSubTotalPrice,
    calculateTotalQuantities,
    clearCart,
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const auth = getAuth(); 

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Monitor authentication state
 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     setIsAuthenticated(!!user); // Set true if user exists
   });
   return () => unsubscribe();
 }, []);


  const handletoken = async (token) => {
    const cartDetails = {
      name: "All Products",
      totalPrice: calculateSubTotalPrice(cart),
    };
    try {
      const response = await axios.post("http://localhost:8081/checkout", {
        token,
        cart: cartDetails,
      });
      const { status } = response.data;

      if (status === "success") {

// Clear the cart in the local state
         console.log("Payment successful. Clearing cart...");
         await clearCartInFirebase(); // Clear Firebase cart if applicable
         clearCart(); // Clear local cart
         console.log("Cart after clearing:", cart);
     
        
        toast.success("Your order has been placed successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/");
      } else {
        toast.error("Payment failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Payment error: ", error);
      toast.error("An error occurred during the payment process.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const { isDarkMode } = useTheme();

  // payment

  const handleProceedToBuy = () => {
    if (isAuthenticated) {
      // User is signed in, proceed to payment
      toast.info("Proceeding to payment...");
    } else {
      // Redirect to SignIn page
      navigate("/SignIn");
    }
  };

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
                      <h2>Items: {calculateTotalQuantities(cart)}</h2>
                      <h2>Subtotal: ${calculateSubTotalPrice(cart)}</h2>
                      <div>
                        <StripeCheckout
                          stripeKey="pk_test_51QVoljFHGnkbxB3AopE2T5X9YqMIvFgVfuhf916MVkwVy1EnWJKDVf5NX0ww0kM6cTneV9Nihk8lYGH47HaBhma800uZqye7Rx"
                          token={handletoken}
                          billingAddress
                          shippingAddress
                          name="All Products"
                          amount={calculateSubTotalPrice(cart) * 100}
                        >
                          <button
                            onClick={() => handleProceedToBuy()}
                            className="mt-2 px-4 py-2 bg-amber-500 text-white no-underline rounded-full hover:bg-amber-600 transition-all duration-300"
                          >
                            Proceed To Buy
                          </button>
                        </StripeCheckout>
                      </div>
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
