import React from "react";
import "./styles.css";
export default function() {
  return (
    <svg viewBox="0 0 100 100">
      <g id="cross">
        <path d="M 10,10 l 80,80" stroke="#fff" strokeWidth="9" />
        <path d="M 90,10 l -80,80" stroke="#fff" strokeWidth="9" />
      </g>
    </svg>
  );
}
