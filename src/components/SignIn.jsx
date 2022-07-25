// Komponentit.
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'

import { Formik } from 'formik'

import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  signInForm: {
    backgroundColor: theme.colors.signInFormBackground,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: theme.padding.formHorizontal,
    paddingVertical: theme.padding.formButtonVertical,
  },
  textInput: {
    borderColor: theme.colors.textInputBorder,
    color: theme.colors.textSecondary,
    borderWidth: 1,
    padding: theme.padding.formInput,
    marginVertical: 10,
    borderRadius: theme.borderRadius.small,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.small,
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput
        style={styles.textInput}
        name='username'
        placeholder='Username'
      />
      <FormikTextInput
        style={styles.textInput}
        secureTextEntry
        name='password'
        placeholder='Password'
      />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text color='textWhite' fontSize='subheading' >
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
