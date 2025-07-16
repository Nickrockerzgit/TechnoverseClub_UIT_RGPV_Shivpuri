import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { Github, Linkedin, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const skills = [
  'HTML/CSS', 'JavaScript', 'React.js', 'Python', 'Java', 'C++/DSA', 'Git/GitHub'
];

const interests = [
  'Web Development', 'App Development', 'Competitive Programming',
  'UI/UX Design', 'AI/ML', 'Cybersecurity', 'Open Source Contributions'
];

// const timeSlots = ['Morning', 'Afternoon', 'Evening'];
const roles = ['Frontend Developer', 'Backend Developer', 'Designer', 'Content Creator', 'Event Organizer'];

function Joinus() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x6610f2,
          backgroundColor: 0x0a192f,
          points: 15.00,
          maxDistance: 25.00,
          spacing: 15.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = formRef.current;
    if (!form) return;

    const formData = {
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      collegeName: (form.elements.namedItem('collegeName') as HTMLInputElement).value,
      courseStream: (form.elements.namedItem('courseStream') as HTMLInputElement).value,
      yearOfStudy: (form.elements.namedItem('yearOfStudy') as HTMLSelectElement).value,
      skills: skills.filter((_, i) => (form.elements.namedItem(`skill-${i}`) as HTMLInputElement).checked),
      interests: interests.filter((_, i) => (form.elements.namedItem(`interest-${i}`) as HTMLInputElement).checked),
      motivation: (form.elements.namedItem('motivation') as HTMLTextAreaElement).value,
      githubUrl: (form.elements.namedItem('githubUrl') as HTMLInputElement).value,
      linkedinUrl: (form.elements.namedItem('linkedinUrl') as HTMLInputElement).value,
      websiteUrl: (form.elements.namedItem('websiteUrl') as HTMLInputElement).value,
      // availability: timeSlots.filter((_, i) => (form.elements.namedItem(`availability-${i}`) as HTMLInputElement).checked),
      teamPreferences: roles.filter((_, i) => (form.elements.namedItem(`role-${i}`) as HTMLInputElement).checked),
    };

    try {
      const response = await fetch("http://localhost:5001/api/joinus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
        form.reset();
      } else if (response.status === 400) {
        toast.error("You have already submitted your application.");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen bg-[#0a192f] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl mt-[40px]">
          <h1 className="text-4xl font-bold text-center mb-8">Join Our Tech Community</h1>
          
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Educational Details */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Educational Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">College/School Name</label>
                  <input
                    name="collegeName"
                    type="text"
                    className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Course/Stream</label>
                  <input
                    name="courseStream"
                    type="text"
                    className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year of Study</label>
                  <select
                    name="yearOfStudy"
                    className="w-full px-4 py-2 rounded text-white bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="" style={{ color: "black" }}>Select Year</option>
                    <option value="1" style={{ color: "black" }}>1st Year</option>
                    <option value="2" style={{ color: "black" }}>2nd Year</option>
                    <option value="3" style={{ color: "black" }}>3rd Year</option>
                    <option value="4" style={{ color: "black" }}>4th Year</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Technical Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      name={`skill-${index}`}
                      type="checkbox"
                      className="rounded bg-white/5 border-blue-500/30"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
                <div>
                  <input
                    name="otherSkills"
                    type="text"
                    placeholder="Other skills..."
                    className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Interests */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Interests</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interests.map((interest, index) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      name={`interest-${index}`}
                      type="checkbox"
                      className="rounded bg-white/5 border-blue-500/30"
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Motivation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Why Do You Want to Join?</h2>
              <textarea
                name="motivation"
                className="w-full px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows={4}
                placeholder="Tell us about your motivation (100-200 words)"
                required
              ></textarea>
            </section>

            {/* Portfolio Links */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Portfolio Links (Optional)</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <input
                    name="githubUrl"
                    type="url"
                    placeholder="GitHub Profile URL"
                    className="flex-1 px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-5 h-5" />
                  <input
                    name="linkedinUrl"
                    type="url"
                    placeholder="LinkedIn Profile URL"
                    className="flex-1 px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <input
                    name="websiteUrl"
                    type="url"
                    placeholder="Personal Website URL"
                    className="flex-1 px-4 py-2 rounded bg-white/5 border border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Availability */}
            {/* <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Availability</h2>
              <div className="grid grid-cols-3 gap-4">
                {timeSlots.map((slot, index) => (
                  <label key={slot} className="flex items-center space-x-2">
                    <input
                      name={`availability-${index}`}
                      type="checkbox"
                      className="rounded bg-white/5 border-blue-500/30"
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </section> */}

            {/* Team Preferences */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Team Preferences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roles.map((role, index) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      name={`role-${index}`}
                      type="checkbox"
                      className="rounded bg-white/5 border-blue-500/30"
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Joinus;