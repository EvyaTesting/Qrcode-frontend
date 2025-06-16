import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaBolt, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import useTranslation from '../components/useTranslation';
import LanguageSelector from '../components/Language';


const ChargingStatus = () => {
  const { t } = useTranslation();
  const [isCharging, setIsCharging] = useState(true);
  const navigate = useNavigate();

  const handleStopCharging = () => {
    setIsCharging(false);
    setTimeout(() => {
      navigate('/evpaymentstatus');
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6 rounded-xl shadow-md font-sans">
      <div className="flex justify-end mb-2">
        <LanguageSelector />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-green-700">{t('chargingStatus')}</h1>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-4xl font-bold text-green-600">25</div>
            <div className="text-gray-600">{t('kilowatt')}</div>
          </div>
          <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            {t('fastCharging', { multiplier: 43 })}
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4"></div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
              <FaClock className="text-green-600" /> {t('chargingTime')}
            </h2>
            <div className="text-lg font-semibold">00:12:16</div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
              <FaMoneyBillWave className="text-green-600" /> {t('cost')}
            </h2>
            <div className="text-lg font-semibold">₹812.00</div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
              <FaBolt className="text-green-600" /> {t('units')}
            </h2>
            <div className="text-lg font-semibold">12 kW</div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">{t('speed')}</h2>
            <div className="text-lg font-semibold">5.5 kW/h</div>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4"></div>

        <div className="text-center">
          <h2 className="text-lg font-medium flex items-center justify-center gap-2">
            <FaCar className="text-green-600" /> Tata Curvy EV
          </h2>
          <div className="text-sm text-gray-600">TS08EV9876</div>
        </div>
      </div>

      <button 
        className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-200"
        onClick={handleStopCharging}
      >
        {isCharging ? t('stopCharging') : t('processing')}
      </button>

      {!isCharging && (
        <div className="mt-4 text-center text-gray-600">
          {t('preparingSummary')}
        </div>
      )}
    </div>
  );
};

export default ChargingStatus;