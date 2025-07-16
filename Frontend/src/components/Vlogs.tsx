
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { ArrowRight, Play } from 'lucide-react';

// const Vlogs = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const vlogs = [
//     {
//       title: 'Getting Started with Web Development',
//       thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
//       duration: '15:30',
//       views: '1.2K'
//     },
//     {
//       title: 'Data Structures Explained',
//       thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
//       duration: '20:45',
//       views: '856'
//     },
//     {
//       title: 'Machine Learning Basics',
//       thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
//       duration: '18:20',
//       views: '2.1K'
//     },
//     {
//       title: 'Cybersecurity Fundamentals',
//       thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
//       duration: '25:15',
//       views: '1.5K'
//     }
//   ];

//   return (
//     <div className="py-20 bg-gradient-to-b from-[#0B0B1F] to-[#1A1A3A]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-white mb-6">Latest Vlogs</h2>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Watch our educational content and stay updated with the latest in technology.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {vlogs.map((vlog, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group cursor-pointer"
//             >
//               <div className="relative rounded-lg overflow-hidden mb-4">
//                 <img
//                   src={vlog.thumbnail}
//                   alt={vlog.title}
//                   className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Play className="h-12 w-12 text-white" />
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
//                   {vlog.duration}
//                 </div>
//               </div>
//               <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
//                 {vlog.title}
//               </h3>
//               <p className="text-gray-400 text-sm">{vlog.views} views</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="text-center mt-12"
//         >
//           <button className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
//             View More Vlogs
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Vlogs;




































import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Play, ThumbsUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Vlog {
  id: number;
  title: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
  views: number;
  likes: number;
}

const Vlogs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [selectedVlog, setSelectedVlog] = useState<Vlog | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchVlogs();
  }, []);

  const fetchVlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/vlogs/get-vlogs');
      setVlogs(response.data);
    } catch (error) {
      console.error('Error fetching vlogs:', error);
    }
  };

  const handleLike = async (vlogId: number) => {
    try {
      await axios.post(`http://localhost:5001/api/vlogs/like-vlog/${vlogId}`);
      fetchVlogs();
    } catch (error) {
      console.error('Error liking vlog:', error);
    }
  };

  const handlePlay = async (vlog: Vlog) => {
    try {
      await axios.post(`http://localhost:5001/api/vlogs/increment-views/${vlog.id}`);
      setSelectedVlog(vlog);
      fetchVlogs();
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  return (
    <div className="pt-10 pb-4 sm:pb-6 lg:pb-8">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Latest Vlogs</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Watch our educational content and stay updated with the latest in technology.
          </p>
        </motion.div>

        {selectedVlog && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="max-w-4xl w-full">
              <video controls autoPlay className="w-full rounded-lg">
                <source src={`http://localhost:5001${selectedVlog.video_url}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={() => setSelectedVlog(null)} className="mt-4 px-4 py-2 bg-white text-black rounded-lg">
                Close
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(showAll ? vlogs : vlogs.slice(0, 4)).map((vlog, index) => (
            <motion.div key={vlog.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img src={`http://localhost:5001${vlog.thumbnail_url}`} alt={vlog.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                <button onClick={() => handlePlay(vlog)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </button>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  {vlog.duration}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">{vlog.title}</h3>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <span>{vlog.views} views</span>
                <button onClick={(e) => { e.stopPropagation(); handleLike(vlog.id); }} className="flex items-center space-x-1 text-purple-400 hover:text-purple-300">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{vlog.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {vlogs.length > 4 && (
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="text-center mt-12">
            <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              {showAll ? 'Show Less' : 'View More Vlogs'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Vlogs;
