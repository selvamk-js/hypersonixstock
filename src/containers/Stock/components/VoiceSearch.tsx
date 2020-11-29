import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Caption, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch } from 'react-redux';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-community/voice';

interface IProps {
  isVisible: boolean;

  onClose: (result: string[]) => void;
}

const voice = require('assets/icons/voice.png');

const VoiceSearch = (props: IProps) => {
  const { isVisible, onClose } = props;
  const [speechStarted, setSpeechStarted] = useState('');
  const [speechResult, setSpeechResult] = useState<string[]>([]);

  useEffect(() => {
    Voice.onSpeechStart = (_e: any) => {
      setSpeechStarted('listening...');
    };
    Voice.onSpeechEnd = (_e: any) => {
      setSpeechStarted('listening ended...');
    };
    Voice.onSpeechRecognized = (_e: SpeechRecognizedEvent) => {
      setSpeechStarted('voice recognized...');
    };
    Voice.onSpeechError = (_e: SpeechErrorEvent) => {
      setSpeechStarted('Error in voice recognization...');
    };
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      setSpeechResult(e.value || []);
    };
  }, []);

  const startRecognizing = async () => {
    setSpeechStarted('');
    setSpeechResult([]);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const finishRecognizing = async () => {
    try {
      await Voice.stop();
      onClose(speechResult);
    } catch (e) {
      console.error(e);
    }
  };

  const closeRecognizing = async () => {
    try {
      await Voice.stop();
      onClose([]);
    } catch (e) {
      console.error(e);
    }
  };

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
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="#413175"
        />
        <View style={styles.modalView}>
          <View style={styles.bioView}>
            <View style={styles.viewCenter}>
              <Caption style={styles.captionTitle}>
                {'Ask Jarvix to search company stock'}
              </Caption>
              <Caption style={styles.textAlign}>
                Tap on the Microphone Icon
              </Caption>
              <Caption style={styles.textAlign}>Say Ex: Show TTM stock</Caption>
            </View>
          </View>
          <View style={styles.buttonView}>
            <View>
              <Image style={styles.image} source={voice} />
              <Caption style={styles.textAlign}>{speechStarted}</Caption>
              {speechResult.map((result, index) => {
                return (
                  <Caption key={`result-${index}`} style={styles.textAlign}>
                    {result}
                  </Caption>
                );
              })}
            </View>
            <View style={styles.buttonCol}>
              <View style={styles.iconView}>
                <IconButton
                  icon="check"
                  color={'#FFFFFF'}
                  size={30}
                  onPress={finishRecognizing}
                  style={styles.icon}
                />
              </View>
              <View style={styles.iconView}>
                <IconButton
                  icon="microphone"
                  color={'#FFFFFF'}
                  size={30}
                  onPress={startRecognizing}
                  style={styles.icon}
                />
              </View>
              <View style={styles.iconView}>
                <IconButton
                  icon="close"
                  color={'#FFFFFF'}
                  size={30}
                  onPress={closeRecognizing}
                  style={styles.icon}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textAlign: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
  },
  modal: {
    margin: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#413175',
  },
  safeArea: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  bioView: {
    height: '30%',
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
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
  },
  buttonView: {
    height: '70%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 170,
    width: 170,
  },
  title: {
    color: '#FFFFFF',
    textTransform: 'none',
  },
  buttonCol: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconView: {
    margin: 10,
  },
  icon: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default VoiceSearch;
