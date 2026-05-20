import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

function mountApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("React root element #root was not found.");
    return;
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
