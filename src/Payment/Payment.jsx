// import React, { useContext } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { ProductContext } from "../ProductContext/ProductContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Payment = () => {
//   const { cart, calculateSubTotalPrice } = useContext(ProductContext);
//   const navigate = useNavigate(); 

//   const handletoken = async (token) => {
//     const cartDetails = {
//       name: "All Products",
//       totalPrice: calculateSubTotalPrice(cart),
//     };
//     try {
//       const response = await axios.post("http://localhost:8081/checkout", {
//         token,
//         cart: cartDetails,
//       });
//       const { status } = response.data;

//       if (status === "success") {
//         await clearCartInFirebase(); // Clear the cart in Firebase
//         toast.success("Your order has been placed successfully!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         navigate("/");

//       } else {
//         toast.error("Payment failed. Please try again.", {
//           position: "top-right",
//           autoClose: 5000,
//         });
//       }
//     } catch (error) {
//       console.error("Payment error: ", error);
//       toast.error("An error occurred during the payment process.", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     }
//   };

//   return (
//     <div>
//       <StripeCheckout
//         stripeKey="pk_test_51QVoljFHGnkbxB3AopE2T5X9YqMIvFgVfuhf916MVkwVy1EnWJKDVf5NX0ww0kM6cTneV9Nihk8lYGH47HaBhma800uZqye7Rx"
//         token={handletoken}
//         billingAddress
//         shippingAddress
//         name="All Products"
//         amount={calculateSubTotalPrice(cart) * 100}
//       >
//         <button className="mt-2 px-4 py-2 bg-amber-500 text-white no-underline rounded-full hover:bg-amber-600 transition-all duration-300">
//           Pay Now
//         </button>
//       </StripeCheckout>
//     </div>
//   );
// };

// export default Payment;
