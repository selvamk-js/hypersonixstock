import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actions as rootAction } from 'app/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectIsBioValid } from 'app/selectors';
import AuthContext from 'app/components/AuthContext';
import { IAuthContextType } from 'app/types';

import { actions, loginSliceKey, reducer } from './slice';
import { loginSaga } from './saga';
import BioValidateModal from './BioValidateModal';

const Login = () => {
  useInjectReducer({ key: loginSliceKey, reducer: reducer });
  useInjectSaga({ key: loginSliceKey, saga: loginSaga });

  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken) || '';
  const isBioValidated = useSelector(selectIsBioValid);
  const { signIn } = useContext<IAuthContextType>(AuthContext);

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
    dispatch(actions.googleSignIn());
  };

  const handleClose = () => {
    dispatch(rootAction.changeIsBioValid(true));
  };

  return (
    <View style={styles.rootView}>
      <StatusBar
        animated
        backgroundColor={!isBioValidated ? '#FFFFFF' : '#413175'}
        barStyle={!isBioValidated ? 'dark-content' : 'light-content'}
      />
      <Button
        style={styles.button}
        mode="outlined"
        theme={{ colors: { primary: '#FFFFFF' }, roundness: 25 }}
        icon={() => <Icon name="google" brand size={25} color="#FFFFFF" />}
        onPress={handleGoogleSignIn}
        disabled={!isBioValidated}
      >
        <Title style={styles.title}>Sign In with Google</Title>
      </Button>
      {/* <Button
        style={styles.button}
        mode="outlined"
        theme={{ colors: { primary: '#FFFFFF' }, roundness: 25 }}
        icon={() => <Icon name="google" brand size={25} color="#FFFFFF" />}
        onPress={() => setShowModal(true)}
      >
        <Title style={styles.title}>Show Modal</Title>
      </Button> */}
      <BioValidateModal isVisible={!isBioValidated} onClose={handleClose} />
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
