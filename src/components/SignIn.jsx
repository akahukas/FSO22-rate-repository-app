// Komponentit.
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'

// Kirjastot lomakkeen käsittelyyn.
import { Formik } from 'formik'
import * as yup from 'yup'

// Hookit.
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

// Tyyliasetukset.
import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  signInForm: {
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

// Lomakkeeseen asetettujen arvojen validointi.
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!')
})

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  // Kirjautumisen tekevä funktio.
  const [signIn] = useSignIn()

  // Hyödynnetään kirjautumisen onnistuessa etusivulle siirtyessä.
  const navigate = useNavigate()

  // Lomakkeen lähettämisen tapahtumankäsittelijä.
  const onSubmit = async (values) => {
    const { username, password } = values
    
    try {
      const { data } = await signIn({ username, password })
      
      // Siirrytään etusivulle kirjautumisen onnistuessa.
      if (data.authenticate.accessToken) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (<SignInContainer onSubmit={onSubmit} />)
}

export default SignIn
