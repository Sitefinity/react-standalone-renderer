import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';
import './index.css';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

createRoot(document.body)
.render(
    // <React.StrictMode>
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="*" element={<App />} />
            </Routes>
        </Router>
    </Provider>
);