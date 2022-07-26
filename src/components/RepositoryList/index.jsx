import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

import useRepositories from '../../hooks/useRepositories';

import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repositoryItem: {
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  statusMessage: {
    marginTop: 100,
    alignItems: 'center',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
        item={item}
        avatarTheme={styles.repositoryAvatar}
        itemTheme={styles.repositoryItem}
        />
      )}
    />
  );
}

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories();

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
          Loading repositories...please wait.
        </Text>
      </View>
    )
  }
  return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;