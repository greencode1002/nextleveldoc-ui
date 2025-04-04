import React from 'react';

//import Scss
import './assets/scss/themes.scss';

// User css
import './assets/css/f143e1d526126113.css';

//imoprt Route
import Route from './Routes';
import 'react-toastify/dist/ReactToastify.css';

// Fake Backend 
import { ToastContainer } from 'react-toastify';

function App() {
  return (

    <React.Fragment>
      <Route />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
