import logo from './logo.svg';
import './index.css';
import EvDashboard from './evusers/EvDashboard';
import EvPayment from './evusers/EvPayment';
import EvPaymentStatus from './evusers/EvPaymentStatus';
import EvConnecting from './evusers/EvConnecting';
import ChargingStatus from './evusers/ChargingStatus';

function App() {
  return (
    <div className="App">
      {/* <EvDashboard/> */}
     {/* <EvPayment/> */}
     {/* <EvPaymentStatus/> */}
{/* <EvConnecting/> */}
<ChargingStatus/>
    </div>
  );
}

export default App;
