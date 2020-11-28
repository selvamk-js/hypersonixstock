import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContext from './DrawerContext';
import { StyleSheet } from 'react-native';
import HomeStack from './HomeStack';
import { RootStackParamList } from './types';
const Drawer = createDrawerNavigator<RootStackParamList>();

const ModuleIcon = (props: any) => {
  const { name, iProps } = props;
  return (
    <FontAwesome5
      name={name}
      size={18}
      color={iProps.color}
      solid={iProps.focused}
    />
  );
};

const AppRouter = () => {
  return (
    <Drawer.Navigator
      initialRouteName="StockDashboard"
      drawerContentOptions={{
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 16,
        },
        itemStyle: {
          // @ts-ignore:
          color: 'black',
        },
      }}
      drawerType="front"
      drawerContent={dProps => <DrawerContext {...dProps} />}
      drawerStyle={styles.drawer}
    >
      <Drawer.Screen
        name="StockDashboard"
        options={{
          drawerLabel: 'Stock Dashboard',
          drawerIcon: iProps => (
            <ModuleIcon name="chart-area" iProps={iProps} />
          ),
        }}
      >
        {() => <HomeStack />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: { width: 250 },
});

export default AppRouter;
