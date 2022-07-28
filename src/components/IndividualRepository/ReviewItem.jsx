// Komponentit ja tyyliasetukset.
import { View, Pressable, StyleSheet, Alert } from 'react-native'
import Text from '../Text'
import theme from '../../theme'

// Kirjasto päivämäärien hallinnointiin.
import { format } from 'date-fns'

// Hookit.
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../../hooks/useDeleteReview'

// Tyyliasetukset.
const styles = StyleSheet.create({
  reviewItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.padding.reviewItemHorizontal,
    paddingVertical: theme.padding.reviewItemVertical,
    backgroundColor: theme.colors.reviewItemBackground,
  },
  ratingIconOuterCircle: {
    backgroundColor: theme.colors.ratingIconOuterCircle,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingIconInnerCircle: {
    backgroundColor: theme.colors.ratingIconInnerCircle,
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAndDate: {
    marginLeft: 10,
    marginTop: 5,
  },
  reviewText: {
    marginLeft: 60,
    marginTop: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: theme.borderRadius.small,
  },
  deleteButton: {
    backgroundColor: theme.colors.deleteButton,
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: theme.borderRadius.small,
  },
})

// Ikoni, joka näyttää repositoriolle annetun arvosanan.
const RatingIcon = ({ rating }) => (
  <View style={styles.ratingIconOuterCircle} >
    <View style={styles.ratingIconInnerCircle} >
      <Text color='primary' fontSize='subheading' >
        {rating}
      </Text>
    </View>
  </View>
)

// Komponentti, joka vastaa nimen ja päivämäärän renderöinnistä.
const UserAndDate = ({ reviewView, review }) => {

  // Muotoillaan parametrina saatu päivämäärä haluttuun muotoon.
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.userAndDate} >
      <Text fontWeight='bold'>
        {
          !reviewView
            ? review.user.username
            : review.repository.fullName
        }
      </Text>
      <Text color='textSecondary' >
        {date}
      </Text>
    </View>
)}

const ReviewItem = ({ hasActions, review, refetch }) => {
  // Jos arvostelun teksti on riittävän lyhyt, vältetään
  // sen joutuminen samalle riville muiden elementtien kanssa.
  const wrapText = review.text.length <= 40

  // Hyödynnetään oikean repositorion näkymään siirryttäessä.
  const navigate = useNavigate()

  // Hook, joka käsittelee arvostelun poistamisen.
  const [deleteReview] = useDeleteReview()

  // Tapahtumankäsittelijä arvostelun poistamiselle.
  const onDelete = async () => {
    try {
      // Poistetaan arvostelu.
      await deleteReview({ id: review.id })
      
      // Noudetaan päivittyneet arvostelut.
      await refetch({ id: review.id })
    } catch (error) {
      console.log(error)
    }
  }

  // Poistopainikkeen tapahtumankäsittelijä.
  const handleRemove = (event) => {
    event.preventDefault()

    // Avataan varoitusikkuna,
    // varmistetaan käyttäjän toimenpide.
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {onDelete()},
          style: 'destructive'
        },
      ]
    )
  }

  return (
    <View
      style={styles.reviewItem}
    >
      <RatingIcon
        rating={review.rating}
      />
      <UserAndDate
        reviewView={hasActions}
        review={review}
      />
      <Text style={wrapText
        ? {...styles.reviewText, minWidth: 200}
        : styles.reviewText
        }
      >
        {review.text}
      </Text>
      { hasActions && (
        <View style={styles.buttonContainer} >
          <Pressable
            style={styles.viewButton}
            onPress={() => {
              navigate(`/repositories/${review.repositoryId}`)
            }}
          >
            <Text color='textWhite' fontSize='subheading' >
              View repository
            </Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleRemove}>
            <Text color='textWhite' fontSize='subheading' >
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default ReviewItem
