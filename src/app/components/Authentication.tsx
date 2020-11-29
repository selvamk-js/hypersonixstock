import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import NavigationService from 'services/NavigationService';

import Login from 'containers/Login';
import AuthContext from './AuthContext';
import { actions } from '../slice';
import Loader from '../../components/Loader';
// import Stock from 'containers/Stock';
// import { useTheme } from 'react-native-paper';
import AppRouter from 'routes';

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
  const globalDispatch = useDispatch();
  // const theme = useTheme();
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
      globalDispatch(actions.restoreAccessToken(token || undefined));
      dispatch({ type: 'RESTORE_TOKEN', token });
    };

    bootstrapAsync();
  }, [globalDispatch]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: string) => {
        globalDispatch(actions.changeAccessToken(data));
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => {
        console.log('SIGN_OUT');
        globalDispatch(actions.resetAccessToken());
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    [globalDispatch]
  );

  const AuthFlow = () => {
    if (state.isLoading) {
      return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Loading" component={SplashScreen} />
        </Stack.Navigator>
      );
    }
    if (
      state.userToken === '' ||
      state.userToken === null ||
      !state.userToken
    ) {
      return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      );
    }
    // return (
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Stocks"
    //       component={Stock}
    //       options={{
    //         title: 'Hypersonix Stock',
    //         headerStyle: {
    //           backgroundColor: theme.colors.primary,
    //         },
    //         headerTintColor: '#fff',
    //         headerTitleStyle: {
    //           fontWeight: 'bold',
    //         },
    //       }}
    //     />
    //   </Stack.Navigator>
    // );
    return <AppRouter />;
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
