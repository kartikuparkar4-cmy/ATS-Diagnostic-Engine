import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.2],
      markerColor: [0.4, 0.4, 1],
      glowColor: [0.4, 0.4, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.08 }, // SF
        { location: [51.5074, -0.1278], size: 0.07 }, // London
        { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
        { location: [12.9716, 77.5946], size: 0.06 }, // Bangalore
        { location: [52.52, 13.405], size: 0.05 }, // Berlin
        { location: [40.7128, -74.006], size: 0.07 }, // NY
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [19.0760, 72.8777], size: 0.05 }, // Mumbai
        { location: [48.8566, 2.3522], size: 0.05 }, // Paris
        { location: [43.6532, -79.3832], size: 0.05 }, // Toronto
        { location: [30.2672, -97.7431], size: 0.04 }, // Austin
        { location: [-23.5505, -46.6333], size: 0.04 }, // Sao Paulo
        { location: [-33.9249, 18.4232], size: 0.03 }, // Cape Town
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be mutated in-place.
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      {/* Background Stars for Globe */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              '--duration': `${Math.random() * 3 + 2}s`,
              opacity: 0.4,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', maxWidth: '100%', aspectRatio: '1', position: 'relative', zIndex: 1 }}
      />
    </div>
  );
};
