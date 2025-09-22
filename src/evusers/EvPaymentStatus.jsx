// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
// import useTranslation from '../components/useTranslation';
// import LanguageSelector from '../components/Language';
// import { useLanguage } from '../components/Context';

// const fallbackData = {
//   razorpayPaymentId: "-",
//   status: "pending",
//   amount: 0,
//   refundAmount: 0,
//   refundStatus: "-"
// };

// const EnglishPaymentStatus = ({ status, error, t, navigate }) => (
//   <>
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-lg font-semibold">{t('chargingSummary')}</h2>
//       <LanguageSelector />
//     </div>

//     {error && (
//       <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
//         <FaInfoCircle />
//         {t('realTimeDataUnavailable')}
//       </div>
//     )}

//     <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm">
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <span className="font-medium text-gray-600">{t('paymentId')}:</span>
//           <span className="font-semibold text-gray-800">{status.razorpayPaymentId}</span>
//         </div>
        
//         <div className="flex justify-between items-center">
//           <span className="font-medium text-gray-600">{t('status')}:</span>
//           <div className="flex items-center gap-2">
//             {status.status === 'success' ? <FaCheckCircle className="text-green-500 text-xl" /> : 
//              status.status === 'failed' ? <FaTimesCircle className="text-red-500 text-xl" /> : 
//              <FaInfoCircle className="text-yellow-500 text-xl" />}
//             <span className={`font-semibold ${
//               status.status === 'success' ? 'text-green-600' : 
//               status.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
//             }`}>
//               {t(status.status)}
//             </span>
//           </div>
//         </div>
        
//         <div className="flex justify-between">
//           <span className="font-medium text-gray-600">{t('usedAmount')}:</span>
//           <span className="font-semibold">₹{(status.amount / 100).toFixed(2)}</span>
//         </div>
        
//         <div className="flex justify-between">
//           <span className="font-medium text-gray-600">{t('refundAmount')}:</span>
//           <span className="font-semibold">₹{status.refundAmount || 0}</span>
//         </div>
        
//         {status.refundStatus && status.refundStatus !== '-' && (
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">{t('refundStatus')}:</span>
//             <span className="font-semibold text-blue-600">{t(status.refundStatus)}</span>
//           </div>
//         )}
//       </div>
//     </div>

//     <button
//       onClick={() => navigate("/evdashboard")}
//       className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
//     >
//       {t('backToDashboard')}
//     </button>
//   </>
// );

// const ArabicPaymentStatus = ({ status, error, t, navigate }) => (
//   <>
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-lg font-semibold">{t('chargingSummary')}</h2>
//       <LanguageSelector />
//     </div>

//     {error && (
//       <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm flex items-center gap-2 flex-row-reverse">
//         <FaInfoCircle />
//         {t('realTimeDataUnavailable')}
//       </div>
//     )}

//     <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm text-right">
//       <div className="space-y-4">
//         <div className="flex justify-between items-center flex-row-reverse">
//           <span className="font-medium text-gray-600">{t('paymentId')}:</span>
//           <span className="font-semibold text-gray-800">{status.razorpayPaymentId}</span>
//         </div>
        
//         <div className="flex justify-between items-center flex-row-reverse">
//           <span className="font-medium text-gray-600">{t('status')}:</span>
//           <div className="flex items-center gap-2">
//             <span className={`font-semibold ${
//               status.status === 'success' ? 'text-green-600' : 
//               status.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
//             }`}>
//               {t(status.status)}
//             </span>
//             {status.status === 'success' ? <FaCheckCircle className="text-green-500 text-xl" /> : 
//              status.status === 'failed' ? <FaTimesCircle className="text-red-500 text-xl" /> : 
//              <FaInfoCircle className="text-yellow-500 text-xl" />}
//           </div>
//         </div>
        
//         <div className="flex justify-between flex-row-reverse">
//           <span className="font-medium text-gray-600">{t('usedAmount')}:</span>
//           <span className="font-semibold">₹{(status.amount / 100).toFixed(2)}</span>
//         </div>
        
//         <div className="flex justify-between flex-row-reverse">
//           <span className="font-medium text-gray-600">{t('refundAmount')}:</span>
//           <span className="font-semibold">₹{status.refundAmount || 0}</span>
//         </div>
        
//         {status.refundStatus && status.refundStatus !== '-' && (
//           <div className="flex justify-between flex-row-reverse">
//             <span className="font-medium text-gray-600">{t('refundStatus')}:</span>
//             <span className="font-semibold text-blue-600">{t(status.refundStatus)}</span>
//           </div>
//         )}
//       </div>
//     </div>

//     <button
//       onClick={() => navigate("/evdashboard")}
//       className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
//     >
//       {t('backToDashboard')}
//     </button>
//   </>
// );

// const EvPaymentStatus = () => {
//   const { t } = useTranslation();
//   const { language } = useLanguage();
//   const [status, setStatus] = useState(fallbackData);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
  
//   const orderDetails = JSON.parse(sessionStorage.getItem('razorpayOrder')) || {};

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const res = await axios.get(`https://qr-ajvz.onrender.com/get-payment?orderId=${orderDetails.orderId}`);
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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-white">
//         <p className="text-lg font-medium text-gray-600">{t('loadingPaymentStatus')}</p>
//       </div>
//     );
//   }

//   const commonProps = {
//     status,
//     error,
//     t,
//     navigate
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
//       {language === "arab" ? (
//         <ArabicPaymentStatus {...commonProps} />
//       ) : (
//         <EnglishPaymentStatus {...commonProps} />
//       )}
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
