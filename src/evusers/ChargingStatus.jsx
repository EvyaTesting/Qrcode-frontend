import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChargingStatus = () => {
  const [isCharging, setIsCharging] = useState(true);
  const navigate = useNavigate();

  const handleStopCharging = () => {
    setIsCharging(false);
    setTimeout(() => {
      navigate('/evpaymentstatus');
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-green-700">Charging Status</h1>
      </div>

      <div className="bg-gray-100 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-4xl font-bold text-green-600">25</div>
            <div className="text-gray-600">kW</div>
          </div>
          <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            43x faster
          </div>
        </div>

        <div className="h-px bg-gray-300 my-4"></div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Charging Time</h2>
            <div className="text-lg font-semibold">00:12:16</div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Cost</h2>
            <div className="text-lg font-semibold">₹812.00</div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Units</h2>
            <div className="text-lg font-semibold">12 kW</div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Speed</h2>
            <div className="text-lg font-semibold">5.5 kW/h</div>
          </div>
        </div>

        <div className="h-px bg-gray-300 my-4"></div>

        <div className="text-center">
          <h2 className="text-lg font-medium">Tata Curvy EV</h2>
          <div className="text-sm text-gray-600">TS08EV9876</div>
        </div>
      </div>

      <button 
        className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
        onClick={handleStopCharging}
      >
        {isCharging ? 'Stop Charging' : 'Processing...'}
      </button>

      {!isCharging && (
        <div className="mt-4 text-center text-gray-600">
          Preparing your charging summary...
        </div>
      )}
    </div>
  );
};

export default ChargingStatus;