import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Platform, StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import AsyncStorage from '@react-native-community/async-storage';

import { ERROR, WARNING } from 'constants/GlobalConstants';
import AuthContext from 'app/components/AuthContext';

import { sliceKey, reducer, actions } from './slice';
// import { actions as stockAction } from 'containers/Stock/slice';

import { appRootSaga } from './saga';
import { selectToastMessage, selectToastVisibility } from './selectors';
import Authentication from './components/Authentication';
import SnackbarCustom from 'components/Snackbar';
import { BIO_AUTHFAILED, BIO_MSG, BIO_NO_SENSOR } from './constants';
import { IAuthContextType } from './types';

const App = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: appRootSaga });
  const { signOut } = useContext<IAuthContextType>(AuthContext);

  // const [isBioAvailbale, setIsBioAvailbale] = useState(false);
  // const [isBioValid, setIsBioValid] = useState(false);
  const dispatch = useDispatch();
  const toastVisible = useSelector(selectToastVisibility);
  const toast = useSelector(selectToastMessage);

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

  const _signOutAsync = useCallback(async () => {
    await AsyncStorage.clear();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    dispatch(actions.changeIsBioValid(false));
    signOut();
    dispatch(
      actions.changeToastMessage({
        toastType: ERROR,
        toastMessage: BIO_AUTHFAILED,
      })
    );
    dispatch(actions.changeToastVisibility(true));
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
              _signOutAsync();
            });
        } else {
          FingerprintScanner.authenticate({
            title: BIO_MSG,
            onAttempt: _signOutAsync,
          })
            .then(() => {
              dispatch(actions.changeIsBioValid(true));
            })
            .catch(_error => {
              _signOutAsync();
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
  }, [dispatch, _signOutAsync]);

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
