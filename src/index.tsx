import React from 'react';
import App, { getRootElement } from './App';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

createRoot(getRootElement())
.render(
    // <React.StrictMode>
    <Router>
        <Routes>
            <Route path="*" element={<App />} />
        </Routes>
    </Router>
);
