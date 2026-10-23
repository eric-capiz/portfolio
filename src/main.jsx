import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import App from "./App";

if (window.__blockedFromChatGPT) {
  // Arrived via ChatGPT: show a notice instead of the site.
  // App never mounts, so no analytics session is started either.
  const notice = document.createElement("div");
  notice.setAttribute(
    "style",
    "min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0b0b0f;color:#e8e8ea;font-family:system-ui,sans-serif;text-align:center;padding:24px;"
  );
  notice.innerHTML =
    "<p style='font-size:18px;line-height:1.6;max-width:420px;'>This portfolio isn't available when arriving from ChatGPT.<br />Please visit <strong>ericcapiz.com</strong> directly.</p>";
  document.body.appendChild(notice);
} else {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
