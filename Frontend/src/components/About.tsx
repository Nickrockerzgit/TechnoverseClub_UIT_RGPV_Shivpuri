
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MapPin, Calendar, Building } from 'lucide-react';


const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Users, label: 'Registered Users', value: '500+' },
    { icon: Building, label: 'Community Partners', value: '20+' },
    { icon: MapPin, label: 'Cities', value: '15+' },
    { icon: Calendar, label: 'Events', value: '100+' },
  ];

  return (
  <div className="pt-10 pb-4 sm:pb-6 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">About Technovers</h2>
            <p className="text-gray-300 text-lg mb-6">
              Technovers is more than just a coding club - it's a community of passionate
              developers, innovators, and problem solvers. We believe in hands-on learning,
              collaborative growth, and pushing the boundaries of technology.
            </p>
            <p className="text-gray-300 text-lg">
              Our mission is to nurture the next generation of tech leaders through
              practical experience, mentorship, and real-world projects. Join us in
              our journey to transform ideas into impactful solutions.
            </p>
          </motion.div>

          {/* Right side - Animated SVG */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
              <div className="absolute inset-0 backdrop-blur-sm rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 relative">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 border-2 border-purple-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.5, 0.1],
                      }}
                      transition={{
                        duration: 3,
                        delay: index * 0.8,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <code className="text-purple-500 text-xl">&lt;/&gt;</code>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>






        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center transform perspective-1500"
    >
      <div
        className="flex justify-center mb-4 transform hover:scale-110 transition-all duration-300 ease-in-out hover:rotate-3d hover:shadow-lg"
      >
        <stat.icon className="h-8 w-8 text-purple-500" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
      <div className="text-gray-400">{stat.label}</div>
    </motion.div>
  ))}
</div>


      </div>
    </div>
    
  );
};

export default About;