import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

// Komponentit.
import RepositoryScene from './RepositoryList/index';
import IndividualRepository from './IndividualRepository/index';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddReviewForm from './AddReviewForm';
import LoggedInReviews from './LoggedInReviews';
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
        <Route
          path='/'
          element={<RepositoryScene />}
          exact
        />
        <Route
          path='/addreview'
          element={<AddReviewForm />}
          exact
        />
        <Route
          path='/user/reviews'
          element={<LoggedInReviews />}
          exact
        />
        <Route
          path='/signin'
          element={<SignIn />}
          exact
        />
        <Route
          path='/signup'
          element={<SignUp />}
          exact
        />
        <Route
          path='/repositories/:id'
          element={<IndividualRepository />}
          exact
        />
        <Route
          path='*'
          element={<Navigate to='/' replace />}
        />
      </Routes>
    </View>
  );
};

export default Main;
