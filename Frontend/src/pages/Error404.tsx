import { useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

function App() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = NET({
      el: vantaRef.current,
      THREE: THREE,
      color: 0x8b9cff,
      backgroundColor: 0x000000,
      maxDistance: 20,
      points: 12
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="min-h-screen bg-black text-white flex flex-col">
    

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-[#8B9CFF] text-[200px] font-bold leading-none select-none">404</h1>

        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">SORRY! PAGE NOT FOUND</h2>

        <p className="max-w-lg text-gray-400 mb-8">
          Oops! It seems like the page you're trying to access doesn't exist. If you believe there's an issue, feel free to report it, and we'll look into it.
        </p>

        <div className="flex gap-4">
          <a 
            href="/"
            className="px-6 py-3 bg-transparent border-2 border-[#8B9CFF] text-[#8B9CFF] rounded-full 
            hover:bg-[#8B9CFF] hover:text-black transition-all duration-300"
          >
            RETURN HOME
          </a>
          <button 
            className="px-6 py-3 bg-transparent border-2 border-[#8B9CFF] text-[#8B9CFF] rounded-full 
            hover:bg-[#8B9CFF] hover:text-black transition-all duration-300"
          >
            REPORT PROBLEM
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
