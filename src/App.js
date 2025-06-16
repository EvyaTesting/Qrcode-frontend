import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/Context';
import Dashboard from './evusers/EvDashboard';
import Connecting from './evusers/EvConnecting';
import Payment from './evusers/EvPayment';
import PaymentStatus from './evusers/EvPaymentStatus';
import ChargingStatus from './evusers/ChargingStatus';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/evdashboard" element={<Dashboard />} />
          <Route path="/evconnecting" element={<Connecting />} />
          <Route path="/evpayment" element={<Payment />} />
          <Route path="/chargingstatus" element={<ChargingStatus />} />
          <Route path="/evpaymentstatus" element={<PaymentStatus />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;