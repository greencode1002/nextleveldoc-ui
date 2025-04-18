import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'lightbox.js-react/dist/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureStore({})}>
      <React.Fragment>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </React.Fragment>
  </Provider>
);

reportWebVitals();
