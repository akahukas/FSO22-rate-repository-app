// Komponentit ja tyyliasetukset.
import { View, StyleSheet, FlatList } from 'react-native'
import Text from '../Text'
import ReviewItem from './ReviewItem'
import RepositoryInfo from './RepositoryInfo'
import theme from '../../theme'

// Kyselyt.
import { useQuery } from '@apollo/client'
import { REPOSITORY_WITH_URL_AND_REVIEWS } from '../../graphql/queries'

// Hookit ja muut kirjastot.
import { useParams } from 'react-router-native'

// Tyyliasetukset.
const styles = StyleSheet.create({
  repositoryItem: {
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  separator: {
    height: 10,
  },
  repositoryContainer: {
    flex: 1,
  },
})

export const ItemSeparator = () => <View style={styles.separator} />;

const IndividualRepository = () => {
  // Haetaan osoitekentästä renderöitävän repositorion id.
  const { id } = useParams()

  // Tehdään GraphQL-kysely haetun id:n avulla.
  const { data, error, loading, fetchMore } = useQuery(REPOSITORY_WITH_URL_AND_REVIEWS, {
    variables: {
      id,
      first: 3,
      after: '',
    },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  })

  // Kyselyssä ilmenee ongelma.
  if (error) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          An error occurred: {error.message}
        </Text>
      </View>
    )
    // Kyselyyn ei ole vielä vastattu.
  } else if (loading) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          Loading repository...please wait.
        </Text>
      </View>
    )
  }

  // Tallennetaan muuttujiin kyselyn vastauksesta
  // renderöitävä repositorio ja sen arvioinnit.
  const repository = data.repository
  const reviews = data.repository.reviews
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  // Tapahtumankäsittelijä seuraavien arvostelujen kysymiseen
  // palvelimelta. Kutsutaan jos käyttäjä selaa listan loppuun. 
  const onEndReach = () => {
    // Tarkistetaan onko palvelimella olemassa enempää arviointeja.
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        id,
        first: 3,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    })
  }

  return (
    <View style={styles.repositoryContainer}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.3}
      />
    </View>
  )
}

export default IndividualRepository
