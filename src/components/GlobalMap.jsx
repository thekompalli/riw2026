import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from 'react-simple-maps';
import clsx from 'clsx';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const GlobalMap = () => {
    const [hoveredLoc, setHoveredLoc] = useState(null);
    const [zoom, setZoom] = useState(1);

    // Real geographic coordinates [longitude, latitude]
    const locations = [
        { id: 1, name: "Lyon, France", coordinates: [4.8357, 45.7640], type: "hub", label: "Event Hub" },
        { id: 2, name: "Oxford, UK", coordinates: [-1.2577, 51.7520], type: "speaker", label: "Iyiola Oladunjoye" },
        { id: 3, name: "São Paulo, Brazil", coordinates: [-46.6333, -23.5505], type: "speaker", label: "Josselyn Yaguana" },
        { id: 4, name: "Dublin, Ireland", coordinates: [-6.2603, 53.3498], type: "speaker", label: "Sodiq Hameed" },
        { id: 5, name: "Manila, Philippines", coordinates: [120.9842, 14.5995], type: "speaker", label: "Dr. Christel Pao" },
        { id: 6, name: "Paris, France", coordinates: [2.3522, 48.8566], type: "speaker", label: "Cinthia Hernández" },
        { id: 7, name: "Waltham, USA", coordinates: [-71.2356, 42.3765], type: "speaker", label: "Sergio Linares" },
        { id: 8, name: "Stockholm, Sweden", coordinates: [18.0686, 59.3293], type: "speaker", label: "Florian Gegenfurtner" },
        { id: 9, name: "Hamburg, Germany", coordinates: [9.9937, 53.5511], type: "speaker", label: "Leonie Mayer" },
        { id: 10, name: "Saint-Étienne, France", coordinates: [4.3872, 45.4397], type: "speaker", label: "Beatriz Miguelena" },
    ];

    const hubLocation = locations.find(loc => loc.type === 'hub');

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden" style={{ backgroundColor: '#A5BFDD' }}>

                    {/* Map Container */}
                    <div className="absolute inset-0 p-4">
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{
                                scale: 180,
                                center: [0, 20]
                            }}
                            className="w-full h-full"
                        >
                            <ZoomableGroup
                                onMoveEnd={(position) => setZoom(position.zoom)}
                            >
                                <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#E8E3D3"
                                            stroke="#C8C3B3"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: 'none' },
                                                hover: { outline: 'none', fill: '#F5F4F0' },
                                                pressed: { outline: 'none' }
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            {/* Connection Lines */}
                            {locations.filter(l => l.type !== 'hub').map((loc) => (
                                <Line
                                    key={`line-${loc.id}`}
                                    from={loc.coordinates}
                                    to={hubLocation.coordinates}
                                    stroke="#fbbf24"
                                    strokeWidth={2 / zoom}
                                    strokeLinecap="round"
                                    opacity={0.5}
                                />
                            ))}

                            {/* Markers */}
                            {locations.map((loc) => (
                                <Marker
                                    key={loc.id}
                                    coordinates={loc.coordinates}
                                    onMouseEnter={() => setHoveredLoc(loc)}
                                    onMouseLeave={() => setHoveredLoc(null)}
                                >
                                    {loc.type === 'hub' ? (
                                        <>
                                            {/* Hub pulse effect */}
                                            <circle r={20 / zoom} fill="#fbbf24" opacity={0.3} className="animate-ping" />
                                            <circle r={12 / zoom} fill="#fbbf24" stroke="#fff" strokeWidth={3 / zoom} />
                                        </>
                                    ) : (
                                        <>
                                            {/* Speaker markers */}
                                            <circle r={3 / zoom} fill="#fbbf24" opacity={0.4} />
                                            <circle
                                                r={8 / zoom}
                                                fill="#fbbf24"
                                                stroke="#fff"
                                                strokeWidth={2 / zoom}
                                                className="transition-all duration-300 cursor-pointer"
                                                style={{
                                                    filter: `drop-shadow(0 0 ${10 / zoom}px rgba(251, 191, 36, 0.8))`
                                                }}
                                            />
                                        </>
                                    )}
                                </Marker>
                            ))}
                            </ZoomableGroup>
                        </ComposableMap>

                        {/* Tooltip Overlay */}
                        <AnimatePresence>
                            {hoveredLoc && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 shadow-2xl text-center z-50 pointer-events-none"
                                >
                                    <div className="text-white font-bold text-base mb-1">{hoveredLoc.label}</div>
                                    <div className="text-gold-400 text-xs font-bold uppercase tracking-wider">{hoveredLoc.name}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalMap;
