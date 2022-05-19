import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles.css';

const root = createRoot(document.getElementById('app'));
// eslint-disable-next-line react/jsx-filename-extension
root.render(<App />);
