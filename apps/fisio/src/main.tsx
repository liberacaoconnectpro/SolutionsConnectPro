import React from 'react';
import { createRoot } from 'react-dom/client';
import FisioApp from './FisioApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FisioApp onBack={() => {}} />
  </React.StrictMode>
);
