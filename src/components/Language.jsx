import React from 'react';
import { useLanguage } from './Context';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select 
      className="border rounded p-1 text-sm"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="hi">हिंदी (Hindi)</option>
      <option value="te">తెలుగు (Telugu)</option>
    </select>
  );
};

export default LanguageSelector;