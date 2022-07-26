import { useMutation, useApolloClient } from '@apollo/client'

import { AUTHENTICATE } from '../graphql/mutations'

import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password
        }
      }
    })
    if (response.data) {
      await authStorage.setAccessToken(response.data.authenticate.accessToken)
    }
    apolloClient.resetStore()

    return response
  }
  return [signIn, result]
}

export default useSignIn
