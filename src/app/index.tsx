import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';

import { useStyles } from '../styles';
import { appRootSaga } from './saga';
import Stock from 'containers/Stock';

const App = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: appRootSaga });
  const GStyles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadEmployeeData());
  }, [dispatch]);

  return (
    <SafeAreaView style={GStyles.background.root}>
      <Stock />
    </SafeAreaView>
  );
};

export default App;
