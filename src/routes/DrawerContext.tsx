import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Caption, Divider, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { DrawerItemList } from '@react-navigation/drawer';

import { selectUserInfo } from 'app/selectors';

const MobileDrawer = (props: any) => {
  const { user } = useSelector(selectUserInfo);

  return (
    <SafeAreaView style={[styles.safeArea]} edges={['right', 'left', 'top']}>
      <View style={styles.srow}>
        <View>
          <Avatar.Image size={60} source={{ uri: user.photo }} />
        </View>
        <View style={styles.name}>
          <Title style={styles.title}>{user.givenName}</Title>
          <Caption style={styles.title}>{user.email}</Caption>
        </View>
      </View>
      <Divider />
      <View style={styles.container}>
        <ScrollView {...props}>
          <DrawerItemList {...props} />
        </ScrollView>
        <View style={styles.footer}>
          <Divider />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signOut: { marginLeft: 20 },
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  name: {
    paddingLeft: 10,
  },
  row: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  footer: {
    height: 70,
    backgroundColor: '#FBFBFB',
  },
  safeArea: {
    backgroundColor: '#672ff0',
    flex: 1,
  },
  srow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    maxHeight: 300,
  },
  center: {
    justifyContent: 'center',
  },
  subHead: { color: '#FFFFFF', fontWeight: 'bold' },
  avatarCol: { width: 'auto', paddingRight: 8 },
  avatar: { backgroundColor: '#FFFFFF' },
  white: { color: '#FFFFFF' },
  title: {
    color: '#FFFFFF',
  },
});

export default MobileDrawer;
