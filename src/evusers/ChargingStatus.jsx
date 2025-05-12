import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChargingStatus = () => {
  const paymentId = "pay_QRByXsVzuCOKOg";
  const usedAmount = 600.00;
  const navigate = useNavigate();

  const handleEnd = async () => {
    try {
      const res = await axios.post(
        `https://charge-evya-production.up.railway.app/capture-payment?paymentId=${paymentId}&amount=${usedAmount}`
      );
      alert(res.data || "Payment finalized. Refund (if any) will be processed.");
    } catch (error) {
      console.error("Error finalizing payment:", error);
      alert("Something went wrong while finalizing the payment.");
    }
    navigate('/evpaymentstatus', {
      state: { source: 'chargingstatus' },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">⚡ Charging</h1>
        </div>

        <div className="flex justify-between items-center bg-blue-50 rounded-lg p-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">25</div>
            <div className="text-sm text-gray-500">kW</div>
            <div className="text-xs text-blue-400">43x</div>
          </div>
          <div className="border-l border-gray-300 h-12"></div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">Charging Time</h2>
            <div className="text-xl font-medium text-gray-800">
              00:12:16 <span className="text-xs text-gray-400">/vozas</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-600">Cost: </span>
              <span className="text-lg font-bold text-green-600">
                ₹812.00 <span className="text-xs text-gray-500">/zzzoo</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-purple-50 rounded-lg p-4">
          <div>
            <h2 className="text-lg font-semibold">Units</h2>
            <div className="text-xl font-medium text-purple-700">
              12 <span className="text-xs text-purple-400">/zs</span>
            </div>
          </div>
          <div className="border-l border-gray-300 h-12"></div>
          <div>
            <span className="text-gray-600">Speed: </span>
            <span className="text-lg font-bold text-indigo-600">
              5.5 <span className="text-xs text-indigo-400">wm</span>
            </span>
          </div>
        </div>

        <div className="text-center bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700">🚗 Tata Curvy EV</h2>
          <div className="text-sm font-medium text-gray-500">TS08EV9876</div>
        </div>

        <div className="text-center">
          <button
            onClick={handleEnd}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            ⛔ Stop Charging
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargingStatus;
