// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const fallbackData = {
//   paymentId: "PAY123456",
//   status: "Failed to Fetch – Showing Sample Data",
//   usedAmount: 120,
//   refundAmount: 30,
//   refundStatus: "Refund Initiated"
// };

// const EvPaymentStatus = () => {
//   const userId = 1;
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/payment-status?userId=${userId}`);
//         setStatus(res.data);
//       } catch (err) {
//         console.error("Error fetching payment status:", err);
//         setStatus(fallbackData);
//         setError(true);
//       }
//     };
//     fetchStatus();
//   }, [userId]);

//   if (!status) return <p className="text-center text-gray-600">Loading payment status...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white border border-gray-200 relative">
      
//       {/* Top-right close icon */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
//         title="Close"
//       >
//         ×
//       </button>

//       <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">Payment Summary</h2>

//       {error && (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded mb-4">
//           ⚠️ Unable to fetch real data. Showing test data.
//         </div>
//       )}

//       <div className="space-y-2 mb-6">
//         <p><span className="font-semibold">Payment ID:</span> {status.paymentId}</p>
//         <p><span className="font-semibold">Status:</span> {status.status}</p>
//         <p><span className="font-semibold">Used Amount:</span> ₹{status.usedAmount}</p>
//         <p><span className="font-semibold">Refund Amount:</span> ₹{status.refundAmount}</p>
//         {status.refundStatus && (
//           <p><span className="font-semibold">Refund Status:</span> {status.refundStatus}</p>
//         )}
//       </div>

//       {/* Bottom Close Button */}
//       <div className="text-center">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EvPaymentStatus;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fallbackData = {
  paymentId: "PAY123456",
  status: "Failed to Fetch – Showing Sample Data",
  usedAmount: 120,
  refundAmount: 30,
  refundStatus: "Refund Initiated"
};

const EvPaymentStatus = () => {
  const userId = 1;
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/payment-status?userId=${userId}`);
        setStatus(res.data);
      } catch (err) {
        console.error("Error fetching payment status:", err);
        setStatus(fallbackData);
        setError(true);
      }
    };
    fetchStatus();
  }, [userId]);

  if (!status)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading payment status...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="relative bg-white shadow-2xl rounded-2xl p-6 w-full max-w-lg border border-gray-200">

        {/* Top-right close icon */}
        <button
          onClick={() => navigate("/evdashboard")}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
          title="Close"
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-6">EV Payment Status</h2>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm text-center">
            ⚠️ Real-time data unavailable. Showing sample data.
          </div>
        )}

        <div className="space-y-4 text-gray-700 text-base">
          <div className="flex justify-between">
            <span className="font-semibold">Payment ID:</span>
            <span>{status.paymentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className="text-green-600 font-medium">{status.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Used Amount:</span>
            <span>₹{status.usedAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Refund Amount:</span>
            <span>₹{status.refundAmount}</span>
          </div>
          {status.refundStatus && (
            <div className="flex justify-between">
              <span className="font-semibold">Refund Status:</span>
              <span className="text-blue-600">{status.refundStatus}</span>
            </div>
          )}
        </div>

        {/* Bottom Close Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/evdashboard")}
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvPaymentStatus;
