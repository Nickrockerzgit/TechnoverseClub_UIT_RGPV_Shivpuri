
// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import NET from "vanta/dist/vanta.net.min";
// import axios from 'axios';

// interface Sponsor {
//   id: number;
//   name: string;
//   logo: string;
//   website: string;
// }

// const Sponsors = () => {
//   const vantaRef = useRef(null);
//   const [sponsors, setSponsors] = useState<Sponsor[]>([]);

//   useEffect(() => {
//     const vantaEffect = NET({
//       el: vantaRef.current,
//       THREE,
//       color: 0x0000ff,
//       backgroundColor: 0x0b0b1f,
//       points: 10.0,
//       maxDistance: 20.0,
//       spacing: 15.0,
//     });

//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchSponsors = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/sponsors/get-sponsors');
//         setSponsors(response.data);
//       } catch (error) {
//         console.error('Error fetching sponsors:', error);
//       }
//     };

//     fetchSponsors();
//   }, []);

//   return (
//     <div ref={vantaRef} className="  py-20 relative">
   

//       <div className="max-w-7xl mx-auto px-8">
//         <h2 className="text-4xl font-bold text-center text-white mb-5">
//           Our Sponsors
//         </h2>
//         <p className="text-xl font-bold text-center text-white mb-12">
//           Proud to be supported by industry leaders in technology.
//         </p>
//         <div className="flex justify-center">
//           <div className="flex flex-nowrap gap-6 overflow-x-auto pb-4">
//             {sponsors.map((sponsor) => (
//               <a
//                 key={sponsor.id}
//                 href={sponsor.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-shrink-0 w-[200px] cursor-pointer"
//               >
//                 <div className="group h-[200px] relative bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
//                   <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
//                   <div className="relative h-full flex flex-col items-center justify-center p-6">
//                     <div className="w-32 h-32 mb-4 transform transition-transform duration-300 group-hover:scale-110">
//                       <img
//                         src={`http://localhost:5001${sponsor.logo}`}
//                         alt={`${sponsor.name} logo`}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors duration-300">
//                       {sponsor.name}
//                     </h3>
//                   </div>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sponsors;



















import { useEffect, useState } from "react";
import axios from "axios";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
}

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  // 🛰️ Fetch sponsors from backend
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/sponsors/get-sponsors");
        setSponsors(response.data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div className="pt-10 pb-4 sm:pb-6 lg:pb-8">   
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-5">
          Our Sponsors
        </h2>
        <p className="text-xl font-bold text-center text-white mb-12">
          Proud to be supported by industry leaders in technology.
        </p>
        <div className="flex justify-center">
          <div className="flex flex-nowrap gap-6 overflow-x-auto pb-4">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[200px] cursor-pointer"
              >
                <div className="group h-[200px] relative bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="relative h-full flex flex-col items-center justify-center p-6">
                    <div className="w-32 h-32 mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={`http://localhost:5001${sponsor.logo}`}
                        alt={`${sponsor.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors duration-300">
                      {sponsor.name}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
