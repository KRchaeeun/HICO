import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// material-ui 테마 컬러 변경
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals 함수에 전달하는 콜백 함수의 매개변수 타입을 Metric으로 변경
reportWebVitals((metric) => {
  console.log(metric.name, metric.value);
});