
import { ChangeEvent, useEffect, useState } from 'react';
import { Users, Github, Linkedin, Save, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

interface TeamMember {
  name: string;
  role: string;
  image: string | null;
  github: string;
  linkedin: string;
}

const TeamManagement = () => {
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      name: 'John Doe',
      role: 'Club President',
      image: null,
      github: '#', 
      linkedin: '#' 
    },
    { 
      name: 'Jane Smith',
      role: 'Vice President',
      image: null,
      github: '#', 
      linkedin: '#' 
    },
    {
      name: 'Mike Johnson', 
      role: 'Secretary ',
      image: null, 
      github: '#',
      linkedin: '#'
    },
    { 
      name: 'Sarah Williams',
      role: 'Developer Head',
      image: null,
      github: '#',
      linkedin: '#'
    },
    { 
      name: 'David Brown', 
      role: 'Technical Head',
      image: null, 
      github: '#', 
      linkedin: '#' 
    },
  ]);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: '#vanta-bg',
          THREE,
          color: 0x0ff0fc,
          backgroundColor: 0x111827,
          points: 12,
          maxDistance: 20,
          spacing: 15,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);


  // ✅ Fetch current team members on mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/team/get-team-members');
        const fetched = response.data;

        const formatted = fetched.map((member: any) => ({
          name: member.name || '',
          role: member.role || '',
          image: member.image ? `http://localhost:5001${member.image}` : null,
          github: member.github || '',
          linkedin: member.linkedin || '',
        }));

        setTeamMembers(formatted);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string | null) => {
    setTeamMembers(prev =>
      prev.map((member, i) => (i === index ? { ...member, [field]: value } : member))
    );
  };

  const handleImageUpload = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleMemberChange(index, 'image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      teamMembers.forEach((member, index) => {
        formData.append('name', member.name);
        formData.append('role', member.role);
        formData.append('github', member.github);
        formData.append('linkedin', member.linkedin);

        if (member.image && member.image.startsWith('data:image')) {
          const base64Data = member.image.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });

          formData.append('image', blob, `profile_${index}.jpg`);
        }
      });

      await axios.post('http://localhost:5001/api/team/add-team-member', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Team members saved successfully!');
    } catch (error) {
      console.error('Error saving team members:', error);
      alert('Error saving team members. Please try again.');
    }
  };

  return (
       <div id="vanta-bg" className="min-h-screen p-10 text-white">
      <div className="relative z-10">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back
        </button>

        <div className="flex justify-between items-center mb-6 gap-4 mt-4">
          <h2 className="text-2xl font-bold">Team Management</h2>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Save className="mr-2" /> Save Changes
          </button>
        </div>

        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                  {member.image && (
                    <div className="mt-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
                      <Users className="mr-2" /> Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
                      <Github className="mr-2" /> GitHub URL
                    </label>
                    <input
                      type="text"
                      value={member.github}
                      onChange={(e) => handleMemberChange(index, 'github', e.target.value)}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
                      <Linkedin className="mr-2" /> LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={member.linkedin}
                      onChange={(e) => handleMemberChange(index, 'linkedin', e.target.value)}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
