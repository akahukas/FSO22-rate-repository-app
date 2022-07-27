import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
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

  const navigate = useNavigate()

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem
            item={item}
            itemTheme={styles.repositoryItem}
          />
        </Pressable>
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