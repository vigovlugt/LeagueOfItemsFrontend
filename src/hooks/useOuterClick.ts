import {useEffect, useRef} from "react";

export default function useOuterClick(callback) {
  const callbackRef = useRef<Function>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<HTMLElement>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => { callbackRef.current = callback; });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (innerRef.current && callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}