import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSequence.css';

// Concentric ring sizes (px) — massive filled circles, overflow the viewport
const RINGS = [1400, 1100, 800];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default function HeroSequence() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // The exact sequence of words that flash on screen.
  const sequence = React.useMemo(() => [
    { text: getGreeting(),         style: "", pulse: true },
    { text: "Think Software?",     style: "" },
    { text: "Think",               highlight: "ATHLOGIX", style: "", pulse: true },
    { text: "We Engineer",         style: "" },
    { text: "WEB APPLICATIONS",    style: "", pulse: true },
    { text: "SCALABLE SYSTEMS",    style: "" },
    { text: "AI INTEGRATION",      style: "", pulse: true },
    { text: "MOBILE APPS",         style: "" },
    { text: "CLOUD ARCHITECTURE",  style: "", pulse: true },
    { text: "Let's Build",         style: "" },
    { text: "Your Digital Future", style: "", pulse: true },
    { text: "ATHLOGIX",            style: "hero-sequence__text--final" },
  ], []);

  const isFinished = currentIndex === sequence.length - 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev < sequence.length - 1 ? prev + 1 : 0
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const current = sequence[currentIndex];

  return (
    <div className="hero-sequence-wrapper">
      <div className="hero-sequence" id="hero-sequence" aria-label="Kinetic typography intro">

        {/* ---- Concentric circle rings (DO Studio style) ---- */}
        <div 
          key={`rings-${currentIndex}`}
          className={`hero-sequence__rings ${isFinished ? 'hero-sequence__rings--final' : (current.pulse ? 'hero-sequence__rings--pulse' : '')}`} 
          aria-hidden="true"
        >
          {RINGS.map((size, i) => (
            <div
              key={i}
              className="hero-sequence__ring"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        {/*
          key={currentIndex} forces React to unmount / remount the <h1>,
          which re-triggers the CSS blur-in animation on every word change.
        */}
        <h1
          key={currentIndex}
          className={`hero-sequence__text ${current.style}`}
        >
          {current.text}

          {/* Inline cyan highlight for the "Think ATHLOGIX" phrase */}
          {current.highlight && (
            <span className="hero-sequence__highlight">
              {current.highlight}
            </span>
          )}
        </h1>

      </div>
    </div>
  );
}
