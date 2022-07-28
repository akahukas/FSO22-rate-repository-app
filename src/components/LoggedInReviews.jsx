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
  noReviewsContainer: {
    marginTop: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 20,
    margin: 30,
    backgroundColor: 'white',
  },
  reviewsContainer: {
    flex: 1,
  },
})

// Listaelementtien välikomponentti.
const ItemSeparator = () => <View style={styles.separator} />

const LoggedInReviews = () => {
  // Tehdään kysely, tallennetaan muuttujaan refetch-funktio.
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  // Kyselynaikaisen virheen sattuessa.
  if (error) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          An error occurred: {error.message}
        </Text>
      </View>
    )
  // Kyselyn latautuessa.
  } else if (loading) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          Loading your reviews...please wait.
        </Text>
      </View>
    )
  }

  // Mapataan ja tallennetaan arvostelut muuttujaan.
  const reviews = data.me.reviews
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  // Renderöidään ilmoitus, jos käyttäjällä ei ole luotuja arvosteluja.
  if (reviews.totalCount === 0) {
    return (
      <View style={styles.noReviewsContainer} >
        <Text fontSize='subheading' fontWeight='bold' >
          You do not have any own reviews to show.
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.reviewsContainer} >
        <FlatList
          data={reviewNodes}
          renderItem={({ item }) => (
            <ReviewItem
              hasActions={true}
              refetch={refetch}
              review={item}
            />
          )}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    )
  }

  
}

export default LoggedInReviews
