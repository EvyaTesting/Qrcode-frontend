// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
// import useTranslation from '../components/useTranslation';
// import LanguageSelector from '../components/Language';

// const fallbackData = {
//   razorpayPaymentId: "-",
//   status: "pending",
//   amount: 0,
//   refundAmount: 0,
//   refundStatus: "-"
// };

// const EvPaymentStatus = () => {
//   const { t } = useTranslation();
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
  
//   const orderDetails = JSON.parse(sessionStorage.getItem('razorpayOrder')) || {};

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/get-payment?orderId=${orderDetails.orderId}`);
//         setStatus(res.data);
//       } catch (err) {
//         console.error("Error fetching payment status:", err);
//         setStatus({ ...fallbackData, amount: orderDetails.amount * 100 || 0 });
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderDetails.orderId) {
//       fetchStatus();
//     } else {
//       setStatus(fallbackData);
//       setLoading(false);
//       setError(true);
//     }
//   }, []);

//   const getStatusIcon = () => {
//     switch (status?.status?.toLowerCase()) {
//       case 'success':
//         return <FaCheckCircle className="text-green-500 text-2xl" />;
//       case 'failed':
//         return <FaTimesCircle className="text-red-500 text-2xl" />;
//       default:
//         return <FaInfoCircle className="text-yellow-500 text-2xl" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <p className="text-lg font-medium text-gray-600">{t('loadingPaymentStatus')}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 rounded-xl shadow-sm font-sans">
//       <div className="flex justify-end mb-2">
//         <LanguageSelector />
//       </div>

//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold text-green-700">{t('chargingSummary')}</h1>
//       </div>

//       {error && (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
//           <FaInfoCircle />
//           {t('realTimeDataUnavailable')}
//         </div>
//       )}

//       <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <span className="font-medium text-gray-600">{t('paymentId')}:</span>
//             <span className="font-semibold text-gray-800">{status.razorpayPaymentId}</span>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <span className="font-medium text-gray-600">{t('status')}:</span>
//             <div className="flex items-center gap-2">
//               {getStatusIcon()}
//               <span className={`font-semibold ${
//                 status.status === 'success' ? 'text-green-600' : 
//                 status.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
//               }`}>
//                 {t(status.status.toLowerCase())}
//               </span>
//             </div>
//           </div>
          
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">{t('usedAmount')}:</span>
//             <span className="font-semibold">₹{(status.amount / 100).toFixed(2)}</span>
//           </div>
          
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">{t('refundAmount')}:</span>
//             <span className="font-semibold">₹{status.refundAmount || 0}</span>
//           </div>
          
//           {status.refundStatus && status.refundStatus !== '-' && (
//             <div className="flex justify-between">
//               <span className="font-medium text-gray-600">{t('refundStatus')}:</span>
//               <span className="font-semibold text-blue-600">{t(status.refundStatus.toLowerCase())}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-between gap-4">
//         {/* <button
//           onClick={() => navigate(-1)}
//           className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
//         >
//           <FaArrowLeft /> {t('back')}
//         </button> */}
//         <button
//           onClick={() => navigate("/evdashboard")}
//           className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
//         >
//           {t('backToDashboard')}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EvPaymentStatus;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import useTranslation from '../components/useTranslation';
import LanguageSelector from '../components/Language';

const fallbackData = {
  razorpayPaymentId: "pay_" + Math.random().toString(36).substr(2, 9),
  status: "success",
  amount: 0,
  refundAmount: 0,
  refundStatus: "-"
};

const EvPaymentStatus = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  const orderDetails = JSON.parse(sessionStorage.getItem('razorpayOrder')) || {};

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const paymentSuccess = JSON.parse(sessionStorage.getItem('paymentSuccess'));
      
      if (paymentSuccess) {
        setStatus({
          razorpayPaymentId: paymentSuccess.paymentId,
          status: "success",
          amount: orderDetails.amount * 100 || 3500, // Default amount if not available
          refundAmount: 0,
          refundStatus: "-"
        });
      } else {
        setStatus({ 
          ...fallbackData, 
          amount: orderDetails.amount * 100 || 3500 
        });
        setError(true);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = () => {
    switch (status?.status?.toLowerCase()) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'failed':
        return <FaTimesCircle className="text-red-500 text-2xl" />;
      default:
        return <FaInfoCircle className="text-yellow-500 text-2xl" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">{t('loadingPaymentStatus')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 rounded-xl shadow-sm font-sans">
      <div className="flex justify-end mb-2">
        <LanguageSelector />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-green-700">{t('chargingSummary')}</h1>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
          <FaInfoCircle />
          {t('realTimeDataUnavailable')}
        </div>
      )}

      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">{t('paymentId')}:</span>
            <span className="font-semibold text-gray-800">{status.razorpayPaymentId}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">{t('status')}:</span>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className={`font-semibold ${
                status.status === 'success' ? 'text-green-600' : 
                status.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {t(status.status.toLowerCase())}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">{t('usedAmount')}:</span>
            <span className="font-semibold">₹{(status.amount / 100).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">{t('refundAmount')}:</span>
            <span className="font-semibold">₹{status.refundAmount || 0}</span>
          </div>
          
          {status.refundStatus && status.refundStatus !== '-' && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">{t('refundStatus')}:</span>
              <span className="font-semibold text-blue-600">{t(status.refundStatus.toLowerCase())}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => navigate("/evdashboard")}
          className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
        >
          {t('backToDashboard')}
        </button>
      </div>
    </div>
  );
};

export default EvPaymentStatus;