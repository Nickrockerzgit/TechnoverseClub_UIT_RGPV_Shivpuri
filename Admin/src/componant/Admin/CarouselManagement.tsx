
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

interface Slide {
  title: string;
  description: string;
  image: File | string;
}

// const baseURL = import.meta.env.VITE_BASE_URL;

const CarouselManagement = () => {
  const [slides, setSlides] = useState<Slide[]>([
    { title: '', description: '', image: '' },
    { title: '', description: '', image: '' },
    { title: '', description: '', image: '' }
  ]);

  const vantaRef = useRef(null);
  
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE,
      color: 0x0ff0fc,
      backgroundColor: 0x0b0b1f,
      points: 10.0,
      maxDistance: 20.0,
      spacing: 15.0,
    });
    return () => vantaEffect.destroy();
  }, []);




   // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/carousel/get-slides");
        const fetchedSlides = response.data;

        const formattedSlides: Slide[] = fetchedSlides.map((slide: any) => ({
          title: slide.title || '',
          description: slide.description || '',
          image: slide.image || '',
        }));

        setSlides(formattedSlides.length > 0 ? formattedSlides : [
          { title: '', description: '', image: '' },
          { title: '', description: '', image: '' },
          { title: '', description: '', image: '' }
        ]);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  const handleSlideChange = (index: number, field: string, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  const handleImageUpload = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const newSlides = [...slides];
    newSlides[index] = {
      ...newSlides[index],
      image: file
    };
    setSlides(newSlides);
  };

  const handleSave = async () => {
    try {
      const isValid = slides.every(slide => slide.title && slide.description && slide.image);
      if (!isValid) {
        alert('Please fill in all fields for all slides');
        return;
      }

      const formData = new FormData();
      slides.forEach((slide) => {
        if (slide.image instanceof File) {
          formData.append("image", slide.image);
        }
      });

      formData.append('slides', JSON.stringify(slides.map(slide => ({
        title: slide.title,
        description: slide.description
      }))));

      const response = await axios.post("http://localhost:5001/api/carousel/upload-slide", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        alert('Slides saved successfully!');
        setSlides([{ title: '', description: '', image: '' }, { title: '', description: '', image: '' }, { title: '', description: '', image: '' }]);
        fileInputRefs.current.forEach(ref => { if (ref) ref.value = ''; });
      }
    } catch (error) {
      console.error('Error saving slides:', error);
      alert('Error saving slides. Please try again.');
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen p-6 relative text-white">
      <div className="relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin')}
          // className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
          <ArrowLeft className="mr-2" /> Back
        </button>

        {/* Page Heading */}
        <div>
          <div className="flex justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Carousel Management</h2>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="mr-2" /> Save Changes
            </button>
          </div>


          <div className="space-y-6">
            {slides.map((slide, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Image Upload</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      ref={el => fileInputRefs.current[index] = el}
                      className="w-full text-white"
                    />
                    {slide.image && (
                      <div className="mt-4">
                        <img
                           src={slide.image instanceof File ? URL.createObjectURL(slide.image) : `http://localhost:5001${slide.image}`}
                          alt={slide.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                        className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        placeholder="Enter slide title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                      <textarea
                        value={slide.description}
                        onChange={(e) => handleSlideChange(index, 'description', e.target.value)}
                        className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        rows={3}
                        placeholder="Enter slide description"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselManagement;
