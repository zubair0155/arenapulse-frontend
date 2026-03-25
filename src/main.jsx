import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

/* Safer root container check */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container missing in index.html");
}

/* Create root only once */
const root = ReactDOM.createRoot(rootElement);

/* Scroll to top on route change (SEO + UX improvement) */
function ScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

/* Original render code preserved */
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

/* OPTIONAL PERFORMANCE MONITORING */
if (typeof window !== "undefined") {
  import("web-vitals")
    .then(({ getCLS, getFID, getLCP }) => {
      getCLS(console.log);
      getFID(console.log);
      getLCP(console.log);
    })
    .catch(() => {});
}