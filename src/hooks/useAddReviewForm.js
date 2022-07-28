import { useMutation } from '@apollo/client'

import { ADD_REVIEW } from '../graphql/mutations'

const useAddReviewForm = () => {
  // Tallennetaan mutaatio ja vastaus muuttujiin.
  const [mutate, result] = useMutation(ADD_REVIEW)

  // Funktio, joka vastaa mutaation suorittamisesta.
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
  // Palautetaan mutaation suoritusfunktio ja vastaus.
  return [addReview, result]
}

export default useAddReviewForm
