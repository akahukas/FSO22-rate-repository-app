import { useMutation } from '@apollo/client'

import { ADD_REVIEW } from '../graphql/mutations'

const useAddReviewForm = () => {

  const [mutate, result] = useMutation(ADD_REVIEW)

  const addReview = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        }
      }
    })

    return response
  }
  return [addReview, result]
}

export default useAddReviewForm
