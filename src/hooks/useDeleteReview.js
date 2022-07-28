import { useMutation } from '@apollo/client'

import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  // Tallennetaan mutaatio ja vastaus muuttujiin.
  const [mutate, result] = useMutation(DELETE_REVIEW)

  // Funktio, joka vastaa mutaation suorittamisesta.
  const deleteReview = async ({ id }) => {
    const response = await mutate({
      variables: { id }
    })
    return response
  }
  // Palautetaan mutaation suoritusfunktio ja vastaus.
  return [deleteReview, result]
}

export default useDeleteReview
