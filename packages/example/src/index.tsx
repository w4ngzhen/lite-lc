import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/index.css';
import 'antd/dist/antd.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);
