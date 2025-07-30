import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [sellQuantities, setSellQuantities] = useState({});

  const fetchOrders = () => {
    axios
      .get("https://stock-monitoring-tool-9s17.onrender.com/allOrder")
      .then((res) => {
        console.log("Fetched Orders:", res.data);
        setAllOrder(res.data);

        const defaultQuantities = {};
        res.data.forEach((order) => {
          defaultQuantities[order._id] = 1;
        });
        setSellQuantities(defaultQuantities);
      })
      .catch((err) => {
        console.log("Fetch Orders Error:", err);
        toast.error("Failed to load orders: " + (err.message || "Unknown error"));
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSell = (id) => {
    const qty = parseInt(sellQuantities[id]);
    const order = allOrder.find((o) => o._id === id);

    if (!order || qty < 1 || qty > order.qty) {
      toast.error("Invalid quantity selected.");
      return;
    }

    const unitPrice = order.price / order.qty;
    const brokerage = 50;
    const finalSellPrice = unitPrice * qty - brokerage * qty;

    axios
      .post("https://stock-monitoring-tool-9s17.onrender.com/sellOrder", {
        id,
        sellQty: qty,
        sellPrice: finalSellPrice,
      })
      .then(() => {
        toast.success(`Sold for ₹${finalSellPrice.toFixed(2)}`);
        fetchOrders();
      })
      .catch((err) => {
        console.log("Sell Error:", err);
        console.log("Sell Error Response:", err.response);
        let errorMessage = "Unknown error";
        if (err.response) {
          if (err.response.status === 404) {
            errorMessage = "Sell endpoint not found. Please check the server configuration.";
          } else if (err.response.status === 400) {
            errorMessage = err.response.data.message || "Invalid request";
          } else {
            errorMessage = err.response.data.message || "Server error";
          }
        } else if (err.request) {
          errorMessage = "Network error: Unable to reach the server";
        } else {
          errorMessage = "Request error: " + err.message;
        }
        toast.error("Sell failed: " + errorMessage);
      });
  };

  return (
    <div className="orders">
      <ToastContainer position="top-center" autoClose={3000} />

      {allOrder.length === 0 ? (
        <div className="no-orders">
          <h3>You haven't placed any orders</h3>
        </div>
      ) : (
        <div className="order-list">
          {allOrder.map((order) => {
            const sellQty = parseInt(sellQuantities[order._id]) || 1;
            const unitPrice = order.price / order.qty;
            const brokerage = 50;
            const finalSellPrice = unitPrice * sellQty - brokerage * sellQty;

            return (
              <div key={order._id} className="order-card">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Qty:</strong> {order.qty}</p>
                <p><strong>Price:</strong> ₹{order.price}</p>
                <p><strong>Mode:</strong> {order.mode}</p>

                <label>
                  Sell Quantity:
                  <input
                    type="number"
                    min="1"
                    max={order.qty}
                    value={sellQuantities[order._id] || 1}
                    onChange={(e) =>
                      setSellQuantities({
                        ...sellQuantities,
                        [order._id]: e.target.value,
                      })
                    }
                  />
                </label>

                <p>
                  You will receive: <strong>₹{finalSellPrice.toFixed(2)}</strong>
                </p>

                <button onClick={() => handleSell(order._id)} className="btn btn-sell">
                  Sell
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
