import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import AsyncStorage from '@react-native-community/async-storage';

import { actions, loginSliceKey, reducer } from './slice';
import { loginSaga } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from 'app/selectors';
import AuthContext from 'app/components/AuthContext';
import { IAuthContextType } from 'app/types';

const Login = () => {
  useInjectReducer({ key: loginSliceKey, reducer: reducer });
  useInjectSaga({ key: loginSliceKey, saga: loginSaga });
  const { signIn } = useContext<IAuthContextType>(AuthContext);

  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken) || '';

  useEffect(() => {
    const setToken = async () => {
      if (token !== undefined && token !== '') {
        await AsyncStorage.setItem('@appusertoken', token);
        signIn(token);
      }
    };
    setToken();
  }, [signIn, token]);

  const handleGoogleSignIn = () => {
    console.log('handleGoogleSignIn');
    dispatch(actions.googleSignIn());
  };

  return (
    <View style={styles.rootView}>
      <StatusBar animated barStyle="light-content" />
      <Button
        style={styles.button}
        mode="outlined"
        theme={{ colors: { primary: '#FFFFFF' }, roundness: 25 }}
        icon={() => <Icon name="google" brand size={25} color="#FFFFFF" />}
        onPress={handleGoogleSignIn}
      >
        <Title style={styles.title}>Sign In with Google</Title>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#413175',
  },
  button: {
    borderColor: '#fafafa',
    backgroundColor: 'rgba(236, 233, 245,0.3)',
    height: 50,
  },
  title: {
    color: '#FFFFFF',
    textTransform: 'none',
  },
});

export default Login;
