'use client';

import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Search, Bell, Calendar, Globe, SlidersHorizontal, Layers, Plus, Minus, Heart, X, Star, Users, BedDouble, Asterisk } from 'lucide-react';
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

export default function Dashboard() {
  const [selectedMarker, setSelectedMarker] = useState<typeof markers[0] | null>(null);

  return (
    <div className="flex flex-col h-screen bg-[#F7F7F5] overflow-hidden font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
            <Asterisk className="w-6 h-6 fill-current" />
            <span className="text-gray-900">Terria</span>
          </div>

          {/* Refined Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative flex items-center w-full bg-gray-100 rounded-full border border-transparent focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-sm transition-all">
              <Search className="w-4 h-4 absolute left-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search a vibe, location, or paste image link..." 
                className="w-full pl-11 pr-12 py-2.5 bg-transparent text-sm focus:outline-none text-gray-900 placeholder-gray-500"
              />
              <button className="absolute right-2 p-1.5 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <Image src="https://picsum.photos/seed/avatar/32/32" alt="Avatar" width={32} height={32} className="rounded-full" referrerPolicy="no-referrer" />
              <span className="text-sm font-medium hidden sm:block">Alfikri Djati</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col">
        {/* Map Container */}
        <div className="flex-1 w-full relative">
          <Map
            initialViewState={{
              longitude: 104.9282,
              latitude: 11.5564,
              zoom: 13
            }}
            mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
            attributionControl={false}
          >
            {/* Markers */}
            {markers.map(marker => (
              <Marker key={marker.id} longitude={marker.lng} latitude={marker.lat} anchor="bottom">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMarker(marker);
                  }}
                  className={`px-3 py-1.5 rounded-full shadow-md text-sm font-bold border transition-transform ${
                    selectedMarker?.id === marker.id 
                      ? 'bg-gray-900 text-white border-gray-900 scale-110 z-10 relative' 
                      : 'bg-white text-gray-900 border-gray-200 hover:scale-105'
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
                className="z-20"
                maxWidth="300px"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-64 border border-gray-100">
                  <div className="relative h-40 w-full">
                    <Image src={selectedMarker.image} alt={selectedMarker.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    <button 
                      className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker(null);
                      }}
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="absolute top-3 right-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        <Users className="w-3 h-3" /> {selectedMarker.guests}
                      </div>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        <BedDouble className="w-3 h-3" /> {selectedMarker.beds}
                      </div>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        <Star className="w-3 h-3" /> {selectedMarker.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{selectedMarker.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{selectedMarker.location}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-bold text-gray-900">{selectedMarker.price}</span>
                      <span className="text-sm text-gray-500">/ night</span>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Map>

          {/* Map Controls (Right) */}
          <div className="absolute top-24 right-6 flex flex-col gap-2 z-10">
            <button className="p-2.5 bg-white rounded-xl shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
              <Layers className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex flex-col bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-2">
              <button className="p-2.5 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-50 transition-colors">
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panels */}
        <div className="absolute bottom-6 left-0 w-full px-6 z-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pointer-events-auto">
            {/* You Board */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-gray-300 rounded-sm"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900">You Board</h3>
                </div>
                <a href="#" className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                  View all &rarr;
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Board Items */}
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/kampot/200/150" alt="Kampot" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Kampot Retreat</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] text-gray-500">124 Saved</span>
                      <button className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/kep/200/150" alt="Kep" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Kep Villas</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] text-gray-500">109 Saved</span>
                      <button className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/siemreap/200/150" alt="Siem Reap" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Siem Reap Stay</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] text-gray-500">78 Saved</span>
                      <button className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Create a Moodboard */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Create a Moodboard</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Plan and share your future travel dreams. Use a template or start from scratch.
              </p>
              <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md shadow-red-500/30 transition-transform hover:scale-105">
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {/* Trending Destinations */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Asterisk className="w-4 h-4 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Trending Destinations</h3>
                </div>
                <a href="#" className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                  See all &rarr;
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Trending Items */}
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/angkor/200/150" alt="Angkor Wat" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Angkor Wat</h4>
                    <span className="text-[10px] text-gray-500 truncate block">Siem Reap, Cambodia</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/kohrong/200/150" alt="Koh Rong" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Island Beaches</h4>
                    <span className="text-[10px] text-gray-500 truncate block">Koh Rong, Cambodia</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/mondulkiri/200/150" alt="Mondulkiri" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Rolling Hills</h4>
                    <span className="text-[10px] text-gray-500 truncate block">Mondulkiri, Cambodia</span>
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
