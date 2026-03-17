'use client';

import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Search, Bell, Calendar, Globe, SlidersHorizontal, Layers, Plus, Minus, Heart, X, Star, Users, BedDouble, Asterisk } from 'lucide-react';
import Image from 'next/image';

// Mock data for map markers
const markers = [
  { id: 1, lat: -6.8, lng: 107.1, price: "$62.91", name: "Mountain View Villa", location: "Cianjur, West Java", rating: 4.8, beds: 2, guests: 4, image: "https://picsum.photos/seed/villa1/400/300" },
  { id: 2, lat: -6.9, lng: 106.9, price: "$32.79", name: "Cozy Cabin", location: "Sukabumi, West Java", rating: 4.5, beds: 1, guests: 2, image: "https://picsum.photos/seed/cabin1/400/300" },
  { id: 3, lat: -6.6, lng: 106.8, price: "$32.09", name: "Forest Retreat", location: "Bogor, West Java", rating: 4.9, beds: 3, guests: 6, image: "https://picsum.photos/seed/forest1/400/300" },
  { id: 4, lat: -6.7, lng: 106.85, price: "$16.64", name: "Budget Stay", location: "Bogor, West Java", rating: 4.2, beds: 1, guests: 2, image: "https://picsum.photos/seed/budget1/400/300" },
  { id: 5, lat: -6.75, lng: 106.8, price: "$2.76", name: "Camping Ground", location: "Bogor, West Java", rating: 4.0, beds: 0, guests: 2, image: "https://picsum.photos/seed/camp1/400/300" },
  { id: 6, lat: -6.85, lng: 106.95, price: "$52.00", name: "Riverside Home", location: "Sukabumi, West Java", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/river1/400/300" },
  { id: 7, lat: -6.95, lng: 106.85, price: "$91.16", name: "Luxury Estate", location: "Sukabumi, West Java", rating: 5.0, beds: 4, guests: 8, image: "https://picsum.photos/seed/luxury1/400/300" },
  { id: 8, lat: -7.0, lng: 106.7, price: "$20.84", name: "Beach Hut", location: "Pelabuhan Ratu, West Java", rating: 4.3, beds: 1, guests: 2, image: "https://picsum.photos/seed/beach1/400/300" },
  { id: 9, lat: -7.05, lng: 106.9, price: "$77.98", name: "Cliffside Villa", location: "Sukabumi, West Java", rating: 4.9, beds: 3, guests: 6, image: "https://picsum.photos/seed/cliff1/400/300" },
  { id: 10, lat: -6.9, lng: 107.0, price: "$39.69", name: "Farmhouse", location: "Cianjur, West Java", rating: 4.6, beds: 2, guests: 4, image: "https://picsum.photos/seed/farm1/400/300" },
  { id: 11, lat: -6.85, lng: 107.15, price: "$52.00", name: "Lake View Cabin", location: "Cianjur, West Java", rating: 4.8, beds: 2, guests: 4, image: "https://picsum.photos/seed/lake1/400/300" },
  { id: 12, lat: -6.75, lng: 107.2, price: "$77.98", name: "Hilltop Retreat", location: "Cianjur, West Java", rating: 4.9, beds: 3, guests: 6, image: "https://picsum.photos/seed/hill1/400/300" },
  { id: 13, lat: -6.8, lng: 107.3, price: "$66.81", name: "Modern Loft", location: "Padalarang, West Java", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/loft1/400/300" },
  { id: 14, lat: -6.7, lng: 107.4, price: "$35.44", name: "City Apartment", location: "Cimahi, West Java", rating: 4.5, beds: 1, guests: 2, image: "https://picsum.photos/seed/apt1/400/300" },
  { id: 15, lat: -6.6, lng: 107.45, price: "$43.48", name: "Suburban Home", location: "Purwakarta, West Java", rating: 4.6, beds: 2, guests: 4, image: "https://picsum.photos/seed/suburb1/400/300" },
  { id: 16, lat: -6.65, lng: 107.55, price: "$57.00", name: "Garden Villa", location: "Subang, West Java", rating: 4.8, beds: 3, guests: 6, image: "https://picsum.photos/seed/garden1/400/300" },
  { id: 17, lat: -6.75, lng: 107.5, price: "$98.03", name: "Ocean Breeze Haven", location: "Denpasar, Bali", rating: 5.0, beds: 3, guests: 5, image: "https://picsum.photos/seed/ocean/400/300" },
  { id: 18, lat: -6.85, lng: 107.4, price: "$18.51", name: "Backpacker Hostel", location: "Padalarang, West Java", rating: 4.1, beds: 1, guests: 1, image: "https://picsum.photos/seed/hostel1/400/300" },
  { id: 19, lat: -6.95, lng: 107.45, price: "$41.31", name: "Eco Lodge", location: "Soreang, West Java", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/eco1/400/300" },
  { id: 20, lat: -7.0, lng: 107.5, price: "$23.04", name: "Village Homestay", location: "Ciwidey, West Java", rating: 4.4, beds: 1, guests: 2, image: "https://picsum.photos/seed/village1/400/300" },
  { id: 21, lat: -7.1, lng: 107.4, price: "$6.59", name: "Tent Stay", location: "Ciwidey, West Java", rating: 4.0, beds: 0, guests: 2, image: "https://picsum.photos/seed/tent1/400/300" },
  { id: 22, lat: -7.05, lng: 107.45, price: "$94.54", name: "Luxury Glamping", location: "Ciwidey, West Java", rating: 4.9, beds: 2, guests: 4, image: "https://picsum.photos/seed/glamp1/400/300" },
  { id: 23, lat: -7.15, lng: 107.55, price: "$70.82", name: "Tea Estate Bungalow", location: "Pangalengan, West Java", rating: 4.8, beds: 3, guests: 6, image: "https://picsum.photos/seed/tea1/400/300" },
  { id: 24, lat: -7.05, lng: 107.6, price: "$19.89", name: "Simple Room", location: "Pangalengan, West Java", rating: 4.2, beds: 1, guests: 2, image: "https://picsum.photos/seed/room1/400/300" },
  { id: 25, lat: -6.95, lng: 107.65, price: "$54.56", name: "City Center Condo", location: "Bandung, West Java", rating: 4.6, beds: 2, guests: 4, image: "https://picsum.photos/seed/condo1/400/300" },
  { id: 26, lat: -6.85, lng: 107.7, price: "$63.06", name: "Mountain View Apt", location: "Bandung, West Java", rating: 4.7, beds: 2, guests: 4, image: "https://picsum.photos/seed/apt2/400/300" },
  { id: 27, lat: -6.75, lng: 107.8, price: "$49.82", name: "Quiet House", location: "Sumedang, West Java", rating: 4.5, beds: 2, guests: 4, image: "https://picsum.photos/seed/house1/400/300" },
  { id: 28, lat: -6.65, lng: 107.9, price: "$59.30", name: "Traditional Villa", location: "Sumedang, West Java", rating: 4.8, beds: 3, guests: 6, image: "https://picsum.photos/seed/villa2/400/300" },
  { id: 29, lat: -6.55, lng: 107.7, price: "$15.34", name: "Budget Inn", location: "Subang, West Java", rating: 4.0, beds: 1, guests: 2, image: "https://picsum.photos/seed/inn1/400/300" },
];

export default function Dashboard() {
  const [selectedMarker, setSelectedMarker] = useState<typeof markers[0] | null>(null);

  return (
    <div className="flex flex-col h-screen bg-[#F7F7F5] overflow-hidden font-sans">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 z-10">
        {/* Logo & Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
            <Asterisk className="w-6 h-6 fill-current" />
            <span className="text-gray-900">Terria</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="text-gray-900 border-b-2 border-red-500 pb-1">Dashboard</a>
            <a href="#" className="hover:text-gray-900 pb-1">Analytics</a>
            <a href="#" className="hover:text-gray-900 pb-1">My Campaign</a>
            <a href="#" className="hover:text-gray-900 pb-1">Resources</a>
            <a href="#" className="hover:text-gray-900 pb-1">Discover</a>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              <Asterisk className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Calendar className="w-5 h-5" />
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
        {/* Secondary Search Bar (Floating) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl px-4">
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-4 pl-4">
              <Globe className="w-5 h-5 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Search a vibe or paste image link...</span>
                <span className="text-xs text-gray-500">Europe • Any week • Add guests</span>
              </div>
            </div>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 w-full relative">
          <Map
            initialViewState={{
              longitude: 107.2,
              latitude: -6.8,
              zoom: 9.5
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
                    <Image src="https://picsum.photos/seed/bali/200/150" alt="Bali" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Bali dreaming</h4>
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
                    <Image src="https://picsum.photos/seed/tucan/200/150" alt="Tucan" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Tucan Villa</h4>
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
                    <Image src="https://picsum.photos/seed/aspen/200/150" alt="Aspen" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Aspen Getaway</h4>
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
                    <Image src="https://picsum.photos/seed/sunset/200/150" alt="Sunset" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Sunset Coastline</h4>
                    <span className="text-[10px] text-gray-500 truncate block">Dubrovnik, Croatia</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/lake/200/150" alt="Lake" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Lakeside Modern</h4>
                    <span className="text-[10px] text-gray-500 truncate block">Lake Como, Italy</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <Image src="https://picsum.photos/seed/beach/200/150" alt="Beach" fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">Beachfront</h4>
                    <span className="text-[10px] text-gray-500 truncate block">Phuket, Thailand</span>
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
