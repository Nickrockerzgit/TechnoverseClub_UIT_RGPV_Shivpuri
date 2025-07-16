
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Brain, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // 👈 Import useNavigate

const Courses = () => {
  const navigate = useNavigate();  // 👈 Initialize navigate function
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const courses = [
    {
      title: 'Web Development',
      icon: Code2,
      description: 'Learn modern web development with React, Node.js, and more.',
    },
    {
      title: 'Data Structures & Algorithms',
      icon: Database,
      description: 'Master fundamental DSA concepts and problem-solving skills.',
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      description: 'Explore artificial intelligence and machine learning fundamentals.',
    },
    {
      title: 'Cyber Security',
      icon: Shield,
      description: 'Learn to protect systems and networks from cyber threats.',
    }
  ];

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
          <h2 className="text-4xl font-bold text-white mb-6">Our Courses</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enhance your skills with our comprehensive tech courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              onClick={() => navigate('/coming-soon')}  // 👈 Navigate to Coming Soon Page
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 h-full hover:bg-white/10 transition-all transform hover:-translate-y-2">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                    <course.icon className="h-8 w-8 text-purple-400 group-hover:text-purple-300" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {course.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
