import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EvDashboard from './evusers/EvDashboard';
import EvPayment from './evusers/EvPayment';
import EvPaymentStatus from './evusers/EvPaymentStatus';
import EvConnecting from './evusers/EvConnecting';
import ChargingStatus from './evusers/ChargingStatus';

function App() {
  return (

      <div className="App">
        {/* Set up routing */}
        <Routes>
          <Route path="/evdashboard" element={<EvDashboard />} />
          <Route path="/evpayment" element={<EvPayment />} />
          <Route path="/evpaymentstatus" element={<EvPaymentStatus />} />
          <Route path="/evconnecting" element={<EvConnecting />} />
          <Route path="/chargingstatus" element={<ChargingStatus />} />
          <Route path="/" element={<EvDashboard />} />
        </Routes>
      </div>
    
  );
}

export default App;
