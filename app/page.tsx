// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

// --- TYPES ---
interface MenuItem {
  id: number;
  name: string;
  price: string;
  category: string;
  desc: string;
  mood: string;
  image?: string;
  glb?: string; 
}

// --- DATABASE ---
const categories = [
  "all", "menú a la carta", "padellino gourmet", "tablas", 
  "signature cocktails", "iba cocktails", "the macallan", "licores"
];

const menuData: MenuItem[] = [
  { id: 1, name: "Hummus de Garbanzos Artesano", price: "8,5€", category: "menú a la carta", desc: "Con Focaccia artesana.", mood: "Entrante" },
  { id: 2, name: "Bresaola, Rúcola, Parmigiano y Limón", price: "9,5€", category: "menú a la carta", desc: "Con Focaccia.", mood: "Entrante" },
  { id: 3, name: "Pan de Cristal con Tomate", price: "5,5€", category: "menú a la carta", desc: "Aceite EVO.", mood: "Entrante" },
  { id: 4, name: "Parmigiana de Berenjena", price: "11€", category: "menú a la carta", desc: "Con Focaccia, Aceite EVO y Flor de Sal.", mood: "Entrante" },
  { id: 5, name: "Fettucine al Huevo", price: "15€", category: "menú a la carta", desc: "Con Mantequilla, Anchoas y Limón.", mood: "Primer Plato" },
  { id: 6, name: "Paccheri al Huevo", price: "15€", category: "menú a la carta", desc: "Con Crema de Rúcola Artesana y Gorgonzola.", mood: "Primer Plato" },
  { id: 7, name: "Fettucine al Huevo", price: "16€", category: "menú a la carta", desc: "Con Mantequilla, Parmigiano y Limón.", mood: "Primer Plato" },
  { id: 8, name: "Fettucine al Huevo", price: "15€", category: "menú a la carta", desc: "Con Speck, Gorgonzola y Crema de Nueces.", mood: "Primer Plato" },
  { id: 9, name: "Fettucine al Huevo", price: "15€", category: "menú a la carta", desc: "Con Ajo, Aceite EVO y Guindilla.", mood: "Primer Plato" },
  { id: 10, name: "Paccheri al Huevo", price: "14€", category: "menú a la carta", desc: "Con Tomate Seco, Alcaparras y Limón.", mood: "Primer Plato" },
  { id: 11, name: "Paccheri al Huevo", price: "15€", category: "menú a la carta", desc: "Con Pesto de Albahaca Artesano.", mood: "Primer Plato" },
  { id: 12, name: "Paccheri al Huevo", price: "15€", category: "menú a la carta", desc: "Con Crema de N’duja y Vino Tinto.", mood: "Primer Plato" },
  { id: 13, name: "Tiramisù de las Abuelas", price: "8€", category: "menú a la carta", desc: "Servido con Licor de Café Artesano.", mood: "Dulce" },
  { id: 14, name: "Sorbete de Limón y Albahaca", price: "8€", category: "menú a la carta", desc: "Hecho en casa, servido con Limoncello Artesano.", mood: "Dulce" },
  { id: 15, name: "Mortazza", price: "15€ / 25€", category: "padellino gourmet", desc: "Mortadella DOP, Pistaccio, Rucola, Limón y Vinagre Balsámico.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1204-scaled.jpeg" },
  { id: 16, name: "Calabro", price: "15€ / 25€", category: "padellino gourmet", desc: "Spianata Calabra, Rucola, Crema N’Duja y Gorgonzola DOP.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1219-scaled.jpeg" },
  { id: 17, name: "Montanaro", price: "15€ / 25€", category: "padellino gourmet", desc: "Speck, Brie, Rucola y Salsa Rosa.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1227-scaled.jpeg" },
  { id: 18, name: "A Copa", price: "15€ / 25€", category: "padellino gourmet", desc: "Coppa Stagionata, Rucola, Pecorino Sardo DOP y Miel Mil Flores.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1450-scaled.jpeg" },
  { id: 19, name: "Parma – Reggio", price: "15€ / 25€", category: "padellino gourmet", desc: "Prosciutto di Parma 18 meses, Parmigiano Reggiano 18 meses, Tomate Cherry y Rucola.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1243-scaled.jpeg" },
  { id: 20, name: "F4 Formaggi", price: "15€ / 25€", category: "padellino gourmet", desc: "Rucola, Gorgonzola DOP, Brie, Parmigiano Reggiano DOP y Pecorino Sardo DOP.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1251-scaled.jpeg" },
  { id: 21, name: "Tabla Mixta", price: "25€", category: "tablas", desc: "Mortadella DOP, Coppa, Speck DOP, Prosciutto 18M, Parmigiano, Brie, Gorgonzola.", mood: "Gourmet", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1164-scaled.jpeg" },
  { id: 22, name: "Tabla de Queso", price: "17€", category: "tablas", desc: "Parmigiano 18M, Brie, Gorgonzola DOP, Pecorino Sardo y Mermelada.", mood: "Gourmet", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1198-scaled-1.jpeg" },
  { id: 23, name: "Tabla de Embutidos", price: "17€", category: "tablas", desc: "Mortadella DOP, Coppa Stagionata, Speck DOP, Prosciutto 18M, Spianata Calabra.", mood: "Gourmet", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1174-scaled.jpeg" },
  { id: 24, name: "Smoky Peach", price: "15€", category: "signature cocktails", desc: "Laphroaig 10, Melocotón Fermentado, Honey Jengibre, Limón.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/507FF8B5-CF39-4966-AD6E-1790890D96CF-scaled.jpeg", glb: "/models/smoky_peach.glb" },
  { id: 25, name: "Malhigo", price: "15€", category: "signature cocktails", desc: "Gin Roku, Granadina Artesana, Zumo de Limón, Sal.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2025/09/Image-10.jpg", glb: "/models/malhigo.glb" },
  { id: 26, name: "Bombastic", price: "14€", category: "signature cocktails", desc: "Hibiki Harmony, Orange & Chocolate Bitter, Agave.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2025/09/Image-9.jpg", glb: "/models/bombastic.glb" },
  { id: 27, name: "Shrub Barrel", price: "12€", category: "signature cocktails", desc: "Whiskey Maker’s Mark, Shrub de Manzana, Zumo de Limón.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07281-copia-scaled.jpeg", glb: "/models/shrub.glb" },
  { id: 28, name: "Smoky Garden", price: "16€", category: "signature cocktails", desc: "Mezcal Rey Campero, Chartreuse Verde, Cordial de Lima, Perfume de Laurel.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_0258.jpeg", glb: "/models/garden.glb" },
  { id: 29, name: "O’ Deus", price: "16€", category: "signature cocktails", desc: "Mezcal Rey Campero, Tequila 8, Falernum, Zumo de Limón, Agave.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07303-copia-scaled.jpeg", glb: "/models/odeus.glb" },
  { id: 30, name: "Teka", price: "16€", category: "signature cocktails", desc: "Vodka Haku, Falernum Artesano, Tepache, Zumo de Limón, Angostura.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07357-copia-scaled.jpeg", glb: "/models/teka.glb" },
  { id: 31, name: "Plaquiri", price: "16€", category: "signature cocktails", desc: "Ron Blanco Santiago de Cuba, Cordial de Plátano Artesano, Limón.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07061-copia-scaled.jpeg", glb: "/models/plaquiri.glb" },
  { id: 32, name: "Honey Fizz", price: "16€", category: "signature cocktails", desc: "Ron 8 años Santiago de Cuba, Honey mix Pera Artesano, Lima.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07298-scaled.jpeg", glb: "/models/honeyfizz.glb" },
  { id: 40, name: "Vieux Carré", price: "13€", category: "iba cocktails", desc: "Few Rye Whiskey, Cognac, Vermouth rojo, Benedictine.", mood: "IBA" },
  { id: 41, name: "Illegal", price: "12€", category: "iba cocktails", desc: "Pisco Demonio de los Andes, sirope de azúcar, zumo de lima.", mood: "IBA" },
  { id: 42, name: "Paloma", price: "13€", category: "iba cocktails", desc: "Tequila 8 blanco, zumo de lima, soda, pomelo.", mood: "IBA" },
  { id: 43, name: "Last Word", price: "14€", category: "iba cocktails", desc: "Roku Gin, green chartreuse, Maraschino, zumo de lima.", mood: "IBA" },
  { id: 44, name: "Espresso Martini", price: "12€", category: "iba cocktails", desc: "Vodka Koskenkorva, Licor de Caffè Artesano, espresso.", mood: "IBA" },
  { id: 45, name: "Old Fashioned", price: "12€", category: "iba cocktails", desc: "Maker’s Mark, sirope de azúcar, angostura.", mood: "IBA" },
  { id: 46, name: "Margarita", price: "14€", category: "iba cocktails", desc: "Tequila 8, triple sec, zumo de lima.", mood: "IBA" },
  { id: 100, name: "Macallan 12 Double Cask", price: "7€ / 14€", category: "the macallan", desc: "40° Single Malt", mood: "30ml / 60ml" },
  { id: 101, name: "Macallan 15 Double Cask", price: "16,5€ / 33€", category: "the macallan", desc: "43° Single Malt", mood: "30ml / 60ml" },
  { id: 102, name: "Macallan 18 Double Cask", price: "13€ / 32€ / 64€", category: "the macallan", desc: "43° Single Malt", mood: "10ml / 30ml / 60ml" },
  { id: 103, name: "Macallan 12 Sherry Oak", price: "8€ / 16€", category: "the macallan", desc: "40° Single Malt", mood: "30ml / 60ml" },
  { id: 104, name: "Macallan 18 Sherry Oak", price: "14€ / 33€ / 66€", category: "the macallan", desc: "43° Single Malt", mood: "10ml / 30ml / 60ml" },
  { id: 105, name: "Macallan 25 Sherry Oak", price: "90€ / 250€ / 490€", category: "the macallan", desc: "43° Single Malt", mood: "10ml / 30ml / 60ml" },
  { id: 200, name: "Few Rye", price: "9,5€", category: "licores", desc: "46.5°", mood: "Whisky 60ml" },
  { id: 201, name: "Few Bourbon", price: "9€", category: "licores", desc: "46.5°", mood: "Whisky 60ml" },
  { id: 208, name: "Maker’s Mark", price: "6€", category: "licores", desc: "45°", mood: "Whisky 60ml" },
  { id: 210, name: "Hibiki Harmony", price: "14,5€", category: "licores", desc: "43°", mood: "Whisky 60ml" },
  { id: 300, name: "Tequila 8 Plata", price: "8,5€", category: "licores", desc: "40°", mood: "Tequila 60ml" },
  { id: 403, name: "Rey Campero Espadín", price: "8,5€", category: "licores", desc: "47.1°", mood: "Mezcal 60ml" }
];

export default function Menu() {
  const [filter, setFilter] = useState("all");
  const [activeAR, setActiveAR] = useState<string | null>(null);

  // KILL SWITCH: Force-stops the AR system when the overlay is closed
  useEffect(() => {
    if (!activeAR) {
      const sceneEl = document.querySelector('a-scene');
      if (sceneEl && sceneEl.systems && sceneEl.systems['mindar-image-system']) {
        sceneEl.systems['mindar-image-system'].stop();
      }
    }
  }, [activeAR]);

  const filteredItems = filter === "all" ? menuData : menuData.filter(item => item.category === filter);

  return (
    <>
      {/* CSS FIX: Prevents "Ghost" scanning UI from appearing on the menu */}
      <style>{`
        .mindar-ui-scanning, .mindar-ui-loading {
          display: ${activeAR ? 'block' : 'none'} !important;
        }
        .a-enter-vr, .a-enter-ar {
          display: none !important;
        }
      `}</style>

      <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js" strategy="beforeInteractive" />

      <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center pb-20">
        
        {activeAR && (
          <div className="fixed inset-0 z-[200] bg-black">
            <div className="fixed top-0 w-full p-8 flex justify-between items-center z-[220]">
                <div className="flex flex-col">
                   <span className="text-amber-500 text-[10px] tracking-[0.4em] uppercase font-bold font-sans">Sway Soul Studio</span>
                </div>
                <button 
                  onClick={() => {
                    const sceneEl = document.querySelector('a-scene');
                    if (sceneEl) sceneEl.parentNode.removeChild(sceneEl);
                    setActiveAR(null);
                  }} 
                  className="bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full text-xl flex items-center justify-center transition-transform active:scale-90"
                >
                  ✕
                </button>
            </div>

            <a-scene 
              mindar-image={`imageTargetSrc: /targets.mind; autoStart: true; uiLoading: no; uiError: no; uiScanning: yes;`} 
              embedded 
              color-space="sRGB" 
              renderer="colorManagement: true, physicallyCorrectLights" 
              vr-mode-ui="enabled: false" 
              device-orientation-permission-ui="enabled: false"
            >
              <a-assets>
                <a-asset-item id="drinkModel" src={activeAR}></a-asset-item>
              </a-assets>
              <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
              <a-entity mindar-image-target="targetIndex: 0">
                <a-gltf-model 
                  src="#drinkModel" 
                  rotation="0 0 0" 
                  position="0 0 0.1" 
                  scale="0.05 0.05 0.05" 
                  animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"
                />
              </a-entity>
            </a-scene>
          </div>
        )}

        <header className="py-20 text-center">
            <h1 className="text-4xl md:text-7xl tracking-[0.5em] font-light uppercase">Sway Soul</h1>
        </header>
        
        <nav className="flex flex-wrap justify-center gap-3 mb-12 px-6 max-w-4xl">
          {categories.map(cat => (
            <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-5 py-2 rounded-full text-[9px] uppercase tracking-widest border transition-all duration-300 ${filter === cat ? "bg-amber-500 border-amber-500 text-black font-bold" : "border-white/10 text-white/40 hover:border-white/30"}`}
            >
                {cat}
            </button>
          ))}
        </nav>

        <div className="w-full max-w-3xl px-6 space-y-6">
          {filteredItems.map(item => (
            <div key={item.id} className="border-b border-white/5 pb-6 group">
              <div className="flex justify-between items-end">
                <div className="flex-1">
                  <div className="flex gap-3 mb-2 items-center">
                    <span className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">{item.mood}</span>
                    {item.glb && (
                        <button 
                            onClick={() => setActiveAR(item.glb!)} 
                            className="text-[8px] border border-amber-500/50 text-amber-500 px-2 py-0.5 rounded uppercase hover:bg-amber-500 hover:text-black transition-colors"
                        >
                            Launch AR
                        </button>
                    )}
                  </div>
                  <h3 className="text-xl font-medium group-hover:text-amber-200 transition-colors">{item.name}</h3>
                  <p className="text-sm text-white/40 italic mt-1">{item.desc}</p>
                </div>
                <div className="ml-4 font-medium text-amber-200 text-lg whitespace-nowrap">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}