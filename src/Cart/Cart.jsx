import React, { useContext } from "react";
import { ProductContext } from "../ProductContext/ProductContext";
import { Container, Row, Col } from "react-bootstrap";

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

  return (
    <Container>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>ur cart is empty</p>
      ) : (
        <Row className="flex ">
          {cart.map((product, index) => (
            <React.Fragment key={product.id}>
              <Row>
                <Col xl={2} className="">
                  <div className=" h-52 w-52 flex items-center justify-center py-1">
                    <img
                      src={product.image}
                      style={{ width: "300px" }}
                      alt={product.description}
                      className="py-2 h-full object-contain bg-gray-200-300 hover:bg-slate-100 duration-300 rounded-md transition-all"
                    />
                  </div>
                </Col>
                <Col
                  xl={4}
                  className="flex items-start justify-start bg-gray-200-300 hover:bg-slate-100 duration-300 rounded-md transition-all"
                >
                  <div className=" w-full flex flex-col justify-start">
                    <p className="w-full overflow-hidden text-ellipsis text-lg font-semibold whitespace-normal line-clamp-2 ">
                      {product.description}{" "}
                    </p>
                    <p className="bg-orange-400 hover:bg-orange-300 w-20 rounded-2xl text-center text-white">
                      Qty: {product.quantity}{" "}
                    </p>

                    <div className="flex gap-2">
                      <button
                        className="bg-amber-300 hover:bg-amber-400 active:bg-amber-200 text-white text-center rounded-md w-7 px-1 py-1"
                        onClick={() => handleIncreaseQuantity(product.id)}
                      >
                        +
                      </button>
                      <button
                        className="bg-amber-300 hover:bg-amber-400 active:bg-amber-200 text-white text-center rounded-md w-7 px-1 py-1"
                        onClick={() => handleDecreaseQuantity(product.id)}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <button
                        className="text-red-500 active:text-slate-400 transition-all duration-300"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                </Col>
                <Col
                  xl={3}
                  className=" flex justify-end bg-gray-200-300 hover:bg-slate-100 duration-300 rounded-md transition-all"
                >
                  <p className="font-bold text-lg">
                    Price: ${product.price.toFixed(2)}
                  </p>
                </Col>
                {index === 0 && (
                  <Col
                    xl={3}
                    className="shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center rounded-lg"
                  >
                    <h2>Items: {calculateTotalQuantities()}</h2>
                    <h2>Subtotal: ${calculateSubTotal()}</h2>
                    <button className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300">
                      Proceed To Buy
                    </button>
                  </Col>
                )}
              </Row>
            </React.Fragment>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Cart;
