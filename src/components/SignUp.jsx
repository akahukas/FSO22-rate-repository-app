// Komponentit.
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'

import { Formik } from 'formik'
import * as yup from 'yup'

import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const styles = StyleSheet.create({
  signUpForm: {
    backgroundColor: theme.colors.formBackground,
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
  signUpButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.small,
  },
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.signUpForm}>
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
      <FormikTextInput
        style={styles.textInput}
        secureTextEntry
        name='passwordConfirmation'
        placeholder='Password confirmation'
      />
      <Pressable style={styles.signUpButton} onPress={onSubmit}>
        <Text color='textWhite' fontSize='subheading' >
          Sign up
        </Text>
      </Pressable>
    </View>
  )
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!')
    .min(1, 'Username has to be longer than 1 characters!')
    .max(30, 'Username has to be shorter than 30 characters!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(5, 'Password has to be longer than 5 characters!')
    .max(50, 'Password has to be shorter than 50 characters!'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required!')
    .oneOf([yup.ref('password'), null], 'Passwords don\'t match!'),
})

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    
    try {
      const { data } = await signUp({ username, password })
      
      if (data.createUser) {
        await signIn({ username, password })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (<SignUpContainer onSubmit={onSubmit} />)
}

export default SignUp
