import { gql } from '@apollo/client'

import {
  CORE_REPOSITORY_FIELDS,
  CORE_REVIEW_FIELDS,
  CORE_USER_FIELDS
} from './fragments'

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String
    ) {
      repositories(
        orderBy: $orderBy,
        orderDirection: $orderDirection
        searchKeyword: $searchKeyword
        ) {
          edges {
            node {
              ...CoreRepositoryFields
            }
          }
        }
      }
`

export const GET_ME = gql`
  ${CORE_USER_FIELDS}
  query {
    me {
      ...CoreUserFields
    }
  }
`

export const REPOSITORY_WITH_URL_AND_REVIEWS = gql`
  ${CORE_REPOSITORY_FIELDS}
  ${CORE_REVIEW_FIELDS}
  query getRepositoryWithUrl($id: ID!) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
      reviews {
        edges {
          node {
            ...CoreReviewFields
          }
        }
      }
    }
  }
`
