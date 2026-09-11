"use client"

import {useEffect} from "react";
import "./ThankYou.css";

const order_confirmed_gif: string =
  "https://iumlpfiybqlkwoscrjzt.supabase.co/storage/v1/object/public/other-assets//order-confirmed.gif";

export default function Page() {
  // Clear basket on load.
  useEffect(() => {
    localStorage.removeItem("basket");
    window.dispatchEvent(new CustomEvent("basketUpdate"));
  }, []);

  return ( <div className={"thanks-page"}>
      <div className="thanks-box neon-border">
        <div className="thanks-top">
          <div className="order-confirmed-gif-container">
            <img id="order-confirmed-gif" src={order_confirmed_gif} />
          </div>
        </div>
        <div className="thanks-bottom">
          <h1>Thank You So Much!</h1>
          <p>
            Your order has been placed! You'll receive a confirmation email soon
            and your items will arrive in a few days!
          </p>

          <button className="btn btn-primary" id="go-home" onClick={goHome}>
            Go Home
          </button>
        </div>
      </div>
      </div>
  );
}

function goHome() {
  window.location.href = "/";
}
