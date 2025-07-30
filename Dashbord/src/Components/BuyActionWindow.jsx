import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const windowRef = useRef(null);
  const context = useContext(GeneralContext);

  const brokeragePerStock = 50;
  const totalPrice = stockQuantity * stockPrice;
  const brokerage = stockQuantity * brokeragePerStock;
  const requiredAmount = totalPrice + brokerage;

  // Fetch stock price from backend
  useEffect(() => {
    console.log("BuyActionWindow received uid:", uid);
    if (!uid) {
      toast.error("Invalid stock data");
      return;
    }

    setIsLoading(true);
    axios
      .get(`https://stock-monitoring-tool-9s17.onrender.com/getStockPrice?name=${encodeURIComponent(uid)}`)
      .then((res) => {
        console.log("Fetched price:", res.data);
        if (res.data.price) {
          setStockPrice(res.data.price);
        } else {
          toast.error("Stock price not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching stock price:", error);
        toast.error("Failed to fetch stock price");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uid]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        context.closeBuyWindow();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [context]);

  // Handle buy button click
  const handleBuyClick = async (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(enteredAmount);

    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (parsedAmount !== requiredAmount) {
      toast.error(
        `Please enter a valid amount. Required: ₹${totalPrice} (stock) + ₹${brokerage} (brokerage) = ₹${requiredAmount.toFixed(2)}/-`
      );
      return;
    }

    try {
      await axios.post("https://stock-monitoring-tool-9s17.onrender.com/newOrder", {
        name: uid, // Use uid directly as the stock name
        qty: stockQuantity,
        price: stockPrice,
        amount: requiredAmount,
        mode: "BUY",
      });

      toast.success("Order placed successfully!");
      window.location.href = "https://stock-monitoring-tool-pink.vercel.app/orders";
      setTimeout(() => context.closeBuyWindow(), 500);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <form onSubmit={handleBuyClick} className="regular-order" ref={windowRef}>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              max="5"
              value={stockQuantity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1 && value <= 5) {
                  setStockQuantity(value);
                }
              }}
              required
            />
          </fieldset>

          <fieldset>
            <legend>Enter Amount</legend>
            <input
              type="number"
              step="0.01"
              value={enteredAmount}
              onChange={(e) => setEnteredAmount(e.target.value)}
              placeholder={`₹${requiredAmount.toFixed(2)}`}
              required
            />
          </fieldset>
        </div>

        <div className="summary">
          <p><strong>Stock:</strong> {uid || "N/A"}</p>
          <p>
            <strong>Unit Price:</strong>{" "}
            {isLoading ? "Loading..." : `₹${stockPrice.toFixed(2)}`}
          </p>
          <p>
            <strong>Total Price (Qty × Price):</strong> ₹{totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Brokerage:</strong> ₹{brokerage.toFixed(2)}
          </p>
          <span>
            <strong>Margin required:</strong> ₹{requiredAmount.toFixed(2)}
          </span>
        </div>

        <div className="buttons">
          <button
            type="submit"
            className="btn btn-blue"
            disabled={isLoading || stockPrice === 0}
          >
            {isLoading ? "Loading..." : "Buy"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={context.closeBuyWindow}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default BuyActionWindow;
