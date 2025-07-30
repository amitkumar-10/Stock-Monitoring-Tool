import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (stockName) => {},
  closeBuyWindow: () => {},
  openSellWindow: (stockName) => {},
  closeSellWindow: () => {},
  selectedStock: null,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleOpenBuyWindow = (stockName) => {
    setIsBuyWindowOpen(true);
    setSelectedStock(stockName); // Store stock name as a string
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStock(null);
  };

  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedSellStock, setSelectedSellStock] = useState(null);

  const handleOpenSellWindow = (stockName) => {
    setIsSellWindowOpen(true);
    setSelectedSellStock(stockName);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedSellStock(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        selectedStock,
      }}
    >
      {props.children}

      {/* Show Buy Window */}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStock} />}

      {/* Show Sell Window */}
      {isSellWindowOpen && <SellActionWindow uid={selectedSellStock} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;








