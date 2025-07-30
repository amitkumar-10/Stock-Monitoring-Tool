import React from "react";

function RightSection({ productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
        </div>
      </div>
    </div>
  );
}

export default RightSection;