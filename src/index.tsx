import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider, createTheme } from "@mantine/core";

import "@mantine/core/styles.css";
// Package styles for Mantine Calendar
import "@mantine/dates/styles.css";

// const theme = createTheme({
//   colors: {
//     // Add your color
//     deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
//     // or replace default theme color
//     blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
//   },
// })

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
