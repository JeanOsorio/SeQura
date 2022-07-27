import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const seQuraConfig = {};

let container;
let root;

let updatePriceEvent;

function mount() {
  container = document.getElementById("SeQura");
  root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App
        merchantId={seQuraConfig.merchantId}
        updatePriceEvent={updatePriceEvent}
      />
    </React.StrictMode>,
  );
}

export function totalAmount(totalAmount) {
  if (isNaN(parseInt(totalAmount))) {
    // console.error("totalAmount argument must be a number");
    throw new Error("totalAmount argument: must be a number");
  }
  updatePriceEvent = new CustomEvent("UpdatePrice", {
    detail: {
      totalAmount: parseInt(totalAmount.toString().replace(",", "").replace(".", "")),
    },
  });
  window.dispatchEvent(updatePriceEvent);
}

export function unmount() {
  window.removeEventListener("DOMContentLoaded", mount);
  window.removeEventListener("UpdatePrice", updatePriceEvent);
  root.unmount();
}

export function init() {
  if (arguments.length === 0 || !arguments[0].merchantId) {
    throw new Error("Your SeQura API token is required");
  }

  if (typeof arguments[0] === "object") {
    seQuraConfig.merchantId = arguments[0].merchantId;
  } else if (typeof arguments[0] === "string") {
    merchantId = arguments[0];
  }

  window.addEventListener("DOMContentLoaded", mount);
}

if (process.env.NODE_ENV === "development") {
  mount();
  window.SeQura.totalAmount = totalAmount;
}
