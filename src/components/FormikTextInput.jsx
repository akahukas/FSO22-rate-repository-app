// Komponentit.
import TextInput from './TextInput'
import Text from './Text'

// Hookit.
import { useField } from 'formik'

// Tyyliasetukset.
import { StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  errorText: {
    marginVertical: 5,
    color: theme.colors.error,
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
