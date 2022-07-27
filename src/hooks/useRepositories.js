import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (selectedPrinciple) => {
  let orderBy = null
  let orderDirection = null

  if (selectedPrinciple === 'latestRepositories') {
    orderBy = 'CREATED_AT'
    orderDirection = 'DESC'
  }
  else if (selectedPrinciple === 'HighestRatedRepositories') {
    orderBy = 'RATING_AVERAGE'
    orderDirection = 'DESC'
  }
  else if (selectedPrinciple === 'LowestRatedRepositories') {
    orderBy = 'RATING_AVERAGE'
    orderDirection = 'ASC'
  }

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (!data || loading) {
    return {
      loading: true,
    }
  } else {
    const repositories = data.repositories

    return { repositories, error, loading }
  }
}

export default useRepositories