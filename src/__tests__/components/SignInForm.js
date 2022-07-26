import { SignInContainer } from '../../components/SignIn'
import { render, fireEvent, waitFor } from '@testing-library/react-native';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      // Luodaan onSubmit -jäljitelmäfunktio ja renderöidään ruudulle
      // <SignInContainer /> -komponentti, jolle välitetään jäljitelmäfunktio.
      // Hyödynnetään getByPlaceholderText- ja getByText -kyselyitä.
      const onSubmit = jest.fn()
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      )
      
      // Haetaan käyttäjätunnuksen syöttökenttä placeholder-tekstin
      // avulla ja kirjoitetaan siihen fireEvent-metodin avulla 'matti'.
      fireEvent.changeText(
        getByPlaceholderText('Username'), 'matti'
      )
      // Haetaan myös salasanan syöttökenttä placeholder-tekstin
      // avulla ja kirjoitetaan siihen fireEvent-metodin avulla 'password'.
      fireEvent.changeText(
        getByPlaceholderText('Password'), 'password'
      )
      // Painetaan fireEvent-metodin avulla sisäänkirjautumispainiketta,
      // joka on haettu siinä olevan tekstin avulla.
      fireEvent.press(getByText('Sign in'))
      
      // Odotetaan hetki waitFor -apufunktion avulla.
      await waitFor(() => {
        // Tänä aikana varmistutaan siitä, että
        // onSubmit-jäljitelmäfunktiota on kutsuttu tasan kerran.
        expect(onSubmit).toHaveBeenCalledTimes(1)

        // Varmistutaan lisäksi, että kyseinen funktio on saanut
        // ensimmäisessä parametrissaan lomakkeeseen kirjoitetut tiedot.
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'matti',
          password: 'password',
        })
      })
    })
  })
})
