import React from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer } from './slice';

import { appRootSaga } from './saga';
// import Stock from 'containers/Stock';
// import WrappedApp from './components/WrappedApp';
import { selectToastMessage, selectToastVisibility } from './selectors';
import Authentication from './components/Authentication';
import SnackbarCustom from 'components/Snackbar';
import { StyleSheet, View } from 'react-native';

const App = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: appRootSaga });

  // const dispatch = useDispatch();
  const toastVisible = useSelector(selectToastVisibility);
  const toast = useSelector(selectToastMessage);

  // useEffect(() => {
  //   dispatch(actions.loadEmployeeData());
  // }, [dispatch]);

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
