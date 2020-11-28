import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBar, StyleSheet } from 'react-native';
import Metrics from 'constants/Metrices';

const GradientBackground = () => (
  <LinearGradient
    style={styles.addFlex}
    start={Metrics.LINEAR_START}
    end={Metrics.LINEAR_END}
    colors={['#7b47fa', '#672ff0']}
  >
    <StatusBar
      barStyle={'light-content'}
      translucent
      backgroundColor="transparent"
    />
  </LinearGradient>
);

const styles = StyleSheet.create({
  addFlex: { flex: 1 },
});

export default GradientBackground;
