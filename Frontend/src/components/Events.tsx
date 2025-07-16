
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { Calendar, MapPin, Users } from 'lucide-react';
// import axios from 'axios';

// const Events = () => {
//     const [events, setEvents] = useState([]);
//     const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         try {
//             const response = await axios.get('http://localhost:5001/get-events');

//             // Ensure all events have valid data
//             const sanitizedEvents = response.data.map((event: { date: any; location: any; participants: any; }) => ({
//                 ...event,
//                 date: event.date || "Date not available",
//                 location: event.location || "Location not provided",
//                 participants: event.participants || "Unknown",
//             }));

//             setEvents(sanitizedEvents);
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     return (
//         <div className="py-20 bg-gradient-to-b from-[#1A1A3A] to-[#0B0B1F]">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                     ref={ref}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.8 }}
//                     className="text-center mb-16"
//                 >
//                     <h2 className="text-4xl font-bold text-white mb-6">Upcoming Events</h2>
//                     <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//                         Join us for exciting events and enhance your skills with hands-on experience.
//                     </p>
//                 </motion.div>

//                 <div className="grid md:grid-cols-2 gap-8">
//                     {events.map((event, index) => (
//                         <motion.div
//                             key={event.id}
//                             initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                             animate={inView ? { opacity: 1, x: 0 } : {}}
//                             transition={{ duration: 0.8, delay: index * 0.2 }}
//                             className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
//                         >
//                             <div className="relative h-48">
//                                 <img
//                                     src={event.image?.startsWith('http') ? event.image : `http://localhost:5001${event.image || "/default.jpg"}`}
//                                     alt={event.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
//                             </div>
//                             <div className="p-6">
//                                 <h3 className="text-2xl font-semibold text-white mb-4">{event.title}</h3>
//                                 <div className="space-y-3 mb-6">
//                                     <div className="flex items-center text-gray-300">
//                                         <Calendar className="h-5 w-5 mr-3 text-purple-500" />
//                                         <span>{event.date}</span>
//                                     </div>
//                                     <div className="flex items-center text-gray-300">
//                                         <MapPin className="h-5 w-5 mr-3 text-purple-500" />
//                                         <span>{event.location}</span>
//                                     </div>
//                                     <div className="flex items-center text-gray-300">
//                                         <Users className="h-5 w-5 mr-3 text-purple-500" />
//                                         <span>{event.participants}</span>
//                                     </div>
//                                 </div>
//                                 <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
//                                     Participate Now
//                                 </button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Events;

















import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Users } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participants: string;
  image: string;
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/events/get-events');

            // Ensure all events have valid data
            const sanitizedEvents = response.data.map((event: any) => ({
                ...event,
                date: event.date || "Date not available",
                location: event.location || "Location not provided",
                participants: event.participants || "Unknown",
            }));

            setEvents(sanitizedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleParticipateClick = (eventId: number) => {
        navigate(`/event/${eventId}`);
    };

    return (
       <div className="pt-10 pb-4 sm:pb-6 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-6">Upcoming Events</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Join us for exciting events and enhance your skills with hands-on experience.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
                        >
                            <div className="relative h-48">
                                <img
                                    src={event.image?.startsWith('http') ? event.image : `http://localhost:5001${event.image || "/default.jpg"}`}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-white mb-4">{event.title}</h3>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-300">
                                        <Calendar className="h-5 w-5 mr-3 text-purple-500" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <MapPin className="h-5 w-5 mr-3 text-purple-500" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Users className="h-5 w-5 mr-3 text-purple-500" />
                                        <span>{event.participants}</span>
                                    </div>
                                </div>
                                <button 
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                    onClick={() => handleParticipateClick(event.id)}
                                >
                                   View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;