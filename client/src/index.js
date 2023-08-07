import React from 'react';
import ReactDOM from 'react-dom/client';
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';
//import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'


//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer  from './component/reducer/index';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

const store = createStore(rootReducer,composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <HelmetProvider>
        <App />
    </HelmetProvider>
    </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);


