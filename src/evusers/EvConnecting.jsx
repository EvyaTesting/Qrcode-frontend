
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '../components/useTranslation';
import LanguageSelector from '../components/Language';

const EvConnecting = () => {
  const { t } = useTranslation();
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

  return (
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
          className="w-full py-3 bg-blue-100 text-blue-800 font-medium rounded-lg"
          onClick={() => setShowHelp(!showHelp)}
        >
          {t('needHelp')}
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-gray-700 mb-4">
              {t('helpText')}
            </p>
            <button
              className="w-full py-2 bg-blue-600 text-white rounded-md"
              onClick={() => setShowHelp(false)}
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    position: 'relative',
  },
  progressBar: {
    height: '4px',
    backgroundColor: '#4CAF50',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'width 0.3s ease-in-out',
    zIndex: 10,
  },
  statusContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  chargingVisualization: {
    width: '100%',
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
  },
  vehicleImage: {
    width: '80%',
    height: 'auto',
    objectFit: 'contain',
  },
  title: {
    fontSize: '24px',
    color: '#2E3A59',
    fontWeight: 600,
    marginBottom: '25px',
    textAlign: 'center',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    padding: '0 10px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  circleContainer: {
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid #ccc',
  },
  loader: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid #ddd',
    borderTop: '2px solid #1E88E5',
    animation: 'spin 1s linear infinite',
  },
  checkmark: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: '16px',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  helpButton: {
    padding: '14px',
    backgroundColor: '#E3F2FD',
    color: '#0D47A1',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '14px',
    backgroundColor: '#EF5350',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  helpModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '350px',
    zIndex: 1000,
  },
  helpText: {
    fontSize: '15px',
    marginBottom: '15px',
    color: '#333',
  },
  closeHelpButton: {
    padding: '10px',
    backgroundColor: '#1976D2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

// Add this to your global CSS
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

export default EvConnecting;
