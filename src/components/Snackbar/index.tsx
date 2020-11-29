import * as React from 'react';
import { Colors, Snackbar, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { IToast } from 'app/types';

import { GlobalConstants } from '../../constants';

import { actions } from 'app/slice';

const { INFO, ERROR, WARNING, SUCCESS } = GlobalConstants;

interface IProps {
  toast?: IToast;

  toastVisible: boolean;
}

const SnackbarCustom = (props: IProps) => {
  const {
    toast = {
      toastMessage: '',
      toastType: INFO,
    },
    toastVisible,
  } = props;

  const dispatch = useDispatch();

  const getMessage = () => {
    if (typeof toast.toastMessage === 'string' && toast) {
      switch (toast.toastType) {
        case INFO: {
          return (
            <Text style={{ color: Colors.blue500 }}>{toast.toastMessage}</Text>
          );
        }
        case ERROR: {
          return (
            <Text style={{ color: Colors.pink500 }}>{toast.toastMessage}</Text>
          );
        }
        case WARNING: {
          return (
            <Text style={{ color: Colors.amber500 }}>{toast.toastMessage}</Text>
          );
        }
        case SUCCESS: {
          return (
            <Text style={{ color: Colors.green500 }}>{toast.toastMessage}</Text>
          );
        }
        default: {
          return <Text style={styles.textColor}>{toast.toastMessage}</Text>;
        }
      }
    }
    return null;
  };

  const onToastDismiss = () => {
    const defultToastData = {
      toastMessage: '',
      toastType: INFO,
    };
    dispatch(actions.changeToastMessage(defultToastData));
    dispatch(actions.changeToastVisibility(false));
  };

  return (
    <Snackbar
      visible={toastVisible}
      onDismiss={onToastDismiss}
      action={{
        label: '',
        onPress: () => {},
      }}
      duration={Snackbar.DURATION_MEDIUM}
      style={styles.sncakBar}
    >
      {getMessage()}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  sncakBar: {
    backgroundColor: '#283747',
    marginBottom: 10,
    borderRadius: 10,
  },
  textColor: { color: '#FFFFFF' },
});

export default SnackbarCustom;
