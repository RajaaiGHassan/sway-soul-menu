// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

// --- FULL DATABASE ---
const menuData = [
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
  { id: 15, name: "Mortazza", price: "15€ / 25€", category: "padellino gourmet", desc: "Mortadella DOP, Pistaccio, Rucola, Limón y Vinagre Balsámico.", mood: "300g / 600g" },
  { id: 16, name: "Calabro", price: "15€ / 25€", category: "padellino gourmet", desc: "Spianata Calabra, Rucola, Crema N’Duja y Gorgonzola DOP.", mood: "300g / 600g" },
  { id: 17, name: "Montanaro", price: "15€ / 25€", category: "padellino gourmet", desc: "Speck, Brie, Rucola y Salsa Rosa.", mood: "300g / 600g" },
  { id: 18, name: "A Copa", price: "15€ / 25€", category: "padellino gourmet", desc: "Coppa Stagionata, Rucola, Pecorino Sardo DOP y Miel Mil Flores.", mood: "300g / 600g" },
  { id: 19, name: "Parma – Reggio", price: "15€ / 25€", category: "padellino gourmet", desc: "Prosciutto di Parma 18 meses, Parmigiano Reggiano 18 meses, Tomate Cherry y Rucola.", mood: "300g / 600g" },
  { id: 20, name: "F4 Formaggi", price: "15€ / 25€", category: "padellino gourmet", desc: "Rucola, Gorgonzola DOP, Brie, Parmigiano Reggiano DOP y Pecorino Sardo DOP.", mood: "300g / 600g" },
  { id: 21, name: "Tabla Mixta", price: "25€", category: "tablas", desc: "Mortadella DOP, Coppa, Speck DOP, Prosciutto 18M, Parmigiano, Brie, Gorgonzola.", mood: "Gourmet" },
  { id: 22, name: "Tabla de Queso", price: "17€", category: "tablas", desc: "Parmigiano 18M, Brie, Gorgonzola DOP, Pecorino Sardo y Mermelada.", mood: "Gourmet" },
  { id: 23, name: "Tabla de Embutidos", price: "17€", category: "tablas", desc: "Mortadella DOP, Coppa Stagionata, Speck DOP, Prosciutto 18M, Spianata Calabra.", mood: "Gourmet" },
  { id: 24, name: "Smoky Peach", price: "15€", category: "signature cocktails", desc: "Laphroaig 10, Melocotón Fermentado, Honey Jengibre, Limón.", mood: "Signature", glb: "/models/smoky_peach.glb" },
  { id: 25, name: "Malhigo", price: "15€", category: "signature cocktails", desc: "Gin Roku, Granadina Artesana, Zumo de Limón, Sal.", mood: "Signature", glb: "/models/malhigo.glb" },
  { id: 26, name: "Bombastic", price: "14€", category: "signature cocktails", desc: "Hibiki Harmony, Orange & Chocolate Bitter, Agave.", mood: "Signature", glb: "/models/bombastic.glb" },
  { id: 27, name: "Shrub Barrel", price: "12€", category: "signature cocktails", desc: "Whiskey Maker’s Mark, Shrub de Manzana, Zumo de Limón.", mood: "Signature", glb: "/models/shrub.glb" },
  { id: 28, name: "Smoky Garden", price: "16€", category: "signature cocktails", desc: "Mezcal Rey Campero, Chartreuse Verde, Cordial de Lima, Perfume de Laurel.", mood: "Signature", glb: "/models/garden.glb" },
  { id: 29, name: "O’ Deus", price: "16€", category: "signature cocktails", desc: "Mezcal Rey Campero, Tequila 8, Falernum, Zumo de Limón, Agave.", mood: "Signature", glb: "/models/odeus.glb" },
  { id: 30, name: "Teka", price: "16€", category: "signature cocktails", desc: "Vodka Haku, Falernum Artesano, Tepache, Zumo de Limón, Angostura.", mood: "Signature", glb: "/models/teka.glb" },
  { id: 31, name: "Plaquiri", price: "16€", category: "signature cocktails", desc: "Ron Blanco Santiago de Cuba, Cordial de Plátano Artesano, Limón.", mood: "Signature", glb: "/models/plaquiri.glb" },
  { id: 32, name: "Honey Fizz", price: "16€", category: "signature cocktails", desc: "Ron 8 años Santiago de Cuba, Honey mix Pera Artesano, Lima.", mood: "Signature", glb: "/models/honeyfizz.glb" },
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

const categories = [
  "all", "menú a la carta", "padellino gourmet", "tablas", 
  "signature cocktails", "iba cocktails", "the macallan", "licores"
];

export default function Menu() {
  const [filter, setFilter] = useState("all");
  const [activeAR, setActiveAR] = useState<string | null>(null);

  // CLEANUP CAMERA
  useEffect(() => {
    if (!activeAR) {
      const sceneEl = document.querySelector('a-scene');
      if (sceneEl?.systems?.['mindar-image-system']) {
        sceneEl.systems['mindar-image-system'].stop();
      }
      const videos = document.querySelectorAll('video');
      videos.forEach(v => {
        const stream = v.srcObject;
        if (stream) stream.getTracks().forEach(track => track.stop());
        v.remove();
      });
    }
  }, [activeAR]);

  const filteredItems = filter === "all" ? menuData : menuData.filter(item => item.category === filter);

  return (
    <>
      <style>{`
        video {
          position: fixed !important;
          top: 0 !important; left: 0 !important;
          width: 100vw !important; height: 100vh !important;
          object-fit: cover !important;
          z-index: 1 !important;
        }
        .mindar-ui-scanning, .mindar-ui-loading { z-index: 10 !important; }
        .a-enter-vr { display: none !important; }
        /* Forces button to stay clickable on mobile */
        .close-btn { 
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      `}</style>

      <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js" strategy="beforeInteractive" />

      <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center pb-20">
        
        {activeAR && (
          <div className="fixed inset-0 z-[1000] bg-black overflow-hidden">
            {/* CLOSE BUTTON - INSANELY HIGH Z-INDEX */}
            <div className="absolute top-0 right-0 p-10 z-[2000]">
                <button 
                  onClick={() => setActiveAR(null)} 
                  className="close-btn bg-white text-black w-14 h-14 rounded-full font-bold text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  ✕
                </button>
            </div>

            <a-scene 
              mindar-image="imageTargetSrc: /targets.mind; autoStart: true; uiScanning: yes;" 
              embedded color-space="sRGB" renderer="colorManagement: true" 
              vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"
            >
              <a-assets><a-asset-item id="model" src={activeAR}></a-asset-item></a-assets>
              <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
              <a-entity mindar-image-target="targetIndex: 0">
                <a-gltf-model src="#model" rotation="0 0 0" position="0 0 0.1" scale="1 1 1" />
              </a-entity>
            </a-scene>
          </div>
        )}

        <header className="py-20 text-center">
            <h1 className="text-4xl tracking-[0.5em] font-light uppercase">Sway Soul</h1>
        </header>
        
        <nav className="flex flex-wrap justify-center gap-3 mb-12 px-6 max-w-4xl">
          {categories.map(cat => (
            <button 
                key={cat} onClick={() => setFilter(cat)} 
                className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-all ${filter === cat ? "bg-amber-500 border-amber-500 text-black font-bold" : "border-white/10 text-white/40"}`}
            >
                {cat}
            </button>
          ))}
        </nav>

        <div className="w-full max-w-3xl px-6 space-y-8">
          {filteredItems.map(item => (
            <div key={item.id} className="border-b border-white/5 pb-6">
              <div className="flex justify-between items-end">
                <div className="flex-1">
                  <div className="flex gap-3 mb-2 items-center">
                    <span className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">{item.mood}</span>
                    {item.glb && (
                        <button onClick={() => setActiveAR(item.glb)} className="text-[9px] border border-amber-500/50 text-amber-500 px-3 py-1 rounded uppercase hover:bg-amber-500 hover:text-black transition-colors">
                            Launch AR
                        </button>
                    )}
                  </div>
                  <h3 className="text-xl font-medium">{item.name}</h3>
                  <p className="text-sm text-white/40 italic mt-1">{item.desc}</p>
                </div>
                <div className="ml-4 font-medium text-amber-200 text-lg">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}