import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSequence.css';

// The exact sequence of words that flash on screen.
// Timer stops at the last entry ("ATHLOGIX" — final state).
const sequence = [
  { text: "Good Morning",        style: "" },
  { text: "Think Software?",     style: "" },
  { text: "Think",               highlight: "ATHLOGIX", style: "" },
  { text: "We Engineer",         style: "" },
  { text: "WEB APPLICATIONS",    style: "" },
  { text: "SCALABLE SYSTEMS",    style: "" },
  { text: "AI INTEGRATION",      style: "" },
  { text: "MOBILE APPS",         style: "" },
  { text: "CLOUD ARCHITECTURE",  style: "" },
  { text: "Let's Build",         style: "" },
  { text: "Your Digital Future", style: "" },
  { text: "ATHLOGIX",            style: "hero-sequence__text--final" },
];

// Concentric ring sizes (px) — massive filled circles, overflow the viewport
const RINGS = [1400, 1100, 800];

export default function HeroSequence() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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
        <div className={`hero-sequence__rings ${isFinished ? 'hero-sequence__rings--visible' : ''}`} aria-hidden="true">
          {RINGS.map((size, i) => (
            <div
              key={i}
              className="hero-sequence__ring"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transitionDelay: `${i * 0.12}s`,
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
