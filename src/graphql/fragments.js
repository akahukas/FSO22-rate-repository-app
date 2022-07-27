import { gql } from '@apollo/client'

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
  }
`

export const CORE_REVIEW_FIELDS = gql`
  fragment CoreReviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`
