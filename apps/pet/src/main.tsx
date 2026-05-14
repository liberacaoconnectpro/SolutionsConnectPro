import React from 'react';
import { createRoot } from 'react-dom/client';
import PetApp from './PetApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PetApp onBack={() => {}} />
  </React.StrictMode>
);
