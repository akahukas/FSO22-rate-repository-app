import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

// Komponentit.
import RepositoryList from './RepositoryList/index';
import IndividualRepository from './IndividualRepository/index';
import SignIn from './SignIn';
import AddReviewForm from './AddReviewForm';
import AppBar from './AppBar';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
    fontFamily: theme.fonts.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/addreview' element={<AddReviewForm />} exact />
        <Route path='/signin' element={<SignIn />} exact />
        <Route path='/repositories/:id' element={<IndividualRepository />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
