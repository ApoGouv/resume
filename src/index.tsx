import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ThemeProvider from '@/Context/ThemeContextProvider';
import ResumePage from '@/Pages/ResumePage/ResumePage';

import { APP_IN_DEV_MODE } from '@/constants';
import reportWebVitals from '@/Utils/reportWebVitals';

import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

import '@/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ThemeProvider>
        <HashRouter>
          <ResumePage />
        </HashRouter>
      </ThemeProvider>
  </React.StrictMode>
);

if (APP_IN_DEV_MODE) {
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals(console.log);
}
