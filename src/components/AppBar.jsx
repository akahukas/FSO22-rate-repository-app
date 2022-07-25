import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  appBarTab: {
    padding: 15,
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab
      tabText='Repositories'
      path='/'
      handlePress={null}
      style={styles.appBarTab}
    />
    <AppBarTab
      tabText='Sign in'
      path='/signin'
      handlePress={null}
      style={styles.appBarTab}
    />
  </View>
  );
};

export default AppBar;