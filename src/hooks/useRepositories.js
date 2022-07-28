import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {

  // Määritetään muuttujat saadun parametrin mukaan.
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

  // Tehdään kysely, tallennetaan fetchMore-funktio muuttujaan.
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  // Funktio, joka hakee palvelimelta seuraavat listan elementteihin
  // tarvittavat tiedot. Kutsutaan kun käyttäjä selannut etusivulla
  // niin alas, että renderöitävät elementit ovat loppumassa.
  const handleFetchMore = () => {
    // Onko palvelimella lisää elementtejä.
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    // Haetaan palvelimelta lisää tietoja fetchMore-funktion avulla.
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
