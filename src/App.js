import 'react-native-gesture-handler';

import {Provider, useSelector} from 'react-redux';

import FlashMessage from 'react-native-flash-message';
import {Loading} from './component';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './router';
import store from './redux/store';

const MainApp = () => {
  const {isLoading} = useSelector(state => state.globalReducer);
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
