import { gql } from '@apollo/client'

import { CORE_REVIEW_FIELDS } from './fragments'

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
