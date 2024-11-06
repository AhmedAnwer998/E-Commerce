import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ cart, setCart ] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(" Error fetching products : ", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product)=>{
const existingProduct = cart.find((item) => item.id === product.id);

if(existingProduct){
  setCart(
    cart.map((item)=>
    item.id === product.id ?{...item, quantity: item.quantity + 1}: item
    )
  );
} else {
  setCart([...cart, {...product, quantity: 1}]);
}
  };
const removeFromCart = (productId)=>{
  setCart(cart.filter((product) => product.id !== productId));
}

const increaseQuantity = (productId) => {
  setCart(
    cart.map((item) => item.id === productId ? {...item, quantity: item.quantity + 1} : item
  )
  );
};

const decreaseQuantity = (productId) => {
  const product = cart.find((item) => item.id === productId);
  if(product.quantity > 1){
    setCart(
      cart.map((item) => item.id === productId ? {...item, quantity: item.quantity - 1} : item
    )
    );
  } else {
    removeFromCart(productId);
  }
};

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
