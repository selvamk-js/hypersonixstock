import { BIO_AUTHFAILED, BIO_MSG, BIO_NO_SENSOR } from 'app/constants';
import { ERROR, WARNING } from 'constants/GlobalConstants';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Platform,
  Alert,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Modal from 'react-native-modal';
import { Button, Caption, Subheading } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { actions as rootAction } from 'app/slice';

interface IProps {
  isVisible: boolean;

  onClose: () => void;
}

const TouchId = require('assets/icons/touchid.png');
const FaceId = require('assets/icons/faceid.png');

const BioValidateModal = (props: IProps) => {
  const { isVisible, onClose } = props;
  const [bioMode, setBioMode] = useState(TouchId);
  const [bioType, setBioType] = useState('Touch ID');
  const dispatch = useDispatch();

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        if (biometryType === 'Face ID') {
          setBioMode(FaceId);
        } else {
          setBioMode(TouchId);
        }
        setBioType(biometryType);
      })
      .catch(_error => {
        dispatch(
          rootAction.changeToastMessage({
            toastType: WARNING,
            toastMessage: BIO_NO_SENSOR,
          })
        );
        dispatch(rootAction.changeToastVisibility(true));
      });

    return () => {
      FingerprintScanner.release();
    };
  }, [dispatch]);

  const onAttemptFail = () => {
    dispatch(
      rootAction.changeToastMessage({
        toastType: ERROR,
        toastMessage: BIO_AUTHFAILED,
      })
    );
    dispatch(rootAction.changeToastVisibility(true));
  };

  const handleAuthentication = () => {
    FingerprintScanner.isSensorAvailable()
      .then(_biometryType => {
        if (Platform.OS === 'ios') {
          FingerprintScanner.authenticate({
            description: BIO_MSG,
            fallbackEnabled: false,
          })
            .then(() => {
              dispatch(rootAction.changeIsBioValid(true));
              onClose();
            })
            .catch(_error => {
              dispatch(rootAction.changeIsBioValid(false));
              onAttemptFail();
            });
        } else {
          FingerprintScanner.authenticate({
            description: BIO_MSG,
          })
            .then(() => {
              dispatch(rootAction.changeIsBioValid(true));
              onClose();
              Alert.alert('');
            })
            .catch(_error => {
              Alert.alert('');
              onAttemptFail();
            });
        }
      })
      .catch(_error => {
        dispatch(
          rootAction.changeToastMessage({
            toastType: WARNING,
            toastMessage: BIO_NO_SENSOR,
          })
        );
        dispatch(rootAction.changeToastVisibility(true));
      });
  };

  useEffect(() => {
    return () => {
      FingerprintScanner.release();
    };
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={['right', 'left', 'top', 'bottom']}
      >
        <StatusBar barStyle="dark-content" />
        <View style={styles.modalView}>
          <View style={styles.bioView}>
            <Image style={styles.image} source={bioMode} />
            <View style={styles.viewCenter}>
              <Caption style={styles.captionTitle}>
                {`Verify with your ${bioType}`}
              </Caption>
              <Caption style={styles.textAlign}>
                Somehting went wrong, please verify yourself and then login
              </Caption>
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              onPress={handleAuthentication}
              theme={{ roundness: 5 }}
              mode="contained"
            >
              <Subheading style={styles.title}>Use Authentication</Subheading>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textAlign: {
    textAlign: 'center',
  },
  modal: {
    margin: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  safeArea: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  bioView: {
    height: '70%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  captionTitle: {
    fontSize: 20,
  },
  buttonView: {
    height: '30%',
    justifyContent: 'center',
    padding: 20,
    // alignItems: 'center',
  },
  image: {
    height: 140,
    width: 140,
  },
  title: {
    color: '#FFFFFF',
    textTransform: 'none',
  },
});

export default BioValidateModal;
