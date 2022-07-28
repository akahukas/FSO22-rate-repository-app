import { View, FlatList, StyleSheet } from 'react-native'
import ReviewItem from './IndividualRepository/ReviewItem'
import Text from './Text'

import { useQuery } from '@apollo/client'
import { GET_ME } from '../graphql/queries'

import theme from '../theme'

// Tyyliasetukset.
const styles = StyleSheet.create({
  repositoryItem: {
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  separator: {
    height: 10,
  },
  statusMessage: {
    marginTop: 100,
    alignItems: 'center',
  },
  reviewsContainer: {
    flex: 1,
  },
})


const ItemSeparator = () => <View style={styles.separator} />

const LoggedInReviews = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          An error occurred: {error.message}
        </Text>
      </View>
    )
  } else if (loading) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          Loading your reviews...please wait.
        </Text>
      </View>
    )
  }

  const reviews = data.me.reviews
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <View style={styles.reviewsContainer} >
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default LoggedInReviews
