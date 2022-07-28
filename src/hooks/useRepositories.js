import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {

  if (variables.selectedPrinciple === 'latestRepositories') {
    variables = {
      ...variables,
      searchKeyword: variables.debouncedFilter,
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    }
  }
  else if (variables.selectedPrinciple === 'HighestRatedRepositories') {
    variables = {
      ...variables,
      searchKeyword: variables.debouncedFilter,
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    }
  }
  else if (variables.selectedPrinciple === 'LowestRatedRepositories') {
    variables = {
      ...variables,
      searchKeyword: variables.debouncedFilter,
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    }
  }

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      }
    })
  }
  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    error,
    loading,
    ...result,
  }
}

export default useRepositories