import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import Navigation from './navigation';
import './App.css';

export const App = () => {
   return (
      <Provider store={store}>
         <Router>
            <Navigation />
         </Router>
      </Provider>
   );
};
