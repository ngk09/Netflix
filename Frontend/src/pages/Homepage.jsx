import React, { useState, useEffect } from 'react'

const Homepage = () => {
  // 1. Array of movie objects using public folder paths
  const movies = [
    { id: 1, img: "/1.png", title: "MASTER", desc: "A professor clashes with a ruthless gangster using children for crime." },
    { id: 2, img: "/2.png", title: "MARK", desc: "A gritty tale of survival and justice in the heart of the underworld." },
    { id: 3, img: "/3.png", title: "JAILER", desc: "A retired jailer goes on a manhunt to find his son's killers." },
    { id: 4, img: "/4.png", title: "YUVARATHNA", desc: "The fight to save a government college from privatization." },
    { id: 5, img: "/5.png", title: "BLOCKBUSTER", desc: "Experience the next level of cinematic excellence." }
  ];

  const [index, setIndex] = useState(0);

  // 2. Timer to change slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [movies.length]);

  return (
    <div className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center">
      
      {/* Background Layer: Cinematic Blur */}
      <img 
        src={movies[index].img} 
        alt="background"
        key={`bg-${index}`} // Unique key forces re-animation on change
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-2xl scale-110 transition-opacity duration-1000"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center px-8 md:px-20 gap-10 pt-16">
        
        {/* Poster Image: Adjusted for Portrait orientation */}
        <div className="h-[50vh] md:h-[75vh] shadow-2xl shadow-black transition-all duration-700">
          <img 
            src={movies[index].img} 
            key={`poster-${index}`}
            alt={movies[index].title}
            className="h-full w-auto object-contain rounded-lg animate-fade-in border border-white/10"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col space-y-4 max-w-xl text-center md:text-left">
          <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase italic drop-shadow-2xl">
            {movies[index].title}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl drop-shadow-md">
            {movies[index].desc}
          </p>
          
          <div className="flex justify-center md:justify-start space-x-3 pt-4">
            <button className="bg-white text-black px-10 py-3 rounded-sm font-bold hover:bg-white/80 transition flex items-center cursor-pointer">
              <span className="mr-2 text-xl">▶</span> Play
            </button>
            <button className="bg-zinc-500/50 text-white px-10 py-3 rounded-sm font-bold backdrop-blur-md hover:bg-zinc-500/30 transition cursor-pointer">
              ⓘ More Info
            </button>
          </div>
        </div>
      </div>

      {/* Signature Netflix Bottom Fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  )
}

export default Homepage