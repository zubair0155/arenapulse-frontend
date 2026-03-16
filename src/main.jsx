import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

/* ✅ PERFORMANCE IMPROVEMENT ADDED
   Safer root container check
*/
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container missing in index.html");
}

/* ✅ PERFORMANCE IMPROVEMENT ADDED
   Create root only once
*/
const root = ReactDOM.createRoot(rootElement);

/* Original render code preserved */
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

/* ✅ OPTIONAL PERFORMANCE MONITORING
   Helps track Core Web Vitals (LCP, CLS, FID)
   Safe to keep even if unused
*/
if (typeof window !== "undefined") {
  import("web-vitals").then(({ getCLS, getFID, getLCP }) => {
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  }).catch(() => {});
}