import { Searchbar } from 'react-native-paper'

const Filter = ({ filter, setFilter }) => {
  return (
    <Searchbar
      placeholder='Search repositories by name . . .'
      onChangeText={text => setFilter(text)}
      value={filter}
    />
  )
}

export default Filter