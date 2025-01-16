import React, { useState, useEffect } from 'react';
import { UserCircle, Handshake, MapPin, Mail, Link, Plus } from 'lucide-react';

// Types
interface Person {
  name: string;
  role: string;
  location: string;
  email: string;
  website: string;
  avatar: string;
}

interface HandshakeLog {
  id: number;
  name: string;
  timestamp: string;
  avatar: string;
}

// Sample person data
const person: Person = {
  name: "Sarah Anderson",
  role: "Network Developer",
  location: "San Francisco, CA",
  email: "sarah.anderson@example.com",
  website: "sarahanderson.dev",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
};

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function App() {
  const [handshakes, setHandshakes] = useState<HandshakeLog[]>([]);
  const [newHandshakeName, setNewHandshakeName] = useState('');
  const [newHandshakeAvatar, setNewHandshakeAvatar] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchHandshakes();
  }, []);

  const fetchHandshakes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/handshakes');
      const data = await response.json();
      setHandshakes(data);
    } catch (error) {
      console.error('Error fetching handshakes:', error);
    }
  };

  const handleAddHandshake = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/handshakes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newHandshakeName,
          avatar: newHandshakeAvatar,
        }),
      });

      if (response.ok) {
        const newHandshake = await response.json();
        setHandshakes([newHandshake, ...handshakes]);
        setNewHandshakeName('');
        setNewHandshakeAvatar('');
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error('Error adding handshake:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <div className="flex flex-col items-center">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <h1 className="mt-4 text-2xl font-bold text-gray-900">{person.name}</h1>
              <p className="text-gray-600">{person.role}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{person.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{person.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Link className="w-5 h-5 mr-2" />
                  <span>{person.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Handshake Stream */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Handshake className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Recent Handshakes</h2>
                </div>
                <button
                  onClick={() => setIsFormVisible(!isFormVisible)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Handshake
                </button>
              </div>

              {/* Add Handshake Form */}
              {isFormVisible && (
                <form onSubmit={handleAddHandshake} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={newHandshakeName}
                        onChange={(e) => setNewHandshakeName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar URL (optional)</label>
                      <input
                        type="url"
                        id="avatar"
                        value={newHandshakeAvatar}
                        onChange={(e) => setNewHandshakeAvatar(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsFormVisible(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              )}
              
              <div className="space-y-6">
                {handshakes.map((handshake) => (
                  <div key={handshake.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={handshake.avatar}
                      alt={handshake.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{handshake.name}</h3>
                      <p className="text-gray-500">
                        Handshake at {formatTimestamp(handshake.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;