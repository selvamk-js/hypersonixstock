import { CommonActions } from '@react-navigation/native';

let navigator: any;

const setTopLevelNavigator = (navigatorRef: any) => {
  navigator = navigatorRef;
};

const navigate = (routeName: string, param: {}) =>
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: param,
    })
  );

export default {
  setTopLevelNavigator,
  navigate,
};
