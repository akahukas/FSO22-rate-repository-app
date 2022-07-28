import { useMutation } from '@apollo/client'

import { ADD_USER } from '../graphql/mutations'

const useSignUp = () => {
  // Tallennetaan mutaatio ja vastaus muuttujiin.
  const [mutate, result] = useMutation(ADD_USER)

  // Funktio, joka vastaa mutaation suorittamisesta.
  const signUp = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        user: {
          username,
          password
        }
      }
    })
    return response
  }
  // Palautetaan mutaation suoritusfunktio ja vastaus.
  return [signUp, result]
}

export default useSignUp
