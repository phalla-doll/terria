'use client';

import React, { useState, useRef, useEffect } from 'react';
import Map, { Marker, Popup, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Search, Bell, Calendar, Globe, SlidersHorizontal, Plus, Minus, Heart, X, Star, Users, BedDouble, Asterisk, Loader2, User, Settings, LogOut, Sun, Moon, Monitor } from 'lucide-react';
import Image from 'next/image';

// Mock data for map markers
const markers = [
  { id: 1, lat: 11.5515, lng: 104.9240, price: "$62.91", name: "BKK1 Luxury Condo", location: "Boeung Keng Kang 1, Phnom Penh", rating: 4.8, beds: 2, guests: 4, image: "https://picsum.photos/seed/villa1/400/300" },
  { id: 2, lat: 11.5721, lng: 104.9254, price: "$32.79", name: "Riverside Studio", location: "Daun Penh, Phnom Penh", rating: 4.5, beds: 1, guests: 2, image: "https://picsum.photos/seed/cabin1/400/300" },
  { id: 3, lat: 11.5404, lng: 104.9150, price: "$32.09", name: "Russian Market Loft", location: "Toul Tom Poung, Phnom Penh", rating: 4.9, beds: 3, guests: 6, image: "https://picsum.photos/seed/forest1/400/300" },
  { id: 4, lat: 11.5488, lng: 104.9350, price: "$116.64", name: "Bassac Lane Villa", location: "Tonle Bassac, Phnom Penh", rating: 4.2, beds: 1, guests: 2, image: "https://picsum.photos/seed/budget1/400/300" },
  { id: 5, lat: 11.5714, lng: 104.8950, price: "$42.76", name: "TK Modern House", location: "Tuol Kork, Phnom Penh", rating: 4.0, beds: 2, guests: 4, image: "https://picsum.photos/seed/camp1/400/300" },
  { id: 6, lat: 11.5950, lng: 104.9300, price: "$52.00", name: "Mekong View Apartment", location: "Chroy Changvar, Phnom Penh", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/river1/400/300" },
  { id: 7, lat: 11.5500, lng: 104.9400, price: "$91.16", name: "Diamond Island Suite", location: "Koh Pich, Phnom Penh", rating: 5.0, beds: 4, guests: 8, image: "https://picsum.photos/seed/luxury1/400/300" },
  { id: 8, lat: 11.5620, lng: 104.9160, price: "$20.84", name: "Olympic Stadium View", location: "7 Makara, Phnom Penh", rating: 4.3, beds: 1, guests: 2, image: "https://picsum.photos/seed/beach1/400/300" },
  { id: 9, lat: 11.5580, lng: 104.9280, price: "$77.98", name: "Independence Monument Penthouse", location: "Daun Penh, Phnom Penh", rating: 4.9, beds: 3, guests: 6, image: "https://picsum.photos/seed/cliff1/400/300" },
  { id: 10, lat: 11.5350, lng: 104.9200, price: "$39.69", name: "Cozy BKK3 Apartment", location: "Boeung Keng Kang 3, Phnom Penh", rating: 4.6, beds: 2, guests: 4, image: "https://picsum.photos/seed/farm1/400/300" },
  { id: 11, lat: 11.5680, lng: 104.9200, price: "$52.00", name: "Central Market Stay", location: "Daun Penh, Phnom Penh", rating: 4.8, beds: 2, guests: 4, image: "https://picsum.photos/seed/lake1/400/300" },
  { id: 12, lat: 11.5800, lng: 104.9100, price: "$27.98", name: "Wat Phnom Retreat", location: "Daun Penh, Phnom Penh", rating: 4.9, beds: 1, guests: 2, image: "https://picsum.photos/seed/hill1/400/300" },
  { id: 13, lat: 11.5450, lng: 104.9250, price: "$66.81", name: "BKK2 Modern Loft", location: "Boeung Keng Kang 2, Phnom Penh", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/loft1/400/300" },
  { id: 14, lat: 11.5650, lng: 104.8850, price: "$35.44", name: "Sen Sok City Apartment", location: "Sen Sok, Phnom Penh", rating: 4.5, beds: 1, guests: 2, image: "https://picsum.photos/seed/apt1/400/300" },
  { id: 15, lat: 11.5300, lng: 104.9300, price: "$43.48", name: "Chbar Ampov Home", location: "Chbar Ampov, Phnom Penh", rating: 4.6, beds: 2, guests: 4, image: "https://picsum.photos/seed/suburb1/400/300" },
  { id: 16, lat: 11.5850, lng: 104.9000, price: "$57.00", name: "Russey Keo Villa", location: "Russey Keo, Phnom Penh", rating: 4.8, beds: 3, guests: 6, image: "https://picsum.photos/seed/garden1/400/300" },
  { id: 17, lat: 13.3611, lng: 103.8595, price: "$98.03", name: "Angkor Wat View Resort", location: "Siem Reap, Cambodia", rating: 5.0, beds: 3, guests: 5, image: "https://picsum.photos/seed/ocean/400/300" },
  { id: 18, lat: 11.5550, lng: 104.9100, price: "$18.51", name: "Backpacker Hostel", location: "7 Makara, Phnom Penh", rating: 4.1, beds: 1, guests: 1, image: "https://picsum.photos/seed/hostel1/400/300" },
  { id: 19, lat: 10.6104, lng: 104.1815, price: "$41.31", name: "River Lodge", location: "Kampot, Cambodia", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/eco1/400/300" },
  { id: 20, lat: 10.4820, lng: 104.3160, price: "$83.04", name: "Crab Market Villa", location: "Kep, Cambodia", rating: 4.4, beds: 2, guests: 4, image: "https://picsum.photos/seed/village1/400/300" },
  { id: 21, lat: 11.5200, lng: 104.9400, price: "$26.59", name: "Mekong Island Stay", location: "Koh Dach, Phnom Penh", rating: 4.0, beds: 1, guests: 2, image: "https://picsum.photos/seed/tent1/400/300" },
  { id: 22, lat: 11.5750, lng: 104.9350, price: "$94.54", name: "Luxury Riverfront", location: "Chroy Changvar, Phnom Penh", rating: 4.9, beds: 2, guests: 4, image: "https://picsum.photos/seed/glamp1/400/300" },
  { id: 23, lat: 11.5420, lng: 104.9220, price: "$70.82", name: "BKK1 Boutique Hotel", location: "Boeung Keng Kang 1, Phnom Penh", rating: 4.8, beds: 3, guests: 6, image: "https://picsum.photos/seed/tea1/400/300" },
  { id: 24, lat: 11.5600, lng: 104.9300, price: "$19.89", name: "Simple Room Riverside", location: "Daun Penh, Phnom Penh", rating: 4.2, beds: 1, guests: 2, image: "https://picsum.photos/seed/room1/400/300" },
  { id: 25, lat: 11.5530, lng: 104.9260, price: "$54.56", name: "City Center Condo", location: "Boeung Keng Kang 1, Phnom Penh", rating: 4.6, beds: 2, guests: 4, image: "https://picsum.photos/seed/condo1/400/300" },
  { id: 26, lat: 11.5480, lng: 104.9180, price: "$63.06", name: "TTP View Apt", location: "Toul Tom Poung, Phnom Penh", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/apt2/400/300" },
  { id: 27, lat: 11.5650, lng: 104.9150, price: "$49.82", name: "Quiet House", location: "7 Makara, Phnom Penh", rating: 4.5, beds: 2, guests: 4, image: "https://picsum.photos/seed/house1/400/300" },
  { id: 28, lat: 11.5380, lng: 104.9280, price: "$59.30", name: "Traditional Villa", location: "Tonle Bassac, Phnom Penh", rating: 4.8, beds: 3, guests: 6, image: "https://picsum.photos/seed/villa2/400/300" },
  { id: 29, lat: 11.5780, lng: 104.9220, price: "$15.34", name: "Budget Inn", location: "Daun Penh, Phnom Penh", rating: 4.0, beds: 1, guests: 2, image: "https://picsum.photos/seed/inn1/400/300" },
];

const mapStyles = {
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
};

export default function Dashboard() {
  const [selectedMarker, setSelectedMarker] = useState<typeof markers[0] | null>(null);
  const [mapStyle, setMapStyle] = useState(mapStyles.light);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMapStyle(isDark ? mapStyles.dark : mapStyles.light);
  }, [isDark]);

  const handleZoomIn = () => {
    setIsMapLoading(true);
    mapRef.current?.zoomIn({ duration: 500 });
  };

  const handleZoomOut = () => {
    setIsMapLoading(true);
    mapRef.current?.zoomOut({ duration: 500 });
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden font-sans antialiased transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-[#F7F7F5]'}`}>
      {/* Top Nav */}
      <header className="absolute top-6 left-0 w-full z-20 px-6 pointer-events-none">
        <div className={`max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-1.5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] rounded-full pointer-events-auto border transition-colors duration-500 ${isDark ? 'bg-gray-900/90 border-white/5' : 'bg-white/95 border-white/20'}`}>
          {/* Logo */}
          <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
            <Asterisk className="w-6 h-6 fill-current" />
            <span className={`transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Terria</span>
          </div>

          {/* Refined Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className={`relative flex items-center w-full rounded-full border transition-all duration-500 ${isDark ? 'bg-gray-800 border-gray-700 focus-within:bg-gray-800 focus-within:border-gray-600' : 'bg-gray-100 border-transparent focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-sm'}`}>
              <Search className={`w-4 h-4 absolute left-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input 
                type="text" 
                placeholder="Search a vibe, location, or paste image link..." 
                className={`w-full pl-11 pr-12 py-2 bg-transparent text-sm focus:outline-none transition-colors duration-500 ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
              />
              <button className={`absolute right-2 p-1.5 rounded-full border transition-all duration-300 group ${isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <SlidersHorizontal className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className={`p-2 rounded-full transition-all duration-300 relative group ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Bell className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
              <span className={`absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 ${isDark ? 'border-gray-900' : 'border-white'}`}></span>
            </button>
            <div className={`relative flex items-center pl-2 border-l transition-colors duration-500 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="outline-none rounded-full focus:ring-2 focus:ring-red-500 transition-all"
              >
                <Image src="https://picsum.photos/seed/avatar/32/32" alt="Avatar" width={32} height={32} className="rounded-full hover:opacity-80 transition-opacity" referrerPolicy="no-referrer" />
              </button>
              
              {showProfileMenu && (
                <div className={`absolute top-full right-0 mt-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border overflow-hidden w-48 z-50 transition-colors duration-500 ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-black/5'}`}>
                  <div className={`px-4 py-3 border-b transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                    <p className={`text-sm font-medium transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Mantha</p>
                    <p className={`text-xs truncate transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>mantha@dev.com</p>
                  </div>
                  <div className="py-1">
                    <button className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <Heart className="w-4 h-4" />
                      Saved
                    </button>
                    <button className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>
                  <div className={`py-1 border-t transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                    <div className={`px-4 py-2 flex items-center justify-between transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-sm flex items-center gap-2">
                        {theme === 'light' ? <Sun className="w-4 h-4" /> : theme === 'dark' ? <Moon className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                        Theme
                      </span>
                      <div className={`flex items-center rounded-full p-0.5 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                        <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? (isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm') : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                          <Sun className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setTheme('system')} className={`p-1.5 rounded-full transition-colors ${theme === 'system' ? (isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm') : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? (isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm') : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                          <Moon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`py-1 border-t transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                    <button className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'}`}>
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col">
        {/* Map Container */}
        <div className="flex-1 w-full relative">
          {/* Loading Indicator */}
          <div 
            className={`absolute top-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border flex items-center gap-2 text-sm font-medium z-20 transition-all duration-500 ${
              isMapLoading ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            } ${isDark ? 'bg-gray-900/90 border-white/10 text-gray-300' : 'bg-white/90 border-black/5 text-gray-600'} backdrop-blur-md`}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Updating map...</span>
          </div>

          <Map
            ref={mapRef}
            initialViewState={{
              longitude: 104.9282,
              latitude: 11.5564,
              zoom: 13
            }}
            mapStyle={mapStyle}
            attributionControl={false}
            scrollZoom={true}
            dragPan={true}
            dragRotate={true}
            touchZoomRotate={true}
            onZoomStart={() => setIsMapLoading(true)}
            onIdle={() => setIsMapLoading(false)}
            onLoad={() => setIsMapLoading(false)}
          >
            {/* Markers */}
            {markers.map(marker => (
              <Marker key={marker.id} longitude={marker.lng} latitude={marker.lat} anchor="bottom">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMarker(marker);
                    setIsMapLoading(true);
                    mapRef.current?.flyTo({
                      center: [marker.lng, marker.lat],
                      zoom: 15,
                      duration: 1200,
                      essential: true
                    });
                  }}
                  className={`px-3 py-1.5 rounded-full shadow-md text-sm font-bold tabular-nums border transition-all duration-500 ${
                    selectedMarker?.id === marker.id 
                      ? (isDark ? 'bg-white text-gray-900 border-white scale-110 z-10 relative' : 'bg-gray-900 text-white border-gray-900 scale-110 z-10 relative')
                      : (isDark ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:scale-105' : 'bg-white text-gray-900 border-gray-200 hover:scale-105')
                  }`}
                >
                  {marker.price}
                </button>
              </Marker>
            ))}

            {/* Popup */}
            {selectedMarker && (
              <Popup
                longitude={selectedMarker.lng}
                latitude={selectedMarker.lat}
                anchor="bottom"
                offset={30}
                onClose={() => setSelectedMarker(null)}
                closeButton={false}
                className={isDark ? 'z-20 dark-popup' : 'z-20'}
                maxWidth="300px"
              >
                <div className={`rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden w-64 border transition-colors duration-500 ${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-black/5'}`}>
                  <div className="relative h-40 w-full">
                    <Image src={selectedMarker.image} alt={selectedMarker.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    <button 
                      className={`absolute top-3 right-3 p-1.5 backdrop-blur-sm rounded-full transition-colors z-10 ${isDark ? 'bg-gray-900/80 hover:bg-gray-900 text-gray-300' : 'bg-white/80 hover:bg-white text-gray-700'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button className={`absolute top-3 right-10 p-1.5 backdrop-blur-sm rounded-full transition-colors z-10 ${isDark ? 'bg-gray-900/80 hover:bg-gray-900 text-gray-300' : 'bg-white/80 hover:bg-white text-gray-700'}`}>
                      <Heart className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                      <div className={`flex items-center gap-1 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium tabular-nums transition-colors duration-500 ${isDark ? 'bg-gray-900/90 text-gray-300' : 'bg-white/90 text-gray-700'}`}>
                        <Users className="w-3 h-3" /> {selectedMarker.guests}
                      </div>
                      <div className={`flex items-center gap-1 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium tabular-nums transition-colors duration-500 ${isDark ? 'bg-gray-900/90 text-gray-300' : 'bg-white/90 text-gray-700'}`}>
                        <BedDouble className="w-3 h-3" /> {selectedMarker.beds}
                      </div>
                      <div className={`flex items-center gap-1 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium tabular-nums transition-colors duration-500 ${isDark ? 'bg-gray-900/90 text-gray-300' : 'bg-white/90 text-gray-700'}`}>
                        <Star className="w-3 h-3" /> {selectedMarker.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={`font-semibold text-balance transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedMarker.name}</h3>
                    <p className={`text-sm truncate transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{selectedMarker.location}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className={`font-bold tabular-nums transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedMarker.price}</span>
                      <span className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/ night</span>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Map>

          {/* Map Controls (Right) */}
          <div className="absolute top-24 right-6 flex flex-col gap-2 z-10">
            <div className={`flex flex-col rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] border overflow-hidden mt-2 transition-colors duration-500 ${isDark ? 'bg-gray-900 border-white/5' : 'bg-white border-black/5'}`}>
              <button 
                onClick={handleZoomIn}
                className={`p-2.5 transition-colors border-b group ${isDark ? 'hover:bg-gray-800 border-white/5' : 'hover:bg-gray-50 border-black/5'}`}
              >
                <Plus className={`w-5 h-5 transition-transform duration-300 group-active:scale-90 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
              <button 
                onClick={handleZoomOut}
                className={`p-2.5 transition-colors group ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
              >
                <Minus className={`w-5 h-5 transition-transform duration-300 group-active:scale-90 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panels */}
        <div className="absolute bottom-6 left-0 w-full px-6 z-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pointer-events-auto">
            {/* You Board */}
            <div className={`backdrop-blur-md rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border transition-colors duration-500 ${isDark ? 'bg-gray-900/90 border-white/5' : 'bg-white/95 border-white/20'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors duration-500 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className={`w-2.5 h-2.5 rounded-sm transition-colors duration-500 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                  </div>
                  <h3 className={`font-semibold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>You Board</h3>
                </div>
                <a href="#" className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                  View all &rarr;
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Board Items */}
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Image src="https://picsum.photos/seed/kampot/200/150" alt="Kampot" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold truncate transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Kampot Retreat</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className={`text-[10px] tabular-nums transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>124 Saved</span>
                      <button className={`w-4 h-4 flex items-center justify-center rounded-full transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Plus className={`w-3 h-3 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer delay-75">
                  <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Image src="https://picsum.photos/seed/kep/200/150" alt="Kep" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold truncate transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Kep Villas</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className={`text-[10px] tabular-nums transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>109 Saved</span>
                      <button className={`w-4 h-4 flex items-center justify-center rounded-full transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Plus className={`w-3 h-3 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer delay-150">
                  <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Image src="https://picsum.photos/seed/siemreap/200/150" alt="Siem Reap" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold truncate transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Siem Reap Stay</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className={`text-[10px] tabular-nums transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>78 Saved</span>
                      <button className={`w-4 h-4 flex items-center justify-center rounded-full transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Plus className={`w-3 h-3 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Create a Moodboard */}
            <div className={`backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border flex flex-col items-center justify-center text-center transition-colors duration-500 ${isDark ? 'bg-gray-900/90 border-white/5' : 'bg-white/95 border-white/20'}`}>
              <h3 className={`font-bold text-lg mb-2 text-balance transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Create a Moodboard</h3>
              <p className={`text-sm mb-6 max-w-xs text-pretty transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Plan and share your future travel dreams. Use a template or start from scratch.
              </p>
              <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgb(239,68,68,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgb(239,68,68,0.4)] active:scale-95 group">
                <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Trending Destinations */}
            <div className={`backdrop-blur-md rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border transition-colors duration-500 ${isDark ? 'bg-gray-900/90 border-white/5' : 'bg-white/95 border-white/20'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Asterisk className={`w-4 h-4 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <h3 className={`font-semibold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Trending Destinations</h3>
                </div>
                <a href="#" className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                  See all &rarr;
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Trending Items */}
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Image src="https://picsum.photos/seed/angkor/200/150" alt="Angkor Wat" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold truncate transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Angkor Wat</h4>
                    <span className={`text-[10px] truncate block transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Siem Reap, Cambodia</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer delay-75">
                  <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Image src="https://picsum.photos/seed/kohrong/200/150" alt="Koh Rong" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold truncate transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Island Beaches</h4>
                    <span className={`text-[10px] truncate block transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Koh Rong, Cambodia</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer delay-150">
                  <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Image src="https://picsum.photos/seed/mondulkiri/200/150" alt="Mondulkiri" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold truncate transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Rolling Hills</h4>
                    <span className={`text-[10px] truncate block transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mondulkiri, Cambodia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
