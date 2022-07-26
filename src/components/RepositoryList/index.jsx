import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import SelectOrder from './SelectOrder';
import Filter from './Filter';

import useRepositories from '../../hooks/useRepositories';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

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
  },
  repositoriesContainer: {
    flex: 1,
  }
});

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  selectedPrinciple,
  setSelectedPrinciple,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const navigate = useNavigate()

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() =>
        <SelectOrder
          selectedPrinciple={selectedPrinciple}
          setSelectedPrinciple={setSelectedPrinciple}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem
            item={item}
            itemTheme={styles.repositoryItem}
          />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.3}
    />
  );
}

const RepositoryList = ({ filter }) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState('latestRepositories')

  // Suoritetaan filtterin tilanmuutoksesta aiheutuva
  // uudelleenkysely puolen sekunnin viiveellä.
  const [debouncedFilter] = useDebounce(filter, 500)

  const { repositories, fetchMore, error, loading } = useRepositories({
    first: 8,
    selectedPrinciple,
    debouncedFilter
  });

  const onEndReach = () => {
    fetchMore()
  }

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
  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedPrinciple={selectedPrinciple}
      setSelectedPrinciple={setSelectedPrinciple}
      onEndReach={onEndReach}
    />
  )
}

const RepositoryScene = () => {
  // Eriytetään filtteröinnin tilanhallinta ja renderöinti omaan
  // funktioonsa, jotta ei menetetä hakupalkin focusta sen tilan muuttuessa.
  const [filter, setFilter] = useState('')

  return (
    <View style={styles.repositoriesContainer}>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <RepositoryList filter={filter} />
    </View>
  )
}

export default RepositoryScene;
