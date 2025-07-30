import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const StockList = () => {
  const context = useContext(GeneralContext);

  const stocks = [
    { name: "INFY" },
    { name: "RELIANCE" },
    // other stocks
  ];

  return (
    <div>
      {stocks.map((stock) => (
        <button
          key={stock.name}
          onClick={() => context.openBuyWindow(stock.name)} // Pass stock name as string
        >
          Buy {stock.name}
        </button>
      ))}
    </div>
  );
};

export default StockList;