// Komponentit ja tyyliasetukset.
import { View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryList/RepositoryItem'
import Text from './Text'
import theme from '../theme'

// Kyselyt.
import { useQuery } from '@apollo/client'
import { REPOSITORY_WITH_URL } from '../graphql/queries'

// Hookit ja muut kirjastot.
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

// Tyyliasetukset.
const styles = StyleSheet.create({
  repositoryItem: {
    backgroundColor: theme.colors.repositoryItemBackground,
  },
})

const IndividualRepository = () => {
  // Haetaan osoitekentästä renderöitävän repositorion id.
  const { id } = useParams()

  // Tehdään GraphQL-kysely haetun id:n avulla.
  const getRepositoryWithUrl = useQuery(REPOSITORY_WITH_URL, {
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

  // Tallennetaan kyselyn vastaus muuttujaan.
  const repository = getRepositoryWithUrl.data.repository

  // GitHub-linkkipainikkeen tapahtumankäsittelijä.
  const onPress = () => {
    Linking.openURL(repository.url)
  }

  return (
    <View>
      <RepositoryItem
        hasLinkButton={true}
        buttonText='Open in GitHub'
        handlePress={onPress}
        item={repository}
        itemTheme={styles.repositoryItem}
      />
    </View>
  )
}

export default IndividualRepository
