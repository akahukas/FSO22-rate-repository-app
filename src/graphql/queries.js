import { gql } from '@apollo/client'

import {
  CORE_REPOSITORY_FIELDS,
  CORE_REVIEW_FIELDS,
  CORE_USER_FIELDS,
  CORE_PAGE_INFO_FIELDS,
} from './fragments'

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  ${CORE_PAGE_INFO_FIELDS}
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String,
    ) {
      repositories(
        orderBy: $orderBy
        orderDirection: $orderDirection
        searchKeyword: $searchKeyword
        first: $first
        after: $after
        ) {
          edges {
            node {
              ...CoreRepositoryFields
            }
            cursor
          }
          pageInfo {
            ...CorePageInfoFields
          }
        }
      }
`

export const GET_ME = gql`
  ${CORE_USER_FIELDS}
  ${CORE_REVIEW_FIELDS}
  query getLoggedInUser($includeReviews: Boolean = false) {
    me {
      ...CoreUserFields
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            ...CoreReviewFields
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`

export const REPOSITORY_WITH_URL_AND_REVIEWS = gql`
  ${CORE_REPOSITORY_FIELDS}
  ${CORE_REVIEW_FIELDS}
  ${CORE_PAGE_INFO_FIELDS}
  query getRepositoryWithUrl($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
      reviews(
        first: $first
        after: $after
      ) {
        totalCount
        edges {
          node {
            ...CoreReviewFields
          }
          cursor
        }
        pageInfo {
          ...CorePageInfoFields
        }
      }
    }
  }
`
