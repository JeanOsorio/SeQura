import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const seQuraConfig = {};

let container;
let root;

function mount() {
  container = document.getElementById("SeQura");
  root = createRoot(container);
  root.render(
    <App merchantId={seQuraConfig.merchantId} />,
  );
}

export function unmount() {
  window.removeEventListener("DOMContentLoaded", mount);
  root.unmount();
}

export function init() {
  if (arguments.length === 0 || !arguments[0].merchantId) {
    console.error("Your SeQura API token is required");
    return;
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
}
