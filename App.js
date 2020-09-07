import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/reduxprovider/store';
import {PersistGate} from 'redux-persist/integration/react';

import AppRoot from './src';

const RNRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoot />
      </PersistGate>
    </Provider>
  );
};

export default RNRedux;
