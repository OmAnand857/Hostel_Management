import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {AuthProviderFunction} from "./components/Context"
import { createClient } from '@supabase/supabase-js'
import config from "./configenv.json"
export const supabase = createClient(config.SP_U, config.SP_K)


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <AuthProviderFunction>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthProviderFunction>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
