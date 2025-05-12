// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function EvConnecting() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const isConnected = true; // You can add real checks here

//       if (isConnected) {
//         navigate("/evdashboard/connecting/evpayments");
//       } else {
//         alert("Connection Failed. Please try again.");
//         navigate("/evdashboard");
//       }
//     }, 3000); // 3 seconds delay

//     return () => clearTimeout(timeout);
//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white">
//       <img src="/images/connecting.gif" alt="Connecting..." className="w-100 h-100" />
//       <p className="text-lg font-semibold mt-4 text-gray-700">Connecting to your EV.....</p>
//     </div>
//   );
// }

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
      if (source ==="/evdashboard/connecting") {
        if (isConnected) {
          navigate("/evdashboard/connecting/evpayments");
        } else {
          alert("Connection Failed. Please try again.");
          navigate("/evdashboard");
        }
      }

      // Flow 2: from "resume payment" or any other source
      else if (source === "/evdashboard/connecting/evpayments/chargingstatus") {
        if (isConnected) {
          navigate("/EvPaymentStatus");
        } else {
          alert("Connection Failed. Please try again.");
          navigate("/evdashboard/connecting/evpayments/chargingstatus");
        }
      }

    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, location.state]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src="./connecting.gif" alt="Connecting..." className="w-50 h-50" />
      <p className="text-lg font-semibold mt-4 text-gray-700">Connecting to your EV.....</p>
    </div>
  );
}
