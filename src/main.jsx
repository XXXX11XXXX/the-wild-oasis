import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallbackComponent={ErrorFallback}
    onReset={()=>{
      window.location.replace("/");
    }}
    >
    <App />
    </ErrorBoundary>
  </React.StrictMode>
);

