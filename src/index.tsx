import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import root app
import App from 'app';

import { configureAppStore } from 'store/configureStore';
import { StatusBar } from 'react-native';
import { StyleProvider } from './styles';

const store = configureAppStore();

const ConnectedApp = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PaperProvider>
        <StyleProvider>
          <StatusBar
            translucent
            backgroundColor="blue"
            barStyle="dark-content"
          />
          <App />
        </StyleProvider>
      </PaperProvider>
    </Provider>
  </SafeAreaProvider>
);

export default ConnectedApp;
