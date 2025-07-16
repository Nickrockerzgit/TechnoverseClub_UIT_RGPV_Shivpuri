

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin } from 'lucide-react';
import axios from 'axios';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
}

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/team/get-team-members');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

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
          <h2 className="text-4xl font-bold text-white mb-6">Our Team</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the passionate individuals behind Technovers who make it all possible.
          </p>
        </motion.div>

        {/* President and Vice President - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {teamMembers.slice(0, 2).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-110 hover:rotate-3d transition-all duration-300 ease-in-out"
            >
              <div className="relative mb-4 mx-auto w-32 h-32">
                <img
                  src={`http://localhost:5001${member.image}`}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.github} className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href={member.linkedin} className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Team Members - Bottom Row (5 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.slice(2).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center transform hover:scale-110 hover:rotate-3d transition-all duration-300 ease-in-out"
            >
              <div className="relative mb-4 mx-auto w-24 h-24 lg:w-28 lg:h-28">
                <img
                  src={`http://localhost:5001${member.image}`}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-4 text-sm">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.github} className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href={member.linkedin} className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;