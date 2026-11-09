
"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = trailRef.current;
    if (!layer) return;

    let lastParticle = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastParticle < 18) return;
      lastParticle = now;

      const particle = document.createElement("span");
      particle.className = "comet-particle";

      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;

      layer.appendChild(particle);

      particle.addEventListener("animationend", () => particle.remove());
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={trailRef} className="comet-layer" aria-hidden="true" />;
}
