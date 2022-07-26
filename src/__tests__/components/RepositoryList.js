import { RepositoryListContainer } from '../../components/RepositoryList/index'
import { render } from '@testing-library/react-native'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      // Renderöidään <RepositoryListContainer /> ruudulle
      // ja hyödynnetään siinä getAllByTestId -kyselyä.
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      )
      
      // Haetaan kaikki repositorioelementit ja tallennetaan ne omiin muuttujiinsa.
      const repositoryItems = getAllByTestId('repositoryItem')
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems
      
      // Haetaan kaikki repositorioelementtien sisällä olevat infoelementit ja
      // varmistetaan, että niitä on oikea määrä, yksi (1) per repositorioelementti.
      const repoItemInfoElements = getAllByTestId('repoItemInfo')
      expect(repoItemInfoElements).toHaveLength(2)
      
      // Haetaan kaikki repositorioelementtien sisällä olevat tägielementit ja
      // varmistetaan, että niitä on oikea määrä, yksi (1) per repositorioelementti.
      const repoItemTagElements = getAllByTestId('repoItemTag')
      expect(repoItemTagElements).toHaveLength(2)
      
      // Haetaan kaikki repositorioelementtien sisällä olevat tilastoelementit ja
      // varmistetaan, että niitä on oikea määrä, yksi (4) per repositorioelementti.
      const repoItemStatsElements = getAllByTestId('repoItemStat')
      expect(repoItemStatsElements).toHaveLength(8)
      

      // Varmistetaan ensimmäisen repositorioelementin olemassaolo.
      expect(firstRepositoryItem).toBeDefined()

      // Varmistetaan, että infoelementit sisältävät oikeat tekstiarvot.
      expect(repoItemInfoElements[0]).toHaveTextContent('jaredpalmer/formik')
      expect(repoItemInfoElements[0]).toHaveTextContent('Build forms in React, without the tears')

      // Varmistetaan, että tägielementti sisältää oikean tekstiarvon.
      expect(repoItemTagElements[0]).toHaveTextContent('TypeScript')

      // Varmistetaan, että tilastoelementit sisältävät oikeat tekstiarvot.
      expect(repoItemStatsElements[0]).toHaveTextContent('21.9kStars')
      expect(repoItemStatsElements[1]).toHaveTextContent('1.6kForks')
      expect(repoItemStatsElements[2]).toHaveTextContent('3Reviews')
      expect(repoItemStatsElements[3]).toHaveTextContent('88Rating')
      

      // Varmistetaan toisen repositorioelementin olemassaolo.
      expect(secondRepositoryItem).toBeDefined()

      // Varmistetaan, että infoelementit sisältävät oikeat tekstiarvot.
      expect(repoItemInfoElements[1]).toHaveTextContent('async-library/react-async')
      expect(repoItemInfoElements[1]).toHaveTextContent('Flexible promise-based React data loader')

      // Varmistetaan, että tägielementti sisältää oikean tekstiarvon.
      expect(repoItemTagElements[1]).toHaveTextContent('JavaScript')

      // Varmistetaan, että tilastoelementit sisältävät oikeat tekstiarvot.
      expect(repoItemStatsElements[4]).toHaveTextContent('1.8kStars')
      expect(repoItemStatsElements[5]).toHaveTextContent('69Forks')
      expect(repoItemStatsElements[6]).toHaveTextContent('3Reviews')
      expect(repoItemStatsElements[7]).toHaveTextContent('72Rating')
    })
  })
})