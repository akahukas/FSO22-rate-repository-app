import { View, StyleSheet } from 'react-native' 
import { ItemSeparator } from './index'
import RepositoryItem from '../RepositoryList/RepositoryItem'

import theme from '../../theme'

import * as Linking from 'expo-linking'

const styles = StyleSheet.create({
  repositoryItem: {
    backgroundColor: theme.colors.repositoryItemBackground,
  },
})

const RepositoryInfo = ({ repository }) => {
  
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
      <ItemSeparator />
    </View>
  )
}

export default RepositoryInfo
