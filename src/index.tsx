import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import LocaleProvider from './Context/ThemeContext';
import ResumePage from './Pages/ResumePage/ResumePage';
import './index.css';
import reportWebVitals from './Utils/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <LocaleProvider>
        <ResumePage />
      </LocaleProvider>
    </HelmetProvider>
  </React.StrictMode>
);

const resumeAppInDev = import.meta.env?.DEV ?? false;
if (resumeAppInDev) {
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals(console.log);
}
