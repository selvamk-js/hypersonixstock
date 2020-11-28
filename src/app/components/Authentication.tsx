import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import NavigationService from 'services/NavigationService';
import Login from 'containers/Login';
import AuthContext from './AuthContext';

import Loader from '../../components/Loader';
import Stock from 'containers/Stock';

function SplashScreen() {
  return (
    <View style={styles.addFlex}>
      <Loader showLoader />
      <StatusBar hidden />
    </View>
  );
}

const Stack = createStackNavigator();

const Authentication = () => {
  // const { dispatchRestoreToken, dispatchSetToken, dispatchResetToken } = props;

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
          };
        default:
          return null;
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('@appusertoken');
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // dispatchRestoreToken(token);
      dispatch({ type: 'RESTORE_TOKEN', token });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // dispatchSetToken(data);
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => {
        // dispatchResetToken();
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  const AuthFlow = () => {
    if (state.isLoading) {
      return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Loading" component={SplashScreen} />
        </Stack.Navigator>
      );
    }
    if (state.userToken === null) {
      return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator>
        <Stack.Screen name="Stocks" component={Stock} />
      </Stack.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >
        {AuthFlow()}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  addFlex: {
    flex: 1,
  },
});

export default Authentication;
