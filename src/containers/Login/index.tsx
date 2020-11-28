import * as React from 'react';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Login = () => {
  return (
    <View style={styles.rootView}>
      <StatusBar animated barStyle="light-content" />
      <Button
        style={styles.button}
        mode="outlined"
        theme={{ colors: { primary: '#FFFFFF' }, roundness: 25 }}
        icon={() => <Icon name="google" brand size={25} color="#FFFFFF" />}
        onPress={() => Alert.alert('test')}
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
