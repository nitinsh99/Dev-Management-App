import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import { Provider } from 'react-redux';
import { storage, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import * as serviceWorker from './serviceWorker';

import App from './App';

ReactDOM.render(
  <Provider store={storage}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
