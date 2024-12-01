"use client";
import { createContext, useContext, useState } from "react";

const reservationContext = createContext();
const initialState = { from: undefined, to: undefined };
function ReservationContext({ children }) {
  const [range, setRange] = useState(initialState);
  function resetRange() {
    setRange(initialState);
  }
  return (
    <reservationContext.Provider value={{ range, resetRange, setRange }}>
      {children}
    </reservationContext.Provider>
  );
}

export default ReservationContext;

export function useReservationContext() {
  const context = useContext(reservationContext);
  if (!context)
    throw new Error("ReservationContext used outside of its Provider! ");
  return context;
}
