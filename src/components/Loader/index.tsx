import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Paragraph, Portal, Dialog, Colors } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';

interface IProps {
  showLoader: boolean;
}

const Loader = (props: IProps) => {
  const { showLoader } = props;

  return (
    <Portal>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <Dialog visible={showLoader} theme={{ roundness: 10 }}>
        <Dialog.Title>{'Progress'}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogContent}>
            <ActivityIndicator
              size="large"
              color={Colors.blue500}
              style={styles.acitivyIndicator}
            />
            <Paragraph>{'Loading...'}</Paragraph>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  acitivyIndicator: { marginRight: 16 },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Loader;
