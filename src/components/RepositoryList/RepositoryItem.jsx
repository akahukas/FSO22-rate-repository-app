import { View, StyleSheet, Pressable } from 'react-native'
import Text from '../Text'

import RepoItemInfo from './RepoItemInfo'
import RepoItemTag from './RepoItemTag'
import RepoItemStats from './RepoItemStats'

import theme from '../../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repositoryAvatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  repoItemInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  repoInfoText: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  repoItemTag: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 80,
    marginBottom: 5,
  },
  tagStyle: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  repoItemStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  repoItemStat: {
    padding: 10,
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.small,
  },
})

const RepositoryItem = ({ hasLinkButton, buttonText, handlePress, item, itemTheme }) => {
  return (
    <View
      key={item.id}
      style={itemTheme}
      testID='repositoryItem'
    >
      <RepoItemInfo
        mainStyle={styles.repoItemInfo}
        avatarStyle={styles.repositoryAvatar}
        textStyle={styles.repoInfoText}
        imgSource={item.ownerAvatarUrl}
        name={item.fullName}
        description={item.description}
      />
      <RepoItemTag
        textTag={item.language}
        mainStyle={styles.repoItemTag}
        tagStyle={styles.tagStyle}
      />
      <RepoItemStats
        mainStyle={styles.repoItemStats}
        statStyle={styles.repoItemStat}
        starCount={item.stargazersCount}
        forkCount={item.forksCount}
        reviewCount={item.reviewCount}
        rating={item.ratingAverage}
      />
      { hasLinkButton && 
        <Pressable style={styles.linkButton} onPress={handlePress}>
          <Text color='textWhite' fontSize='subheading' >
            {buttonText}
          </Text>
        </Pressable>
      }
    </View>
  )
}

export default RepositoryItem
