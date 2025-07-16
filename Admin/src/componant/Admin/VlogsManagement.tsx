


import { useState, useEffect, useRef } from 'react';
import { Plus, Save, Trash, ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Vlog {
  id?: number;
  title: string;
  video: File | null;
  thumbnail: File | null;
  videoUrl?: string;
  thumbnailUrl?: string;
  views?: number;
  likes?: number;
  duration?: string;
}

const VlogsManagement = () => {
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVlogs();
  }, []);

  useEffect(() => {
    if (vantaEffect.current) vantaEffect.current.destroy();

    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      color: 0x0ff0fc,
      backgroundColor: 0x000000,
      points: 10,
      maxDistance: 20,
      spacing: 15,
    });

    return () => vantaEffect.current?.destroy();
  }, [vlogs]);

  const fetchVlogs = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/vlogs/get-vlogs');
    const fetchedVlogs = response.data.map((vlog: any) => ({
      id: vlog.id,
      title: vlog.title || '',
      video: null,
      thumbnail: null,
      videoUrl: `http://localhost:5001${vlog.video_url}`,       // FIXED
      thumbnailUrl: `http://localhost:5001${vlog.thumbnail_url}`, // FIXED
      views: vlog.views,
      likes: vlog.likes,
      duration: vlog.duration
    }));
    setVlogs(fetchedVlogs);
  } catch (error) {
    console.error('Error fetching vlogs:', error);
  }
};


  const validateVideo = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        resolve(duration <= 1500); // 25 minutes
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleVlogChange = (index: number, field: keyof Vlog, value: any) => {
    const newVlogs = [...vlogs];
    newVlogs[index] = { ...newVlogs[index], [field]: value };
    setVlogs(newVlogs);
  };

  const handleVideoUpload = async (index: number, file: File) => {
    if (!file) return;

    if (file.size > 500 * 1024 * 1024) {
      alert('File size must be less than 500MB');
      return;
    }

    const isValidDuration = await validateVideo(file);
    if (!isValidDuration) {
      alert('Video duration must be less than 25 minutes');
      return;
    }

    handleVlogChange(index, 'video', file);
    handleVlogChange(index, 'videoUrl', URL.createObjectURL(file)); // for preview
  };

  const handleThumbnailUpload = (index: number, file: File) => {
    if (!file) return;

    handleVlogChange(index, 'thumbnail', file);
    handleVlogChange(index, 'thumbnailUrl', URL.createObjectURL(file)); // for preview
  };

  const handleAddVlog = () => {
    setVlogs([
      ...vlogs,
      { title: 'New Vlog', video: null, thumbnail: null }
    ]);
  };

  const handleDeleteVlog = (index: number) => {
    const newVlogs = vlogs.filter((_, i) => i !== index);
    setVlogs(newVlogs);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const validVlogs = vlogs.filter(vlog => vlog.title && vlog.video && vlog.thumbnail);

      if (validVlogs.length === 0) {
        alert('Please provide title, video, and thumbnail for at least one vlog');
        setLoading(false);
        return;
      }

      for (const vlog of validVlogs) {
        const formData = new FormData();
        formData.append('title', vlog.title);
        if (vlog.video) formData.append('video', vlog.video);
        if (vlog.thumbnail) formData.append('thumbnail', vlog.thumbnail);

        await axios.post('http://localhost:5001/api/vlogs/upload-vlog', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert('Vlogs saved successfully!');
      setVlogs([]);
      fetchVlogs();
    } catch (error) {
      console.error('Error saving vlogs:', error);
      alert('Error saving vlogs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={vantaRef} className="min-h-full p-6 relative text-white">
  
 
      <div className="relative z-10">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back
        </button>

        <div className="flex justify-between items-center mb-6 mt-4">
          <h2 className="text-2xl font-bold">Vlogs Management</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleAddVlog}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="mr-2" /> Add Vlog
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vlogs.map((vlog, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg relative">
              <button
                onClick={() => handleDeleteVlog(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400"
              >
                <Trash className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
                  <input
                    type="text"
                    value={vlog.title}
                    onChange={(e) => handleVlogChange(index, 'title', e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleThumbnailUpload(index, e.target.files?.[0] as File)}
                    className="w-full text-white"
                  />
                  {vlog.thumbnailUrl && (
                    <img
                      src={vlog.thumbnailUrl}
                      alt="Thumbnail"
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Upload Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoUpload(index, e.target.files?.[0] as File)}
                    className="w-full text-white"
                  />
                  {vlog.videoUrl && (
                    <div className="mt-2">
                      <video controls className="w-full h-48 object-cover rounded-lg">
                        <source src={vlog.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>

                {/* Stats */}
                {vlog.views !== undefined && (
                  <div className="text-sm text-gray-300">
                    Views: {vlog.views} | Likes: {vlog.likes || 0}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VlogsManagement;
