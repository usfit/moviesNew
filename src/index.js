import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import Movie from "./components/Movie";

function App() {
  return <Movie />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
