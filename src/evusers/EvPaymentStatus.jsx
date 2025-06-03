import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fallbackData = {
  paymentId: "-",
  status: "-",
  usedAmount: "-",
  refundAmount: "0",
  refundStatus: "-"
};

const EvPaymentStatus = () => {
  const userId = 1;
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
const orderDetails = JSON.parse(sessionStorage.getItem('razorpayOrder'));
console.log(orderDetails);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://chargeevya-env.eba-wzxz3wig.us-east-1.elasticbeanstalk.com/get-payment?orderId=${orderDetails.orderId}`);
        console.log( "Response",res);
        setStatus(res.data);
      } catch (err) {
        console.error("Error fetching payment status:", err);
        setStatus(fallbackData);
        setError(true);
      }
    };
    fetchStatus();
  }, [userId]);

  if (!status) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading payment status...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-green-700">Charging Summary</h1>
      </div>

      {/* {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm">
          ⚠️ Real-time data unavailable. Showing sample data.
        </div>
      )} */}

      <div className="bg-gray-100 rounded-xl p-6 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Payment ID:</span>
            <span className="font-semibold">{status.razorpayPaymentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span className="font-semibold text-green-600">{status.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Used Amount:</span>
            <span className="font-semibold">₹{(status.amount / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Refund Amount:</span>
            <span className="font-semibold">₹{status.refundAmount||0}</span>
          </div>
          {status.refundStatus && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Refund Status:</span>
              <span className="font-semibold text-blue-600">{status.refundStatus}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/evdashboard")}
        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default EvPaymentStatus;