// import React, { useState } from 'react';
// import { MapPin, Phone, Mail, Toilet, Sofa, Wifi, ShoppingBag, Coffee, Wrench } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import useTranslation from '../components/useTranslation';
// import LanguageSelector from '../components/Language';

// const connectors = [
//   { id: 1, status: 'available', slot: 'Slot A', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
//   { id: 2, status: 'inUse', slot: 'Slot B', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
//   { id: 3, status: 'inactive', slot: 'Slot C', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
//   { id: 4, status: 'available', slot: 'Slot D', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
// ];

// const amenities = [
//   { name: 'restrooms', icon: <Toilet size={20} /> },
//   { name: 'lounge', icon: <Sofa size={20} /> },
//   { name: 'wifi', icon: <Wifi size={20} /> },
//   { name: 'shopping', icon: <ShoppingBag size={20} /> },
//   { name: 'cafe', icon: <Coffee size={20} /> },
//   { name: 'mechanic', icon: <Wrench size={20} /> }
// ];

// export default function EvDashboard() {
//   const [selectedTab, setSelectedTab] = useState('Connectors');
//   const [selectedConnector, setSelectedConnector] = useState(null);
//   const [showConnectorDetails, setShowConnectorDetails] = useState(false);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const proceedToPayment = () => {
//     setShowConnectorDetails(false);
//     navigate("/evconnecting");
//   };

//   const getStatusText = (status) => {
//     switch(status) {
//       case 'available': return t('available');
//       case 'inUse': return t('inUse');
//       case 'inactive': return t('inactive');
//       default: return status;
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">{t('stationDetails')}</h2>
//         <LanguageSelector />
//       </div>

//       <img
//         src="/evstation.jpg"
//         alt="EV Station"
//         className="rounded-xl mb-4 w-full h-40 object-cover"
//       />

//       <div>
//         <h3 className="text-md font-bold">{t('stationName')}</h3>
//         <p className="text-sm text-gray-600">{t('address')}</p>
//       </div>

//       <div className="flex space-x-4 mt-4 border-b">
//         <button
//           className={`pb-2 ${selectedTab === 'Connectors' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
//           onClick={() => setSelectedTab('Connectors')}
//         >
//           {t('selectConnector')}
//         </button>
//         <button
//           className={`pb-2 ${selectedTab === 'Information' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
//           onClick={() => setSelectedTab('Information')}
//         >
//           {t('information')}
//         </button>
//       </div>

//       {selectedTab === 'Connectors' ? (
//         <div className="mt-4">
//           <h4 className="font-semibold mb-2">{t('selectConnector')}</h4>
//           <div className="grid grid-cols-2 gap-2">
//             {connectors.map((conn) => (
//               <div
//                 key={conn.id}
//                 className={`rounded-lg p-3 ${conn.status === 'available' ? 'bg-green-100 border-l-4 border-green-400' : conn.status === 'inUse' ? 'bg-yellow-100 border-l-4 border-yellow-400' : 'bg-gray-200 border-l-4 border-gray-400'} ${selectedConnector === conn.id ? 'ring-2 ring-green-500' : ''}`}
//                 onClick={() => {
//                   if (conn.status === 'available') {
//                     setSelectedConnector(conn.id);
//                     setShowConnectorDetails(true);
//                   }
//                 }}>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">{conn.slot}</span>
//                   <span className={`text-xs ${conn.status === 'available' ? 'text-green-600' : conn.status === 'inUse' ? 'text-yellow-600' : 'text-gray-500'}`}>
//                     {getStatusText(conn.status)}
//                   </span>
//                 </div>
//                 <div className="text-xs text-gray-700 mt-1">{conn.type}</div>
//                 <div className="text-xs">{conn.price}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="mt-4">
//           <h4 className="font-semibold mb-2">{t('amenities')}</h4>
//           <div className="grid grid-cols-3 gap-4 mb-4">
//             {amenities.map((amenity, index) => (
//               <div key={index} className="flex flex-col items-center text-sm text-gray-600">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full mb-1 flex items-center justify-center">
//                   {amenity.icon}
//                 </div>
//                 {t(amenity.name)}
//               </div>
//             ))}
//           </div>

//           <h4 className="font-semibold mb-1">{t('contactDetails')}</h4>
//           <div className="text-sm text-gray-600">
//             <div className="flex items-start mb-2">
//               <MapPin className="w-4 h-4 mt-1 mr-2" />
//               {t('address')}
//             </div>
//             <img
//               src="/map.png"
//               alt="Map"
//               className="rounded-xl mb-2 w-full h-32 object-cover"
//             />
//             <div className="flex items-center mb-1 text-green-600">
//               <Phone className="w-4 h-4 mr-2" /> {t('phone')}
//             </div>
//             <div className="flex items-center text-green-600">
//               <Mail className="w-4 h-4 mr-2" /> {t('email')}
//             </div>
//           </div>
//         </div>
//       )}

//       {showConnectorDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h3 className="text-lg font-bold mb-4">{t('connectorDetails')}</h3>
//             <div className="space-y-3">
//               {connectors.filter(c => c.id === selectedConnector).map(conn => (
//                 <React.Fragment key={conn.id}>
//                   <div className="flex justify-between">
//                     <span className="font-medium">{t('slot')}:</span>
//                     <span>{conn.slot}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">{t('type')}:</span>
//                     <span>{conn.type}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">{t('price')}:</span>
//                     <span>{conn.price}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">{t('level')}:</span>
//                     <span>{conn.level}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">{t('power')}:</span>
//                     <span>{conn.power}</span>
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button 
//                 className="px-4 py-2 border rounded"
//                 onClick={() => setShowConnectorDetails(false)}
//               >
//                 {t('cancel')}
//               </button>
//               <button 
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//                 onClick={proceedToPayment}
//               >
//                 {t('connect')}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState } from 'react';
import { MapPin, Phone, Mail, Toilet, Sofa, Wifi, ShoppingBag, Coffee, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '../components/useTranslation';
import LanguageSelector from '../components/Language';

const connectors = [
  { id: 1, status: 'available', slot: 'Slot A', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
  { id: 2, status: 'inUse', slot: 'Slot B', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
  { id: 3, status: 'inactive', slot: 'Slot C', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
  { id: 4, status: 'available', slot: 'Slot D', type: 'CCS2', price: '₹20/kW', level: 'Level 1 (AC)', power: '60 kW' },
];

const amenities = [
  { name: 'restrooms', icon: <Toilet size={20} /> },
  { name: 'lounge', icon: <Sofa size={20} /> },
  { name: 'wifi', icon: <Wifi size={20} /> },
  { name: 'shopping', icon: <ShoppingBag size={20} /> },
  { name: 'cafe', icon: <Coffee size={20} /> },
  { name: 'mechanic', icon: <Wrench size={20} /> }
];

export default function EvDashboard() {
  const [selectedTab, setSelectedTab] = useState('Connectors');
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [showConnectorDetails, setShowConnectorDetails] = useState(false);
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();

  const isRTL = currentLanguage === 'ar';

  const proceedToPayment = () => {
    setShowConnectorDetails(false);
    navigate("/evconnecting");
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'available': return t('available');
      case 'inUse': return t('inUse');
      case 'inactive': return t('inactive');
      default: return status;
    }
  };

  // RTL utility classes
  const rtlClass = isRTL ? 'rtl' : '';
  const textAlignClass = isRTL ? 'text-right' : 'text-left';
  const flexDirectionClass = isRTL ? 'flex-row-reverse' : 'flex-row';
  const marginDirection = (base) => isRTL ? `ml-${base}` : `mr-${base}`;
  const borderDirectionClass = isRTL ? 'border-r-4' : 'border-l-4';

  return (
    <div 
      className={`max-w-md mx-auto bg-white min-h-screen p-4 font-sans ${textAlignClass} ${rtlClass}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className={`flex ${flexDirectionClass} justify-between items-center mb-4`}>
        <h2 className="text-lg font-semibold">{t('stationDetails')}</h2>
        <LanguageSelector />
      </div>

      <img
        src="/evstation.jpg"
        alt="EV Station"
        className="rounded-xl mb-4 w-full h-40 object-cover"
      />

      <div>
        <h3 className="text-md font-bold">{t('stationName')}</h3>
        <p className="text-sm text-gray-600">{t('address')}</p>
      </div>

      {/* Tabs */}
      <div className={`flex ${flexDirectionClass} space-x-4 mt-4 border-b`}>
        <button
          className={`pb-2 ${selectedTab === 'Connectors' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('Connectors')}
        >
          {t('selectConnector')}
        </button>
        <button
          className={`pb-2 ${selectedTab === 'Information' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('Information')}
        >
          {t('information')}
        </button>
      </div>

      {selectedTab === 'Connectors' ? (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">{t('selectConnector')}</h4>
          <div className="grid grid-cols-2 gap-2">
            {connectors.map((conn) => (
              <div
                key={conn.id}
                className={`rounded-lg p-3 ${conn.status === 'available' ? `bg-green-100 ${borderDirectionClass} border-green-400` : conn.status === 'inUse' ? `bg-yellow-100 ${borderDirectionClass} border-yellow-400` : `bg-gray-200 ${borderDirectionClass} border-gray-400`} ${selectedConnector === conn.id ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => {
                  if (conn.status === 'available') {
                    setSelectedConnector(conn.id);
                    setShowConnectorDetails(true);
                  }
                }}>
                <div className={`flex ${flexDirectionClass} justify-between items-center`}>
                  <span className="font-medium">{conn.slot}</span>
                  <span className={`text-xs ${conn.status === 'available' ? 'text-green-600' : conn.status === 'inUse' ? 'text-yellow-600' : 'text-gray-500'}`}>
                    {getStatusText(conn.status)}
                  </span>
                </div>
                <div className="text-xs text-gray-700 mt-1">{conn.type}</div>
                <div className="text-xs">{conn.price}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">{t('amenities')}</h4>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center text-sm text-gray-600">
                <div className="w-10 h-10 bg-gray-200 rounded-full mb-1 flex items-center justify-center">
                  {amenity.icon}
                </div>
                {t(amenity.name)}
              </div>
            ))}
          </div>

          <h4 className="font-semibold mb-1">{t('contactDetails')}</h4>
          <div className="text-sm text-gray-600">
            <div className={`flex ${flexDirectionClass} items-start mb-2`}>
              <MapPin className={`w-4 h-4 mt-1 ${marginDirection(2)}`} />
              {t('address')}
            </div>
            <img
              src="/map.png"
              alt="Map"
              className="rounded-xl mb-2 w-full h-32 object-cover"
            />
            <div className={`flex ${flexDirectionClass} items-center mb-1 text-green-600`}>
              <Phone className={`w-4 h-4 ${marginDirection(2)}`} /> {t('phone')}
            </div>
            <div className={`flex ${flexDirectionClass} items-center text-green-600`}>
              <Mail className={`w-4 h-4 ${marginDirection(2)}`} /> {t('email')}
            </div>
          </div>
        </div>
      )}

      {/* Connector Details Modal */}
      {showConnectorDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white rounded-lg p-6 w-full max-w-md ${textAlignClass}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <h3 className="text-lg font-bold mb-4">{t('connectorDetails')}</h3>
            <div className="space-y-3">
              {connectors.filter(c => c.id === selectedConnector).map(conn => (
                <React.Fragment key={conn.id}>
                  <div className={`flex ${flexDirectionClass} justify-between`}>
                    <span className="font-medium">{t('slot')}:</span>
                    <span>{conn.slot}</span>
                  </div>
                  <div className={`flex ${flexDirectionClass} justify-between`}>
                    <span className="font-medium">{t('type')}:</span>
                    <span>{conn.type}</span>
                  </div>
                  <div className={`flex ${flexDirectionClass} justify-between`}>
                    <span className="font-medium">{t('price')}:</span>
                    <span>{conn.price}</span>
                  </div>
                  <div className={`flex ${flexDirectionClass} justify-between`}>
                    <span className="font-medium">{t('level')}:</span>
                    <span>{conn.level}</span>
                  </div>
                  <div className={`flex ${flexDirectionClass} justify-between`}>
                    <span className="font-medium">{t('power')}:</span>
                    <span>{conn.power}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className={`mt-6 flex ${flexDirectionClass} justify-end space-x-3`}>
              <button 
                className="px-4 py-2 border rounded"
                onClick={() => setShowConnectorDetails(false)}
              >
                {t('cancel')}
              </button>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={proceedToPayment}
              >
                {t('connect')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
