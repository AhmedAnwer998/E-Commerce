import React from "react";
import { useCheckout } from "@stripe/react-stripe-js";

const PayButton = () => {
  const { confirm } = useCheckout();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleClick = () => {
    setLoading(true);
    confirm().then((result) => {
      if (result.type === "error") {
        setError(result.error);
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>{error.message}</div>
      )}
    </div>
  );
};

export default PayButton;
