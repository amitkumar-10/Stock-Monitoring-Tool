import React from "react";

function LeftSection({
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src="/media/images/coin.png" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Kite</h1>
          <p>
            Our ultra-fast flagship trading platform with streaming market data, 
            advanced charts, an elegant UI, and more. 
            Enjoy the Kite experience seamlessly on your Android and iOS devices.
          </p>
            
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;