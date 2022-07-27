import { gql } from '@apollo/client'

import { CORE_REPOSITORY_FIELDS } from './fragments'

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query {
    repositories {
      edges {
        node {
          ...CoreRepositoryFields
        }
      }
    }
  }
`

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const REPOSITORY_WITH_URL = gql`
  ${CORE_REPOSITORY_FIELDS}
  query getRepositoryWithUrl($id: ID!) {
    repository(id: $id) {
      ...CoreRepositoryFields
      url
    }
  }
`
