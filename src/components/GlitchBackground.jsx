"use client";
import React, { useEffect, useState } from "react";

const GlitchBackground = () => {
  const [glitches, setGlitches] = useState([]);

  useEffect(() => {
    const createGlitch = () => ({
      id: Math.random(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 20 + 10}px`,
      height: `${Math.random() * 10 + 5}px`,
      animationDuration: `${Math.random() * 0.5 + 0.3}s`,
    });

    const addGlitchPeriodically = () => {
      const newGlitch = createGlitch();
      setGlitches((currentGlitches) => [
        ...currentGlitches.slice(-50), // Keep a maximum of 50 glitch effects
        newGlitch,
      ]);
    };

    const interval = setInterval(addGlitchPeriodically, 200); // Add a glitch every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {glitches.map((glitch) => (
        <div
          key={glitch.id}
          className="absolute bg-glitch"
          style={{
            top: glitch.top,
            left: glitch.left,
            width: glitch.width,
            height: glitch.height,
            animation: `glitch ${glitch.animationDuration} infinite ease-in-out`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default GlitchBackground;
