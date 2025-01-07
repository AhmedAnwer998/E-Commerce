import React from "react";
import { useCheckout } from "@stripe/react-stripe-js";

const EmailInput = () => {
  const checkout = useCheckout();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleBlur = () => {
    checkout.updateEmail(email).then((result) => {
      if (result.error) {
        setError(result.error);
      }
    });
  };

  const handleChange = (e) => {
    setError(null);
    setEmail(e.target.value);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ padding: "8px", margin: "5px 0", width: "100%" }}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  );
};

export default EmailInput;
