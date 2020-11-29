import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Platform, StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WARNING } from 'constants/GlobalConstants';
import AuthContext from 'app/components/AuthContext';

import { sliceKey, reducer, actions } from './slice';
// import { actions as stockAction } from 'containers/Stock/slice';

import { appRootSaga } from './saga';
import { selectToastMessage, selectToastVisibility } from './selectors';
import Authentication from './components/Authentication';
import SnackbarCustom from 'components/Snackbar';
import { BIO_MSG, BIO_NO_SENSOR } from './constants';
import { IAuthContextType } from './types';

const App = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: appRootSaga });

  const dispatch = useDispatch();
  const toastVisible = useSelector(selectToastVisibility);
  const toast = useSelector(selectToastMessage);
  const { signOut } = useContext<IAuthContextType>(AuthContext);

  useEffect(() => {
    if (Platform.OS === 'android') {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        offlineAccess: false,
        webClientId:
          '41656066828-9t4quupqv34ge8idhnu57g42jl0slefn.apps.googleusercontent.com',
      });
    } else {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId: Config.webClientId,
        offlineAccess: false,
        iosClientId: Config.iosClientId,
      });
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await AsyncStorage.clear();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    signOut();
    dispatch(actions.changeIsBioValid(false));
  }, [signOut, dispatch]);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(_biometryType => {
        if (Platform.OS === 'ios') {
          FingerprintScanner.authenticate({
            description: BIO_MSG,
            fallbackEnabled: false,
          })
            .then(() => {
              dispatch(actions.changeIsBioValid(true));
            })
            .catch(_error => {
              dispatch(actions.changeIsBioValid(false));
              handleSignOut();
            });
        } else {
          FingerprintScanner.authenticate({
            title: BIO_MSG,
            onAttempt: () => handleSignOut(),
          })
            .then(() => {
              dispatch(actions.changeIsBioValid(true));
            })
            .catch(_error => {
              dispatch(actions.changeIsBioValid(false));
              handleSignOut();
            });
        }
      })
      .catch(_error => {
        dispatch(
          actions.changeToastMessage({
            toastType: WARNING,
            toastMessage: BIO_NO_SENSOR,
          })
        );
        dispatch(actions.changeToastVisibility(true));
      });

    return () => {
      FingerprintScanner.release();
    };
  }, [dispatch, handleSignOut]);

  return (
    <View style={styles.addFlex}>
      <Authentication />
      <SnackbarCustom toastVisible={toastVisible} toast={toast} />
    </View>
  );
};

const styles = StyleSheet.create({
  addFlex: {
    flex: 1,
  },
});

export default App;
