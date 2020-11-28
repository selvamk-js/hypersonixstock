import Metrics from 'constants/Metrices';
import { StyleSheet } from 'react-native';

const { CARD_BORDER_RADIUS, MARGIN } = Metrics;

const styles = {
  card: StyleSheet.create({
    root: {
      borderRadius: CARD_BORDER_RADIUS,
      margin: MARGIN,
      backgroundColor: '#FFFFFF',
    },
    roundIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 45,
      height: 45,
      borderRadius: 100,
    },
  }),
  menu: StyleSheet.create({
    icon: {
      paddingHorizontal: 12,
      paddingVertical: 3,
    },
    item: { padding: 0, borderRadius: 3 },
  }),
  avatar: StyleSheet.create({
    root: {
      width: 45,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
  }),
  background: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F8F9F9',
    },
  }),
  search: StyleSheet.create({
    root: {
      elevation: 0,
    },
  }),
  cardList: StyleSheet.create({
    root: {
      marginTop: 0.5,
    },
  }),
  actionSheet: StyleSheet.create({
    root: {
      backgroundColor: '#FBFCFC',
    },
  }),
  switch: StyleSheet.create({
    root: {
      transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    },
  }),
  list: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F0F0F0',
    },
  }),
};

export default styles;
