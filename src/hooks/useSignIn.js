import { useMutation, useApolloClient } from '@apollo/client'

import { AUTHENTICATE } from '../graphql/mutations'

import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  // Funktiot Storagen ja Apollon hallintaan.
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  // Tallennetaan mutaatio ja vastaus muuttujiin.
  const [mutate, result] = useMutation(AUTHENTICATE)

  // Funktio, joka vastaa mutaation suorittamisesta.
  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password
        }
      }
    })
    // Sisäänkirjautumisen onnistuessa
    // tallennetaan käyttäjän token Storageen.
    if (response.data) {
      await authStorage.setAccessToken(response.data.authenticate.accessToken)
    }
    // Tyhjennetään Apollon välimuisti.
    apolloClient.resetStore()

    return response
  }
  // Palautetaan mutaation suoritusfunktio ja vastaus.
  return [signIn, result]
}

export default useSignIn
