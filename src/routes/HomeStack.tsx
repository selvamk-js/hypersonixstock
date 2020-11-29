import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Stock from 'containers/Stock';
import GradientBackground from './NavHeaderGradient';
import Routes from 'constants/Routes';

const Home = createStackNavigator();

const HomeStack = () => (
  <Home.Navigator
    screenOptions={{
      headerTintColor: '#FFFFFF',
    }}
    headerMode="screen"
  >
    <Home.Screen
      name={Routes.StockHome.stock}
      component={Stock}
      options={{
        title: 'Stocks',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerBackground: () => <GradientBackground />,
      }}
    />
  </Home.Navigator>
);

export default HomeStack;
