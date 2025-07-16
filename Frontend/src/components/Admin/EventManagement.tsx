
import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Plus, Save, Trash, DollarSign, Tag, Info, FileText, Clock, ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Rule {
  text: string;
}

interface Event {
  id?: number;
  title: string;
  date: string;
  location: string;
  participants: string;
  image: string;
  prize_pool: string;
  entry_fee: string;
  categories: string;
  about: string;
  rules_guidelines: Rule[];
  registration_start: string;
  registration_end: string;
  event_start: string;
  event_end: string;
}

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvents();
  }, []);
const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/events/get-events');
    const processedEvents = response.data.map((event: any) => ({
      ...event,
      rules_guidelines: event.rules_guidelines ? 
        (typeof event.rules_guidelines === 'string' ? 
          JSON.parse(event.rules_guidelines) : 
          event.rules_guidelines) : 
        []
    }));

    const formatDate = (iso: string) => iso?.split('T')[0] ?? '';

    const finalEvents = processedEvents.map((event: any) => ({
      ...event,
      date: formatDate(event.date),
      registration_start: formatDate(event.registration_start),
      registration_end: formatDate(event.registration_end),
      event_start: formatDate(event.event_start),
      event_end: formatDate(event.event_end),
    }));

    setEvents(finalEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};


  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.destroy();
    }

    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      color: 0x0ff0fc,
      backgroundColor: 0x000000,
      points: 12,
      maxDistance: 25,
      spacing: 15
    });

    return () => vantaEffect.current?.destroy(); 
  }, [events]); 

  const handleAddEvent = () => {
    setEvents([...events, { 
      title: 'New Event', 
      date: '', 
      location: '', 
      participants: '', 
      image: '',
      prize_pool: '',
      entry_fee: '',
      categories: '',
      about: '',
      rules_guidelines: [{ text: '' }],
      registration_start: '',
      registration_end: '',
      event_start: '',
      event_end: ''
    }]);
  };

  const handleDeleteEvent = async (index: number) => {
    try {
      const eventToDelete = events[index];
      if (eventToDelete.id) {
        await axios.delete(`http://localhost:5001/api/events/delete-event/${eventToDelete.id}`);
      }
      setEvents(events.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  const handleEventChange = (index: number, field: keyof Event, value: any) => {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setEvents(updatedEvents);
  };

  const handleRuleChange = (eventIndex: number, ruleIndex: number, value: string) => {
    const updatedEvents = [...events];
    const updatedRules = [...updatedEvents[eventIndex].rules_guidelines];
    updatedRules[ruleIndex] = { text: value };
    updatedEvents[eventIndex].rules_guidelines = updatedRules;
    setEvents(updatedEvents);
  };

  const handleAddRule = (eventIndex: number) => {
    if (events[eventIndex].rules_guidelines.length < 6) {
      const updatedEvents = [...events];
      updatedEvents[eventIndex].rules_guidelines = [
        ...updatedEvents[eventIndex].rules_guidelines,
        { text: '' }
      ];
      setEvents(updatedEvents);
    } else {
      alert('Maximum 6 rules and guidelines allowed.');
    }
  };

  const handleDeleteRule = (eventIndex: number, ruleIndex: number) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].rules_guidelines = updatedEvents[eventIndex].rules_guidelines.filter(
      (_, i) => i !== ruleIndex
    );
    setEvents(updatedEvents);
  };

  const handleImageUpload = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Changed from /upload to /upload-event-image to match the server endpoint
      const response = await axios.post('http://localhost:5001/api/events/upload-event-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.imagePath) {
        handleEventChange(index, 'image', response.data.imagePath);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      const formattedEvents = events.map(event => ({
        ...event,
        date: event.date.split("T")[0], // Extract YYYY-MM-DD part
        registration_start: event.registration_start.split("T")[0],
        registration_end: event.registration_end.split("T")[0],
        event_start: event.event_start.split("T")[0],
        event_end: event.event_end.split("T")[0],
        rules_guidelines: JSON.stringify(event.rules_guidelines)
      }));

      await axios.post('http://localhost:5001/api/events/update-events', { events: formattedEvents });
      alert('Events updated successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error saving events:', error);
      alert('Error saving events. Please try again.');
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen p-6 relative text-white">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10">
      <button
            onClick={() => navigate('/admin')}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="mr-2" /> Back 
          </button>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Events Management</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleAddEvent}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="mr-2" /> Add Event
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Save className="mr-2" /> Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-lg relative">
              <button
                onClick={() => handleDeleteEvent(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400"
              >
                <Trash className="h-5 w-5" />
              </button>
              
              {/* Basic Info Section */}
              <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL or Upload</label>
                  <input
                    type="text"
                    value={event.image}
                    onChange={(e) => handleEventChange(index, 'image', e.target.value)}
                    className="w-full bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Paste image URL or upload"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(index, file);
                      }
                    }}
                    className="mt-2 w-full text-white"
                  />
                  {event.image && (
                    <div className="mt-4">
                      <img
                        src={event.image.startsWith('http') ? event.image : `http://localhost:5001${event.image}`}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                      className="w-full bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                      <Calendar className="mr-2" />
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                      <MapPin className="mr-2" />
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Participants</label>
                    <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                      <Users className="mr-2" />
                      <input
                        type="text"
                        value={event.participants}
                        onChange={(e) => handleEventChange(index, 'participants', e.target.value)}
                        className="w-full bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Info Section */}
              <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Prize Pool</label>
                  <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                    <DollarSign className="mr-2" />
                    <input
                      type="text"
                      value={event.prize_pool}
                      onChange={(e) => handleEventChange(index, 'prize_pool', e.target.value)}
                      className="w-full bg-transparent"
                      placeholder="e.g. ₹10,000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Entry Fee</label>
                  <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                    <DollarSign className="mr-2" />
                    <input
                      type="text"
                      value={event.entry_fee}
                      onChange={(e) => handleEventChange(index, 'entry_fee', e.target.value)}
                      className="w-full bg-transparent"
                      placeholder="e.g. ₹500 per team"
                    />
                  </div>
                </div>
              </div>

              {/* Categories Section */}
              <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Categories</h3>
              <div className="mb-8">
                <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                  <Tag className="mr-2" />
                  <input
                    type="text"
                    value={event.categories}
                    onChange={(e) => handleEventChange(index, 'categories', e.target.value)}
                    className="w-full bg-transparent"
                    placeholder="e.g. Gaming, Technology, Sports"
                  />
                </div>
              </div>

              {/* About Section */}
              <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">About Event</h3>
              <div className="mb-8">
                <div className="flex items-start bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                  <Info className="mr-2 mt-2" />
                  <textarea
                    value={event.about}
                    onChange={(e) => handleEventChange(index, 'about', e.target.value)}
                    className="w-full bg-transparent min-h-[100px] resize-y"
                    placeholder="Describe your event..."
                  />
                </div>
              </div>

              {/* Rules & Guidelines Section */}
              <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">
                Rules & Guidelines
                <button
                  onClick={() => handleAddRule(index)}
                  className="ml-4 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  disabled={event.rules_guidelines.length >= 6}
                >
                  <Plus className="h-4 w-4 inline" /> Add Rule
                </button>
              </h3>
              <div className="mb-8 space-y-4">
                {event.rules_guidelines.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="flex items-start">
                    <div className="flex-grow flex items-start bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                      <FileText className="mr-2 mt-2" />
                      <input
                        type="text"
                        value={rule.text}
                        onChange={(e) => handleRuleChange(index, ruleIndex, e.target.value)}
                        className="w-full bg-transparent"
                        placeholder={`Rule ${ruleIndex + 1}`}
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteRule(index, ruleIndex)}
                      className="ml-2 text-red-500 hover:text-red-400"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {event.rules_guidelines.length === 0 && (
                  <p className="text-gray-400 italic">No rules added yet. Click "Add Rule" to add up to 6 rules.</p>
                )}
              </div>

              {/* Dates & Times Section */}
              <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">Dates & Times</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Registration Start</label>
                  <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                    <Clock className="mr-2" />
                    <input
                      type="date"
                      value={event.registration_start}
                      onChange={(e) => handleEventChange(index, 'registration_start', e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Registration End</label>
                  <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                    <Clock className="mr-2" />
                    <input
                      type="date"
                      value={event.registration_end}
                      onChange={(e) => handleEventChange(index, 'registration_end', e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Start</label>
                  <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                    <Clock className="mr-2" />
                    <input
                      type="date"
                      value={event.event_start}
                      onChange={(e) => handleEventChange(index, 'event_start', e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event End</label>
                  <div className="flex items-center bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white">
                    <Clock className="mr-2" />
                    <input
                      type="date"
                      value={event.event_end}
                      onChange={(e) => handleEventChange(index, 'event_end', e.target.value)}
                      className="w-full bg-transparent"
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

export default EventsManagement;






