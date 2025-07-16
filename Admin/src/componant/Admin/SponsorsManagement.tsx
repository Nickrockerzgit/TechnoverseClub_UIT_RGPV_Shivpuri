

import { useState, useEffect, useRef } from 'react';
import { Plus, Save, Trash, ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Sponsor {
  id?: number;
  name: string;
  logo: string | null;
  website: string;
}

const SponsorsManagement = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [logoFiles, setLogoFiles] = useState<(File | null)[]>([]);
  const vantaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const effect = NET({
      el: vantaRef.current,
      THREE,
      color: 0x0ff0fc,
      backgroundColor: 0x000000,
      points: 12,
      maxDistance: 25,
      spacing: 15
    });

    return () => effect.destroy();
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/sponsors/get-sponsors');
      const fetchedSponsors = response.data.map((s: any) => ({
        id: s.id,
        name: s.name,
        logo: `http://localhost:5001${s.logo}`,
        website: s.website
      }));
      setSponsors(fetchedSponsors);
      setLogoFiles(fetchedSponsors.map(() => null));
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    }
  };

  const handleSponsorChange = (index: number, field: keyof Sponsor, value: string) => {
    const updated = [...sponsors];
    updated[index] = { ...updated[index], [field]: value };
    setSponsors(updated);
  };

  const handleAddSponsor = () => {
    setSponsors([...sponsors, { name: '', logo: null, website: '' }]);
    setLogoFiles([...logoFiles, null]);
  };

  const handleDeleteSponsor = (index: number) => {
    const newSponsors = sponsors.filter((_, i) => i !== index);
    const newLogoFiles = logoFiles.filter((_, i) => i !== index);
    setSponsors(newSponsors);
    setLogoFiles(newLogoFiles);
  };

  const handleLogoChange = (index: number, file: File) => {
    const updatedLogos = [...logoFiles];
    updatedLogos[index] = file;
    setLogoFiles(updatedLogos);
    const preview = URL.createObjectURL(file);
    handleSponsorChange(index, 'logo', preview);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      sponsors.forEach((sponsor, index) => {
        formData.append('name', sponsor.name);
        formData.append('website', sponsor.website);
        if (logoFiles[index]) {
          formData.append('logos', logoFiles[index] as File);
        }
      });
      await axios.post('http://localhost:5001/api/sponsors/add-sponsors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Sponsors saved successfully!');
      fetchSponsors();
    } catch (err) {
      console.error('Error saving sponsors:', err);
      alert('Failed to save sponsors');
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen p-6 relative text-white">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2" /> Back
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handleAddSponsor}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="mr-2" /> Add Sponsor
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="mr-2" /> Save Changes
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Sponsors Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg relative">
              <button
                onClick={() => handleDeleteSponsor(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400"
              >
                <Trash className="h-5 w-5" />
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={sponsor.name}
                    onChange={(e) => handleSponsorChange(index, 'name', e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoChange(index, e.target.files?.[0] as File)}
                    className="w-full text-white"
                  />
                  {sponsor.logo && (
                    <div className="mt-2">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-20 object-contain"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Website URL</label>
                  <input
                    type="text"
                    value={sponsor.website}
                    onChange={(e) => handleSponsorChange(index, 'website', e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsManagement;
