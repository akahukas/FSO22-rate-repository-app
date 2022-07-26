// Kirjastot.
import React from 'react'
import Constants from 'expo-constants'

// Hookit.
import { useQuery, useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'

// Kyselyt.
import { GET_ME } from '../graphql/queries'

// Komponentit.
import { View, StyleSheet, ScrollView } from 'react-native'
import AppBarTab from './AppBarTab'

// Tyyliasetukset.
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  appBarTab: {
    padding: 15,
  }
})

const AppBar = () => {
  // Tallennetaan komponentin tilaan kirjautunut käyttäjä.
  const [loggedInUser, setLoggedInUser] = React.useState(null)

  // Hyödynnetään uloskirjautumisen yhteydessä.
  const navigate = useNavigate()

  // Muuttujat Apollon ja Storagen kontrollointiin.
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  // Tehdään GraphQL-kysely kirjautuneesta käyttäjästä.
  const result = useQuery(GET_ME)

  // Aina kyselyn datan muuttuessa, suoritetaan useEffect -hook.
  React.useEffect(() => {
    if (result.data) {
      setLoggedInUser(result.data.me)
    }
  }, [result.data])

  // Uloskirjautumisen tapahtumankäsittelijä.
  const handleSignout = async (event) => {
    event.preventDefault()
    
    // Poistetaan token Storagesta sekä
    // tyhjennetään kirjautunut käyttäjä
    // tilasta ja Apollon välimuistista.
    await authStorage.removeAccessToken()
    setLoggedInUser(null)
    apolloClient.resetStore()

    // Siirretään käyttäjä etusivulle.
    navigate('/')
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          tabText='Repositories'
          hasLink={true}
          path='/'
          handlePress={null}
          style={styles.appBarTab}
        />
        { loggedInUser && ( // Ehdollinen renderöinti.
          <AppBarTab
            tabText='Create a review'
            hasLink={true}
            path='/addreview'
            handlePress={null}
            style={styles.appBarTab}
          />
        )}
        { loggedInUser && ( // Ehdollinen renderöinti.
          <AppBarTab
            tabText='My reviews'
            hasLink={true}
            path='/user/reviews'
            handlePress={null}
            style={styles.appBarTab}
          />
        )}
        { loggedInUser !== null // Ehdollinen renderöinti.
            ? (
              <AppBarTab
                tabText='Sign out'
                hasLink={false}
                handlePress={handleSignout}
                style={styles.appBarTab}
              />
            )
            : (
              <AppBarTab
                tabText='Sign in'
                hasLink={true}
                path='/signin'
                handlePress={null}
                style={styles.appBarTab}
              />
            )
        }
        { !loggedInUser && ( // Ehdollinen renderöinti.
          <AppBarTab
            tabText='Sign up'
            hasLink={true}
            path='/signup'
            handlePress={null}
            style={styles.appBarTab}
        />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
