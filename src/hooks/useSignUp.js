import { useMutation } from '@apollo/client'

import { ADD_USER } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate, result] = useMutation(ADD_USER)

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
  return [signUp, result]
}

export default useSignUp
