import React, { useState } from 'react';
import { MapPin, Phone, Mail,Toilet,
  Sofa,
  Wifi,
  ShoppingBag,
  Coffee,
  Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const connectors = [
  { id: 1, status: 'Available', slot: 'Slot A', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
  { id: 2, status: 'In Use', slot: 'Slot B', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
  { id: 3, status: 'Inactive', slot: 'Slot C', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
  { id: 4, status: 'Available', slot: 'Slot D', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
];

const amenities = [
  { name: 'Restrooms', icon: <Toilet size={20} /> },
  { name: 'Lounge', icon: <Sofa size={20} /> },
  { name: 'Wi-Fi', icon: <Wifi size={20} /> },
  { name: 'Shopping', icon: <ShoppingBag size={20} /> },
  { name: 'Cafe', icon: <Coffee size={20} /> },
  { name: 'Mechanic', icon: <Wrench size={20} /> }
];
export default function EvDashboard() {
  const [selectedTab, setSelectedTab] = useState('Connectors');
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [showConnectorDetails, setShowConnectorDetails] = useState(false);
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  const handleConnect = () => {
    setShowConnectorDetails(true);
  };

  const proceedToPayment = () => {
    setShowConnectorDetails(false);
    navigate("/evconnecting");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Station Details</h2>
        <select 
          className="border rounded p-1 text-sm"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
        </select>
      </div>

      <img
        src="/evstation.jpg"
        alt="EV Station"
        className="rounded-xl mb-4 w-full h-40 object-cover"
      />

      <div>
        <h3 className="text-md font-bold">GoGreen EV Charging P...</h3>
        <p className="text-sm text-gray-600">
          Road Number 12, Indian Oil Petrol Pump Indira Nagar, Gachibowli, Hyderabad - 500033
        </p>
      </div>

      <div className="flex space-x-4 mt-4 border-b">
        <button
          className={`pb-2 ${selectedTab === 'Connectors' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('Connectors')}
        >
          Connectors
        </button>
        <button
          className={`pb-2 ${selectedTab === 'Information' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('Information')}
        >
          Information
        </button>
      </div>

      {selectedTab === 'Connectors' ? (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Select a Connector</h4>
          <div className="grid grid-cols-2 gap-2">
            {connectors.map((conn) => (
              <div
                key={conn.id}
                className={`rounded-lg p-3 ${conn.status === 'Available' ? 'bg-green-100 border-l-4 border-green-400' : conn.status === 'In Use' ? 'bg-yellow-100 border-l-4 border-yellow-400' : 'bg-gray-200 border-l-4 border-gray-400'} ${selectedConnector === conn.id ? 'ring-2 ring-green-500' : ''}`}
               onClick={() => {
  if (conn.status === 'Available') {
    setSelectedConnector(conn.id);
    setShowConnectorDetails(true);
  }
}}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{conn.slot}</span>
                  <span className={`text-xs ${conn.status === 'Available' ? 'text-green-600' : conn.status === 'In Use' ? 'text-yellow-600' : 'text-gray-500'}`}>{conn.status}</span>
                </div>
                <div className="text-xs text-gray-700 mt-1">{conn.type}</div>
                <div className="text-xs">{conn.price}</div>
              </div>
            ))}
          </div>
          
          {/* {selectedConnector !== null && (
            <button 
              className="mt-4 px-6 py-2 bg-green-600 rounded text-white font-semibold w-full"
              onClick={handleConnect}
            >
              Connect
            </button>
          )} */}
        </div>
      ) : (
        <div className="mt-4">
  <h4 className="font-semibold mb-2">Amenities</h4>
  <div className="grid grid-cols-3 gap-4 mb-4">
    {amenities.map((amenity, index) => (
      <div key={index} className="flex flex-col items-center text-sm text-gray-600">
        <div className="w-10 h-10 bg-gray-200 rounded-full mb-1 flex items-center justify-center">
          {amenity.icon} {/* Render Lucide icon directly */}
        </div>
        {amenity.name}
      </div>
    ))}
  </div>

          <h4 className="font-semibold mb-1">Contact Details</h4>
          <div className="text-sm text-gray-600">
            <div className="flex items-start mb-2">
              <MapPin className="w-4 h-4 mt-1 mr-2" />
              Road Number 12, Indian Oil Petrol Pump Indira Nagar, Gachibowli, Hyderabad - 500033
            </div>
            <img
              src="/map.png"
              alt="Map"
              className="rounded-xl mb-2 w-full h-32 object-cover"
            />
            <div className="flex items-center mb-1 text-green-600">
              <Phone className="w-4 h-4 mr-2" /> +91 9876 5432 10
            </div>
            <div className="flex items-center text-green-600">
              <Mail className="w-4 h-4 mr-2" /> gogreen_ev_charging@evya.com
            </div>
          </div>
        </div>
      )}

      {/* Connector Details Popup */}
      {showConnectorDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Connector Details</h3>
            <div className="space-y-3">
              {connectors.filter(c => c.id === selectedConnector).map(conn => (
                <React.Fragment key={conn.id}>
                  <div className="flex justify-between">
                    <span className="font-medium">Slot:</span>
                    <span>{conn.slot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span>{conn.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span>{conn.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Level:</span>
                    <span>{conn.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Power:</span>
                    <span>{conn.power}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border rounded"
                onClick={() => setShowConnectorDetails(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={proceedToPayment}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}