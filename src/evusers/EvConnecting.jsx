import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaTimes } from 'react-icons/fa';
import useTranslation from '../components/useTranslation';
import LanguageSelector from '../components/Language';
import { useLanguage } from '../components/Context';

const EvConnecting = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    { key: 'waiting', completed: false, active: false },
    { key: 'accepted', completed: false, active: false },
    { key: 'starting', completed: false, active: false }
  ]);
  const [showHelp, setShowHelp] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setSteps(prev => prev.map((s, i) => i === 0 ? { ...s, active: true } : s)), 500),
      setTimeout(() => setSteps(prev => prev.map((s, i) =>
        i === 0 ? { ...s, completed: true, active: false } :
        i === 1 ? { ...s, active: true } : s)), 2000),
      setTimeout(() => setSteps(prev => prev.map((s, i) =>
        i === 1 ? { ...s, completed: true, active: false } :
        i === 2 ? { ...s, active: true } : s)), 3500),
      setTimeout(() => setSteps(prev => prev.map((s, i) =>
        i === 2 ? { ...s, completed: true, active: false } : s)), 5000),
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 2));
    }, 50);

    const redirect = setTimeout(() => navigate('/evpayment'), 7000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(redirect);
    };
  }, [navigate]);

  const EnglishConnecting = () => (
    <div className="max-w-md mx-auto min-h-screen bg-white p-6 rounded-xl shadow-md font-sans flex flex-col justify-between">
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>

      <div className="flex flex-col items-center">
        <img src="/vehicle.jpg" alt="EV" className="w-2/3 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          {t('connectMessage')}
        </h1>

        <div className="space-y-6 w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              {step.completed ? (
                <div className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center">✓</div>
              ) : step.active ? (
                <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={`text-sm ${step.completed ? 'text-green-600' : step.active ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {t(step.key)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button
          className="w-full py-3 bg-blue-100 text-blue-800 font-medium rounded-lg flex items-center justify-center gap-2"
          onClick={() => setShowHelp(!showHelp)}
        >
          <FaQuestionCircle /> {t('needHelp')}
        </button>
        <button
          className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
          onClick={() => navigate('/evdashboard')}
        >
          {t('cancelCharging')}
        </button>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('help')}</h3>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              {t('helpText')}
            </p>
            <button
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowHelp(false)}
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const ArabicConnecting = () => (
    <div className="max-w-md mx-auto min-h-screen bg-white p-6 rounded-xl shadow-md font-sans flex flex-col justify-between" dir="rtl">
      <div className="flex justify-start mb-4">
        <LanguageSelector />
      </div>

      <div className="flex flex-col items-center">
        <img src="/vehicle.jpg" alt="EV" className="w-2/3 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          {t('connectMessage')}
        </h1>

        <div className="space-y-6 w-full">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className={`text-sm ${step.completed ? 'text-green-600' : step.active ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {t(step.key)}
              </span>
              {step.completed ? (
                <div className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center">✓</div>
              ) : step.active ? (
                <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button
          className="w-full py-3 bg-blue-100 text-blue-800 font-medium rounded-lg flex items-center justify-center gap-2"
          onClick={() => setShowHelp(!showHelp)}
        >
          {t('needHelp')} <FaQuestionCircle />
        </button>
        <button
          className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
          onClick={() => navigate('/evdashboard')}
        >
          {t('cancelCharging')}
        </button>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" dir="rtl">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
              <h3 className="text-lg font-semibold">{t('help')}</h3>
            </div>
            <p className="text-gray-700 mb-4 text-right">
              {t('helpText')}
            </p>
            <button
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowHelp(false)}
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return language === "arab" ? <ArabicConnecting /> : <EnglishConnecting />;
};

export default EvConnecting;
