

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EvConnecting() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isConnected = true; // Simulate your real connection check here

      // Determine the calling source
      const source = location.state?.source;

      // Flow 1: from "charging start" button
      if (source ==="/evdashboard") {
        if (isConnected) {
          navigate("/evpayment");
        } else {
          alert("Connection Failed. Please try again.");
          navigate("/evdashboard");
        }
      }

      // Flow 2: from "resume payment" or any other source
      // else if (source === "/chargingstatus") {
      //   if (isConnected) {
      //     navigate("/evpaymentstatus");
      //   } else {
      //     alert("Connection Failed. Please try again.");
      //     navigate("/evdashboard");
      //   }
      // }

    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate, location.state]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src="./connecting.gif" alt="Connecting..." className="w-50 h-50" />
      <p className="text-lg font-semibold mt-4 text-gray-700">Connecting to your EV.....</p>
    </div>
  );
}
