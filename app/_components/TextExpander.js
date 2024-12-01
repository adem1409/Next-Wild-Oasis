"use client";
import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";
  return (
    <>
      {displayText}{" "}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </>
  );
}

export default TextExpander;
