// Komponentit ja tyyliasetukset.
import { View, StyleSheet, FlatList } from 'react-native'
import Text from '../Text'
import ReviewItem from './ReviewItem'
import RepositoryInfo from './RepositoryInfo'
import theme from '../..theme'

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
})

export const ItemSeparator = () => <View style={styles.separator} />;

const IndividualRepository = () => {
  // Haetaan osoitekentästä renderöitävän repositorion id.
  const { id } = useParams()

  // Tehdään GraphQL-kysely haetun id:n avulla.
  const getRepositoryWithUrl = useQuery(REPOSITORY_WITH_URL_AND_REVIEWS, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  })

  // Kyselyssä ilmenee ongelma.
  if (getRepositoryWithUrl.error) {
    return (
      <View style={styles.statusMessage} >
        <Text fontSize='subheading' fontWeight='bold' >
          An error occurred: {getRepositoryWithUrl.error.message}
        </Text>
      </View>
    )
    // Kyselyyn ei ole vielä vastattu.
  } else if (getRepositoryWithUrl.loading) {
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
  const repository = getRepositoryWithUrl.data.repository
  const reviews = getRepositoryWithUrl.data.repository.reviews
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default IndividualRepository
