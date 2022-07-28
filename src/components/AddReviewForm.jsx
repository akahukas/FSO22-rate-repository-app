// Komponentit ja tyyliasetukset.
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'
import theme from '../theme'

// Kirjastot lomakkeen käsittelyyn.
import { Formik } from 'formik'
import * as yup from 'yup'

// Hookit.
import useAddReviewForm from '../hooks/useAddReviewForm'
import { useNavigate } from 'react-router-native'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

// Tyyliasetukset.
const styles = StyleSheet.create({
  addReviewForm: {
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
  createButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.small,
  },
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.addReviewForm}>
      <FormikTextInput
        style={styles.textInput}
        name='ownerName'
        placeholder='Repository owner name'
      />
      <FormikTextInput
        style={styles.textInput}
        name='repositoryName'
        placeholder='Repository name'
      />
      <FormikTextInput
        style={styles.textInput}
        name='rating'
        placeholder='Rating between 0 and 100'
      />
      <FormikTextInput
        style={styles.textInput}
        name='text'
        placeholder='Review'
        multiline={true}
      />
      <Pressable style={styles.createButton} onPress={onSubmit}>
        <Text color='textWhite' fontSize='subheading' >
          Create a review
        </Text>
      </Pressable>
    </View>
  )
}

// Lomakkeeseen asetettujen arvojen kelvollisuuden käsittely.
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required!'),
  repositoryName: yup
    .string()
    .required('Repository name is required!'),
  rating: yup
    .number()
    .typeError('Rating has to be a number value between 0 and 100!')
    .required('Rating is required!')
    .min(0, 'Rating value must be higher than 0!')
    .max(100, 'Rating value must be lower than 100!')
    .integer('Rating value has to be an integer! (eg. 1, 2, 3 etc.)'),
  text: yup
    .string()
})

export const AddReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const AddReviewForm = () => {
  const [addReview] = useAddReviewForm()
  const navigate = useNavigate()

  // Lomakkeen lähettämisen tapahtumankäsittelijä.
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    
    try {
      const { data } = await addReview({ ownerName, repositoryName, rating, text })
      
      // Lisäyksen onnistuessa siirrytään sen
      // repositorion sivulle, jolle arviointi annettiin.
      if (data.createReview) {
        navigate(`/repositories/${data.createReview.repositoryId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (<AddReviewContainer onSubmit={onSubmit} />)
}

export default AddReviewForm
