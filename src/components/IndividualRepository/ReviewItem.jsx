import { View, StyleSheet } from 'react-native'
import Text from '../Text'
import theme from '../../theme'

import { format } from 'date-fns'

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
})

const RatingIcon = ({ rating }) => (
  <View style={styles.ratingIconOuterCircle} >
    <View style={styles.ratingIconInnerCircle} >
      <Text color='primary' fontSize='subheading' >
        {rating}
      </Text>
    </View>
  </View>
)

const UserAndDate = ({ createdAt, username }) => {
  const date = format(new Date(createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.userAndDate} >
      <Text fontWeight='bold'>
        {username}
      </Text>
      <Text color='textSecondary' >
        {date}
      </Text>
    </View>
)}

const ReviewItem = ({ review }) => {
  return (
    <View
      style={styles.reviewItem}
    >
      <RatingIcon
        rating={review.rating}
      />
      <UserAndDate
        createdAt={review.createdAt}
        username={review.user.username}
      />
      <Text style={styles.reviewText} >
        {review.text}
      </Text>
    </View>
  )
}

export default ReviewItem
