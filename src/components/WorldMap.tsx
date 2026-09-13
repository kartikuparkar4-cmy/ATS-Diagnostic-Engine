import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export interface CompanyDetail {
  name: string;
  role: string;
  salary: string;
  description: string;
}

export interface LocationData {
  name: string;
  coords: [number, number];
  count: number;
  companies: CompanyDetail[];
}

const COMPANY_LOCATIONS: LocationData[] = [
  { 
    name: 'San Francisco, USA', 
    coords: [-122.4194, 37.7749], 
    count: 1240,
    companies: [
      { name: 'Google', role: 'Senior Software Engineer', salary: '$180k - $250k', description: 'Leading cloud infrastructure projects.' },
      { name: 'Meta', role: 'Product Designer', salary: '$160k - $220k', description: 'Designing next-gen social experiences.' },
      { name: 'Salesforce', role: 'Data Scientist', salary: '$150k - $210k', description: 'Optimizing CRM algorithms.' }
    ]
  },
  { 
    name: 'London, UK', 
    coords: [-0.1278, 51.5074], 
    count: 850,
    companies: [
      { name: 'DeepMind', role: 'AI Research Scientist', salary: '£120k - £180k', description: 'Developing AGI systems.' },
      { name: 'Revolut', role: 'Backend Developer', salary: '£90k - £140k', description: 'Scaling fintech infrastructure.' },
      { name: 'Deliveroo', role: 'Mobile Engineer', salary: '£85k - £130k', description: 'Enhancing logistics apps.' }
    ]
  },
  { 
    name: 'Bangalore, India', 
    coords: [77.5946, 12.9716], 
    count: 650,
    companies: [
      { name: 'Flipkart', role: 'Engineering Manager', salary: '₹40L - ₹70L', description: 'Managing e-commerce platforms.' },
      { name: 'Zomato', role: 'Full Stack Developer', salary: '₹25L - ₹45L', description: 'Building food delivery systems.' },
      { name: 'Infosys', role: 'Cloud Architect', salary: '₹30L - ₹55L', description: 'Designing enterprise cloud solutions.' }
    ]
  },
  { 
    name: 'Tokyo, Japan', 
    coords: [139.6503, 35.6762], 
    count: 540,
    companies: [
      { name: 'Sony', role: 'Hardware Engineer', salary: '¥8M - ¥14M', description: 'Next-gen gaming consoles.' },
      { name: 'Rakuten', role: 'DevOps Engineer', salary: '¥7M - ¥12M', description: 'Global e-commerce infrastructure.' },
      { name: 'Toyota', role: 'Embedded Systems Engineer', salary: '¥9M - ¥15M', description: 'Autonomous driving software.' }
    ]
  },
  { 
    name: 'Berlin, Germany', 
    coords: [13.4050, 52.5200], 
    count: 420,
    companies: [
      { name: 'SoundCloud', role: 'Audio Engineer', salary: '€75k - €110k', description: 'Optimizing audio streaming.' },
      { name: 'Zalando', role: 'Frontend Developer', salary: '€70k - €100k', description: 'Fashion e-commerce UI.' },
      { name: 'Delivery Hero', role: 'Security Engineer', salary: '€80k - €120k', description: 'Securing global delivery networks.' }
    ]
  }
];

interface WorldMapProps {
  onLocationSelect?: (location: LocationData) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ onLocationSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 960;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg.selectAll('*').remove();

    const projection = d3.geoNaturalEarth1()
      .scale(160)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const g = svg.append('g');

    // Load world map data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((data: any) => {
        const countries = topojson.feature(data, data.objects.countries) as any;

        // Draw countries
        g.selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', '#0f172a')
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 0.5)
          .attr('class', 'country-path');

        // Draw locations
        const locations = g.selectAll('.location')
          .data(COMPANY_LOCATIONS)
          .enter()
          .append('g')
          .attr('class', 'location');

      locations.append('circle')
        .attr('cx', d => projection(d.coords as [number, number])![0])
        .attr('cy', d => projection(d.coords as [number, number])![1])
        .attr('r', d => Math.sqrt(d.count) / 2)
        .attr('fill', '#6366f1')
        .attr('fill-opacity', 0.6)
        .attr('stroke', '#818cf8')
        .attr('stroke-width', 1)
        .attr('cursor', 'pointer')
        .on('click', (event, d) => {
          if (onLocationSelect) onLocationSelect(d);
        })
        .append('title')
        .text(d => `${d.name}: ${d.count} companies`);

      // Add pulse effect to major hubs
      locations.filter(d => d.count > 500)
        .append('circle')
        .attr('cx', d => projection(d.coords as [number, number])![0])
        .attr('cy', d => projection(d.coords as [number, number])![1])
        .attr('r', d => Math.sqrt(d.count) / 2)
        .attr('fill', 'none')
        .attr('stroke', '#6366f1')
        .attr('stroke-width', 1)
        .style('opacity', 0.8)
        .append('animate')
        .attr('attributeName', 'r')
        .attr('from', d => Math.sqrt(d.count) / 2)
        .attr('to', d => Math.sqrt(d.count))
        .attr('dur', '2s')
        .attr('repeatCount', 'indefinite');

      locations.filter(d => d.count > 500)
        .selectAll('circle:last-child')
        .append('animate')
        .attr('attributeName', 'opacity')
        .attr('from', 0.8)
        .attr('to', 0)
        .attr('dur', '2s')
        .attr('repeatCount', 'indefinite');
      })
      .catch(err => {
        console.error('Error loading map data:', err);
      });

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

  }, []);

  return (
    <div className="relative w-full bg-slate-950/50 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-white font-display font-bold text-lg">Global Company Network</h3>
        <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Real-time Location Pulse</p>
      </div>

      {/* Celestial Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background Galaxy */}
        <div className="galaxy galaxy-purple absolute -bottom-20 -left-20 w-[400px] h-[200px] opacity-10 blur-[100px]" />
        
        {/* Sun */}
        <div className="sun -top-10 -right-10 scale-50 opacity-40" />
        
        {/* Moon */}
        <div className="moon top-20 left-1/4 scale-[0.2] opacity-30" />

        {/* Shining Stars */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * (i % 5 === 0 ? 3 : 1.5) + 0.5}px`,
              height: `${Math.random() * (i % 5 === 0 ? 3 : 1.5) + 0.5}px`,
              '--duration': `${Math.random() * 3 + 2}s`,
              color: i % 4 === 0 ? '#818cf8' : i % 7 === 0 ? '#fae8ff' : '#ffffff',
              boxShadow: i % 5 === 0 ? '0 0 15px rgba(255, 255, 255, 0.8)' : 'none',
              zIndex: i % 5 === 0 ? 1 : 0,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <svg ref={svgRef} className="cursor-move relative z-0" />
      <div className="absolute bottom-4 right-6 text-[10px] text-slate-500 font-medium uppercase tracking-widest">
        Scroll to zoom • Drag to pan
      </div>
    </div>
  );
};
