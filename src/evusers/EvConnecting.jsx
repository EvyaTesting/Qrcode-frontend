import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EvConnecting() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isConnected = true; // You can add real checks here
      navigate(isConnected ? "/evpayment" : "/evdashboard");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src="/connecting.gif" alt="Connecting..." className="w-32 h-32" />
      <p className="text-lg font-semibold mt-4 text-gray-700">Connecting to your EV...</p>
    </div>
  );
}