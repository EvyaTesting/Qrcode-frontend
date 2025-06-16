import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign, FaBolt, FaPercentage } from 'react-icons/fa';
import useTranslation from '../components/useTranslation';
import LanguageSelector from '../components/Language';

export default function EvPayment() {
  const { t } = useTranslation();
  const [price, setPrice] = useState(35);
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState('price');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const lastPaymentAttempt = useRef(0);
  const navigate = useNavigate();

  const unitRate = 3;
  const fullChargePrice = 200;

  const calculatePrice = (value, type) => {
    if (type === 'price') return parseFloat(value);
    if (type === 'units') return value * unitRate;
    if (type === 'percentage') return (value / 100) * fullChargePrice;
    return 0;
  };

  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    setInputValue(e.target.value);
    setPrice(!isNaN(val) ? calculatePrice(val, selectedType) : 0);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setInputValue('');
    setPrice(0);
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case 'price': return t('enterAmount');
      case 'units': return t('enterUnits');
      case 'percentage': return t('enterPercentage');
      default: return '';
    }
  };

  const handlePayment = async () => {
    // Rate limiting - prevent multiple clicks within 5 seconds
    const now = Date.now();
    if (now - lastPaymentAttempt.current < 5000) {
      setErrorMessage(t('paymentInProgress'));
      return;
    }
    lastPaymentAttempt.current = now;

    if (isProcessing) return;
    
    setIsProcessing(true);
    setErrorMessage('');

    const name = t('customerName');
    const email = "customer@example.com";
    const mobile = "9999999999";

    try {
      const response = await fetch('https://qr-ajvz.onrender.com/add_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          mobile,
          amount: price * 100,
          currency: 'INR'
        }),
      });

      if (!response.ok) {
        throw new Error(t('paymentInitFailed'));
      }

      const order = await response.json();
      
      sessionStorage.setItem('razorpayOrder', JSON.stringify({
        orderId: order.razorpayOrderid,
        amount: price,
        createdAt: new Date().toISOString()
      }));

      const options = {
        key: 'rzp_test_z51wLt0JB2gGzV',
        amount: order.amount,
        currency: 'INR',
        name: t('companyName'),
        description: t('paymentDescription'),
        order_id: order.razorpayOrderid,
        handler: async function (response) {
          try {
            sessionStorage.setItem('paymentSuccess', JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              status: 'success'
            }));
            
            const callbackRes = await fetch("https://qr-ajvz.onrender.com/handle-payment-callback", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (callbackRes.ok) {
              navigate("/chargingstatus");
            } else {
              const error = await callbackRes.text();
              setErrorMessage(t('paymentFailed') + error);
            }
          } catch (err) {
            console.error("Payment callback error:", err);
            setErrorMessage(t('paymentError'));
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name,
          email,
          contact: mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        sessionStorage.setItem('paymentFailed', JSON.stringify({
          error: response.error,
          orderId: response.error.metadata.order_id,
          status: 'failed'
        }));
        setErrorMessage(t('paymentFailed') + response.error.description);
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      setErrorMessage(error.message || t('paymentInitError'));
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 rounded-xl shadow-md font-sans">
      <div className="flex justify-end mb-2">
        <LanguageSelector />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">💸 {t('evChargingCheckIn')}</h2>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { key: 'price', label: t('byPrice'), icon: <FaRupeeSign /> },
          { key: 'units', label: t('byUnits'), icon: <FaBolt /> },
          { key: 'percentage', label: t('byPercentage'), icon: <FaPercentage /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => handleTypeChange(key)}
            className={`flex flex-col items-center py-3 px-2 border rounded-lg transition ${
              selectedType === key
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
            }`}
          >
            <div className="text-lg">{icon}</div>
            <span className="text-sm font-medium mt-1">{label}</span>
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full border border-gray-300 pl-4 pr-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          placeholder={getPlaceholder()}
        />
        <p className="text-center text-2xl font-bold mt-3 text-green-700">₹{price.toFixed(2)}</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md mb-6 text-sm shadow-sm">
        <p>{t('connectGunProperly')}</p>
        <p>{t('minimumAmount')}</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm mb-6">
        <div className="flex justify-between text-gray-700 font-medium text-sm">
          <span>{t('totalChargingCost')}</span>
          <span className="text-lg font-bold text-black">₹{price.toFixed(2)}</span>
        </div>
        <div className="text-xs text-green-600 underline mt-2 text-right cursor-pointer">
          {t('viewCostBreakup')}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div></div>
        <button
          onClick={handlePayment}
          disabled={price < 50 || isProcessing}
          className={`bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition duration-200 ${
            isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'
          } ${price < 50 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('processing')}
            </span>
          ) : (
            t('payCharge')
          )}
        </button>
      </div>
    </div>
  );
}


// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaRupeeSign, FaBolt, FaPercentage } from 'react-icons/fa';
// import useTranslation from '../components/useTranslation';
// import LanguageSelector from '../components/Language';

// export default function EvPayment() {
//   const { t } = useTranslation();
//   const [price, setPrice] = useState(35);
//   const [inputValue, setInputValue] = useState('');
//   const [selectedType, setSelectedType] = useState('price');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const lastPaymentAttempt = useRef(0);
//   const navigate = useNavigate();

//   const unitRate = 3;
//   const fullChargePrice = 200;

//   const calculatePrice = (value, type) => {
//     if (type === 'price') return parseFloat(value);
//     if (type === 'units') return value * unitRate;
//     if (type === 'percentage') return (value / 100) * fullChargePrice;
//     return 0;
//   };

//   const handleInputChange = (e) => {
//     const val = parseFloat(e.target.value);
//     setInputValue(e.target.value);
//     setPrice(!isNaN(val) ? calculatePrice(val, selectedType) : 0);
//   };

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     setInputValue('');
//     setPrice(0);
//   };

//   const getPlaceholder = () => {
//     switch (selectedType) {
//       case 'price': return t('enterAmount');
//       case 'units': return t('enterUnits');
//       case 'percentage': return t('enterPercentage');
//       default: return '';
//     }
//   };

//   const handlePayment = async () => {
//     // Rate limiting - prevent multiple clicks within 5 seconds
//     const now = Date.now();
//     if (now - lastPaymentAttempt.current < 5000) {
//       setErrorMessage(t('paymentInProgress'));
//       return;
//     }
//     lastPaymentAttempt.current = now;

//     if (isProcessing) return;
    
//     setIsProcessing(true);
//     setErrorMessage('');

//     try {
//       // Static order data
//       const staticOrder = {
//         razorpayOrderid: `order_${Math.random().toString(36).substr(2, 9)}`,
//         amount: price * 100
//       };

//       sessionStorage.setItem('razorpayOrder', JSON.stringify({
//         orderId: staticOrder.razorpayOrderid,
//         amount: price,
//         createdAt: new Date().toISOString()
//       }));

//       // Immediately trigger success without showing Razorpay modal
//       const successResponse = {
//         razorpay_payment_id: `pay_${Math.random().toString(36).substr(2, 9)}`,
//         razorpay_order_id: staticOrder.razorpayOrderid,
//         razorpay_signature: `sig_${Math.random().toString(36).substr(2, 9)}`
//       };

//       sessionStorage.setItem('paymentSuccess', JSON.stringify({
//         paymentId: successResponse.razorpay_payment_id,
//         orderId: successResponse.razorpay_order_id,
//         signature: successResponse.razorpay_signature,
//         status: 'success'
//       }));
      
//       // Simulate successful payment callback
//       setTimeout(() => {
//         navigate("/chargingstatus");
//         setIsProcessing(false);
//       }, 1000);

//     } catch (error) {
//       console.error("Payment initialization error:", error);
//       setErrorMessage(error.message || t('paymentInitError'));
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 rounded-xl shadow-md font-sans">
//       <div className="flex justify-end mb-2">
//         <LanguageSelector />
//       </div>

//       <h2 className="text-2xl font-bold text-center mb-6 text-green-700">💸 {t('evChargingCheckIn')}</h2>

//       <div className="grid grid-cols-3 gap-3 mb-6">
//         {[
//           { key: 'price', label: t('byPrice'), icon: <FaRupeeSign /> },
//           { key: 'units', label: t('byUnits'), icon: <FaBolt /> },
//           { key: 'percentage', label: t('byPercentage'), icon: <FaPercentage /> },
//         ].map(({ key, label, icon }) => (
//           <button
//             key={key}
//             onClick={() => handleTypeChange(key)}
//             className={`flex flex-col items-center py-3 px-2 border rounded-lg transition ${
//               selectedType === key
//                 ? 'bg-green-600 text-white border-green-600'
//                 : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
//             }`}
//           >
//             <div className="text-lg">{icon}</div>
//             <span className="text-sm font-medium mt-1">{label}</span>
//           </button>
//         ))}
//       </div>

//       <div className="relative mb-4">
//         <input
//           type="number"
//           value={inputValue}
//           onChange={handleInputChange}
//           className="w-full border border-gray-300 pl-4 pr-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
//           placeholder={getPlaceholder()}
//         />
//         <p className="text-center text-2xl font-bold mt-3 text-green-700">₹{price.toFixed(2)}</p>
//       </div>

//       <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md mb-6 text-sm shadow-sm">
//         <p>{t('connectGunProperly')}</p>
//         <p>{t('minimumAmount')}</p>
//       </div>

//       <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm mb-6">
//         <div className="flex justify-between text-gray-700 font-medium text-sm">
//           <span>{t('totalChargingCost')}</span>
//           <span className="text-lg font-bold text-black">₹{price.toFixed(2)}</span>
//         </div>
//         <div className="text-xs text-green-600 underline mt-2 text-right cursor-pointer">
//           {t('viewCostBreakup')}
//         </div>
//       </div>

//       {errorMessage && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//           {errorMessage}
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         <div></div>
//         <button
//           onClick={handlePayment}
//           disabled={price < 50 || isProcessing}
//           className={`bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition duration-200 ${
//             isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'
//           } ${price < 50 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
//         >
//           {isProcessing ? (
//             <span className="flex items-center justify-center">
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               {t('processing')}
//             </span>
//           ) : (
//             t('payCharge')
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }
