import { useState } from "react";
import LandingPage from "./LandingPage";
import Builder from "./Builder";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <>
      {currentView === "landing" && (
        <LandingPage onStart={() => setCurrentView("builder")} />
      )}
      
      {currentView === "builder" && (
        <Builder onHome={() => setCurrentView("landing")} />
      )}
    </>
  );
}
