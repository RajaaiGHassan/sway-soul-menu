'use client';

import { useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  price: string;
  category: string;
  desc: string;
  mood: string;
  image?: string; 
}

const categories = [
  "all", 
  "menú a la carta", 
  "padellino gourmet", 
  "tablas", 
  "signature cocktails", 
  "iba cocktails", 
  "the macallan",
  "licores"
];

const menuData: MenuItem[] = [
  // --- MENÚ A LA CARTA ---
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

  // --- PADELLINO GOURMET ---
  { id: 15, name: "Mortazza", price: "15€ / 25€", category: "padellino gourmet", desc: "Mortadella DOP, Pistaccio, Rucola, Limón y Vinagre Balsámico.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1204-scaled.jpeg" },
  { id: 16, name: "Calabro", price: "15€ / 25€", category: "padellino gourmet", desc: "Spianata Calabra, Rucola, Crema N’Duja y Gorgonzola DOP.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1219-scaled.jpeg" },
  { id: 17, name: "Montanaro", price: "15€ / 25€", category: "padellino gourmet", desc: "Speck, Brie, Rucola y Salsa Rosa.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1227-scaled.jpeg" },
  { id: 18, name: "A Copa", price: "15€ / 25€", category: "padellino gourmet", desc: "Coppa Stagionata, Rucola, Pecorino Sardo DOP y Miel Mil Flores.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1450-scaled.jpeg" },
  { id: 19, name: "Parma – Reggio", price: "15€ / 25€", category: "padellino gourmet", desc: "Prosciutto di Parma 18 meses, Parmigiano Reggiano 18 meses, Tomate Cherry y Rucola.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1243-scaled.jpeg" },
  { id: 20, name: "F4 Formaggi", price: "15€ / 25€", category: "padellino gourmet", desc: "Rucola, Gorgonzola DOP, Brie, Parmigiano Reggiano DOP y Pecorino Sardo DOP.", mood: "300g / 600g", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1251-scaled.jpeg" },

  // --- TABLAS ---
  { id: 21, name: "Tabla Mixta", price: "25€", category: "tablas", desc: "Mortadella DOP, Coppa, Speck DOP, Prosciutto 18M, Parmigiano, Brie, Gorgonzola.", mood: "Gourmet", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1164-scaled.jpeg" },
  { id: 22, name: "Tabla de Queso", price: "17€", category: "tablas", desc: "Parmigiano 18M, Brie, Gorgonzola DOP, Pecorino Sardo y Mermelada.", mood: "Gourmet", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1198-scaled-1.jpeg" },
  { id: 23, name: "Tabla de Embutidos", price: "17€", category: "tablas", desc: "Mortadella DOP, Coppa Stagionata, Speck DOP, Prosciutto 18M, Spianata Calabra.", mood: "Gourmet", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_1174-scaled.jpeg" },

  // --- SIGNATURE COCKTAILS ---
  { id: 24, name: "Smoky Peach", price: "15€", category: "signature cocktails", desc: "Laphroaig 10, Melocotón Fermentado, Honey Jengibre, Limón.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/507FF8B5-CF39-4966-AD6E-1790890D96CF-scaled.jpeg" },
  { id: 25, name: "Malhigo", price: "15€", category: "signature cocktails", desc: "Gin Roku, Granadina Artesana, Zumo de Limón, Sal.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2025/09/Image-10.jpg" },
  { id: 26, name: "Bombastic", price: "14€", category: "signature cocktails", desc: "Hibiki Harmony, Orange & Chocolate Bitter, Agave.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2025/09/Image-9.jpg" },
  { id: 27, name: "Shrub Barrel", price: "12€", category: "signature cocktails", desc: "Whiskey Maker’s Mark, Shrub de Manzana, Zumo de Limón.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07281-copia-scaled.jpeg" },
  { id: 28, name: "Smoky Garden", price: "16€", category: "signature cocktails", desc: "Mezcal Rey Campero, Chartreuse Verde, Cordial de Lima, Perfume de Laurel.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/IMG_0258.jpeg" },
  { id: 29, name: "O’ Deus", price: "16€", category: "signature cocktails", desc: "Mezcal Rey Campero, Tequila 8, Falernum, Zumo de Limón, Agave.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07303-copia-scaled.jpeg" },
  { id: 30, name: "Teka", price: "16€", category: "signature cocktails", desc: "Vodka Haku, Falernum Artesano, Tepache, Zumo de Limón, Angostura.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07357-copia-scaled.jpeg" },
  { id: 31, name: "Plaquiri", price: "16€", category: "signature cocktails", desc: "Ron Blanco Santiago de Cuba, Cordial de Plátano Artesano, Limón.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07061-copia-scaled.jpeg" },
  { id: 32, name: "Honey Fizz", price: "16€", category: "signature cocktails", desc: "Ron 8 años Santiago de Cuba, Honey mix Pera Artesano, Lima.", mood: "Signature", image: "https://www.swaysoul.com/wp-content/uploads/2026/03/DSC07298-scaled.jpeg" },

  // --- IBA COCKTAILS ---
  { id: 40, name: "Vieux Carré", price: "13€", category: "iba cocktails", desc: "Few Rye Whiskey, Cognac, Vermouth rojo, Benedictine.", mood: "IBA" },
  { id: 41, name: "Illegal", price: "12€", category: "iba cocktails", desc: "Pisco Demonio de los Andes, sirope de azúcar, zumo de lima.", mood: "IBA" },
  { id: 42, name: "Paloma", price: "13€", category: "iba cocktails", desc: "Tequila 8 blanco, zumo de lima, soda, pomelo.", mood: "IBA" },
  { id: 43, name: "Last Word", price: "14€", category: "iba cocktails", desc: "Roku Gin, green chartreuse, Maraschino, zumo de lima.", mood: "IBA" },
  { id: 44, name: "Espresso Martini", price: "12€", category: "iba cocktails", desc: "Vodka Koskenkorva, Licor de Caffè Artesano, espresso.", mood: "IBA" },
  { id: 45, name: "Old Fashioned", price: "12€", category: "iba cocktails", desc: "Maker’s Mark, sirope de azúcar, angostura.", mood: "IBA" },
  { id: 46, name: "Margarita", price: "14€", category: "iba cocktails", desc: "Tequila 8, triple sec, zumo de lima.", mood: "IBA" },

  // --- THE MACALLAN ---
  { id: 100, name: "Macallan 12 Double Cask", price: "7€ / 14€", category: "the macallan", desc: "40° Single Malt", mood: "30ml / 60ml" },
  { id: 101, name: "Macallan 15 Double Cask", price: "16,5€ / 33€", category: "the macallan", desc: "43° Single Malt", mood: "30ml / 60ml" },
  { id: 102, name: "Macallan 18 Double Cask", price: "13€ / 32€ / 64€", category: "the macallan", desc: "43° Single Malt", mood: "10ml / 30ml / 60ml" },
  { id: 103, name: "Macallan 12 Sherry Oak", price: "8€ / 16€", category: "the macallan", desc: "40° Single Malt", mood: "30ml / 60ml" },
  { id: 104, name: "Macallan 18 Sherry Oak", price: "14€ / 33€ / 66€", category: "the macallan", desc: "43° Single Malt", mood: "10ml / 30ml / 60ml" },
  { id: 105, name: "Macallan 25 Sherry Oak", price: "90€ / 250€ / 490€", category: "the macallan", desc: "43° Single Malt", mood: "10ml / 30ml / 60ml" },

  // --- LICORES: WHISKY ---
  { id: 200, name: "Few Rye", price: "9,5€", category: "licores", desc: "46.5°", mood: "Whisky 60ml" },
  { id: 201, name: "Few Bourbon", price: "9€", category: "licores", desc: "46.5°", mood: "Whisky 60ml" },
  { id: 202, name: "Wild Turkey 84", price: "4€", category: "licores", desc: "40.5°", mood: "Whisky 60ml" },
  { id: 203, name: "Wild Turkey 101", price: "8,5€", category: "licores", desc: "50.5°", mood: "Whisky 60ml" },
  { id: 204, name: "Mitcher’s Rye", price: "12€", category: "licores", desc: "42.4°", mood: "Whisky 60ml" },
  { id: 205, name: "Mitcher’s Bourbon", price: "12€", category: "licores", desc: "45.7°", mood: "Whisky 60ml" },
  { id: 206, name: "Templeton 4 Y.O.", price: "6€", category: "licores", desc: "40°", mood: "Whisky 60ml" },
  { id: 207, name: "Templeton 6 Y.O.", price: "7€", category: "licores", desc: "45.75°", mood: "Whisky 60ml" },
  { id: 208, name: "Maker’s Mark", price: "6€", category: "licores", desc: "45°", mood: "Whisky 60ml" },
  { id: 209, name: "Toki", price: "5,5€", category: "licores", desc: "43°", mood: "Whisky 60ml" },
  { id: 210, name: "Hibiki Harmony", price: "14,5€", category: "licores", desc: "43°", mood: "Whisky 60ml" },
  { id: 211, name: "Laphroaig 10 Y.O.", price: "8€", category: "licores", desc: "40°", mood: "Whisky 60ml" },
  { id: 212, name: "Laphroaig Quarter Cask", price: "10€", category: "licores", desc: "48°", mood: "Whisky 60ml" },
  { id: 213, name: "Jameson Select Black", price: "7€", category: "licores", desc: "40°", mood: "Whisky 60ml" },
  { id: 214, name: "Ardbeg 10 Y.O.", price: "13€", category: "licores", desc: "46°", mood: "Whisky 60ml" },

  // --- LICORES: TEQUILA ---
  { id: 300, name: "Tequila 8 Plata", price: "8,5€", category: "licores", desc: "40°", mood: "Tequila 60ml" },
  { id: 301, name: "Tequila 8 Reposado", price: "9€", category: "licores", desc: "40°", mood: "Tequila 60ml" },
  { id: 302, name: "Don Julio Blanco", price: "9,5€", category: "licores", desc: "38°", mood: "Tequila 60ml" },
  { id: 303, name: "Fortaleza Añejo", price: "15€", category: "licores", desc: "40°", mood: "Tequila 60ml" },
  { id: 304, name: "Fortaleza Blanco", price: "9,5€", category: "licores", desc: "40°", mood: "Tequila 60ml" },
  { id: 305, name: "Clase Azul Plata", price: "22€", category: "licores", desc: "40°", mood: "Tequila 60ml" },
  { id: 306, name: "Clase Azul Reposado", price: "40€", category: "licores", desc: "40°", mood: "Tequila 60ml" },

  // --- LICORES: MEZCAL ---
  { id: 400, name: "Ojo de Dios Blanco", price: "9,5€", category: "licores", desc: "42°", mood: "Mezcal 60ml" },
  { id: 401, name: "Ojo de Dios Café", price: "9,5€", category: "licores", desc: "35°", mood: "Mezcal 60ml" },
  { id: 402, name: "Siete Misterios Doba Yej", price: "9€", category: "licores", desc: "44°", mood: "Mezcal 60ml" },
  { id: 403, name: "Rey Campero Espadín", price: "8,5€", category: "licores", desc: "47.1°", mood: "Mezcal 60ml" },
  { id: 404, name: "Rey Campero Mexicano", price: "14€", category: "licores", desc: "48.5°", mood: "Mezcal 60ml" },
  { id: 405, name: "Rey Campero Sierra Negra", price: "18€", category: "licores", desc: "49.2°", mood: "Mezcal 60ml" },
  { id: 406, name: "Rey Campero Coyote", price: "18€", category: "licores", desc: "49.8°", mood: "Mezcal 60ml" }
];

export default function Menu() {
  const [filter, setFilter] = useState("all");
  const filteredItems = filter === "all" ? menuData : menuData.filter(item => item.category === filter);

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center font-['Aboreto',cursive] pb-20">
      
      <header className="w-full text-center py-12">
        <h1 className="text-5xl md:text-8xl tracking-[0.4em] font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
          SWAY SOUL
        </h1>
      </header>

      {/* CATEGORIES NAVIGATION */}
      <nav className="flex flex-wrap justify-center gap-3 mb-12 px-6">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`px-5 py-3 border rounded-full text-xs uppercase tracking-[0.2em] transition-all font-bold ${filter === cat ? "border-amber-500 bg-amber-500/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "border-white/10 text-white/40 hover:text-white/80"}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* MENU LIST */}
      <div className="w-full max-w-5xl px-4 space-y-6">
        {filteredItems.map(item => (
          <div key={item.id} className="flex flex-row bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl">
            
            {/* PORTRAIT IMAGE CONTAINER */}
            {item.image ? (
              <div className="w-1/3 min-w-[140px] h-full overflow-hidden border-r border-white/5">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-110" 
                  alt={item.name} 
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-6 bg-amber-500/5 h-full" />
            )}

            {/* CONTENT AREA */}
            <div className="flex-1 p-5 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] md:text-sm text-amber-500 font-black uppercase tracking-[0.3em]">
                  {item.mood}
                </span>
                <h3 className="text-xl md:text-3xl uppercase tracking-tighter mt-2 leading-tight font-medium text-white/90">
                  {item.name}
                </h3>
                <p className="text-sm md:text-lg text-white/50 italic mt-3 line-clamp-2 md:line-clamp-none tracking-wider leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* PRICE */}
              <div className="self-end">
                <span className="text-amber-200 font-bold text-2xl md:text-4xl tracking-tighter">
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        body { background-color: #0c0c0c; margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0c0c0c; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
      `}</style>
    </div>
  );
}