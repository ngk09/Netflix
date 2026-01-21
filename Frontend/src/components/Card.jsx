import React from 'react';

const Card = () => {
  // Static array of 8 movies - no more extra slots or refresh changes
  const movies = [
    { id: 1, title: "Baahubali: The Beginning", img: "/6.png" },
    { id: 2, title: "Maari", img: "/7.png" },
    { id: 3, title: "Power Kannada", img: "/8.png" },
    { id: 4, title: "Kaala Tamil", img: "/9.png" },
    { id: 5, title: "Mungaru Male", img: "/10.png" },
    { id: 6, title: "Arjun Sarja Hits", img: "/11.png" },
    { id: 7, title: "Pokkiri", img: "/12.png" },
    { id: 8, title: "KGF Chapter 1", img: "/13.png" },
  ];

  const handleRedirect = (title) => {
    window.open(`https://www.netflix.com/search?q=${title}`, '_blank');
  };

  return (
    <div className="bg-black px-6 md:px-16 py-10 relative z-30">
      <h2 className="text-white text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 uppercase tracking-wider">
        Popular Blockbusters
      </h2>
      
      {/* 8 Card Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mb-20">
        {movies.map((movie) => (
          <div 
            key={movie.id}
            onClick={() => handleRedirect(movie.title)}
            className="group cursor-pointer"
          >
            {/* Poster Card */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 transition-all duration-500 hover:scale-105 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
              <img 
                src={movie.img} 
                alt={movie.title} 
                className="w-full h-[350px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                TOP 10
              </div>
            </div>

            {/* Movie Info Below */}
            <div className="mt-4">
              <h3 className="text-white text-sm font-bold truncate uppercase tracking-tighter group-hover:text-red-500 transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-500 text-[11px] font-bold">98% Match</span>
                <span className="text-zinc-500 text-[10px] border border-zinc-700 px-1 rounded-sm uppercase">4K</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LATEST RELEASE: WIDE LEO CARD */}
      <div className="mt-10 mb-20">
        <h2 className="text-white text-2xl font-bold mb-6 uppercase tracking-widest border-l-4 border-red-600 pl-4">
          Latest Release
        </h2>
        <div 
          onClick={() => handleRedirect("Leo")}
          className="relative w-full h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-red-600/50 transition-all shadow-2xl"
        >
          {/* Big Background Image (Using 13.png for Leo) */}
          <img 
            src="/14.png" 
            alt="Leo Feature" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
            <span className="text-red-600 font-black tracking-widest text-xs md:text-sm mb-2">NEW ON NETFLIX</span>
            <h1 className="text-white text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-4 drop-shadow-2xl">LEO</h1>
            <p className="text-gray-200 max-w-lg text-sm md:text-lg mb-6 leading-relaxed">
              A quiet man’s past catches up to him when a dangerous drug cartel mistakes him for a former enforcer, sparking a brutal war.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-12 py-3 rounded-sm font-bold hover:bg-gray-200 transition flex items-center">
                ▶ Play
              </button>
              <button className="bg-zinc-600/60 text-white px-8 md:px-10 py-3 rounded-sm font-bold backdrop-blur-md hover:bg-zinc-600/40 transition">
                ⓘ More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;