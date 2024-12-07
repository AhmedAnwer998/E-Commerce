import { createContext, useState, useEffect } from "react";
import { message } from "antd";


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  // Ant Design Message

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {

    

    messageApi.open({
      type: "success",
      content: `Added to your cart!`,
      style: {
        right: "20px", // Push the message to the right
        position: "relative", // Keep natural stacking, adjust visual position
        textAlign: "right", // Ensure text is right-aligned
      },
    });
  };

  // Fetch products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);

        const uniqueCategories = [
          "all",
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(" Error fetching products : ", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    success(product.title);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  const calculateTotalQuantities = () => {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        contextHolder,
        products,
        selectedProduct,
        setSelectedProduct,
        calculateTotalQuantities,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        categories,
      }}
    >
      {contextHolder}
      {children}
    </ProductContext.Provider>
  );
};
