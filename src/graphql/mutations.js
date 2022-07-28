import { gql } from '@apollo/client'

import {
  CORE_REVIEW_FIELDS,
  CORE_USER_FIELDS
} from './fragments'

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const ADD_REVIEW = gql`
  ${CORE_REVIEW_FIELDS}
  mutation AddReview($review: CreateReviewInput) {
    createReview(review: $review) {
      ...CoreReviewFields
      repositoryId
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`

export const ADD_USER = gql`
  ${CORE_USER_FIELDS}
  mutation AddUser($user: CreateUserInput) {
    createUser(user: $user) {
      ...CoreUserFields
    }
  }
`
