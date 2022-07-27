import { Picker } from '@react-native-picker/picker'

const SelectOrder = ({ selectedPrinciple, setSelectedPrinciple }) => {
  return (
    <Picker
      selectedValue={selectedPrinciple}
      onValueChange={(itemValue) => setSelectedPrinciple(itemValue)}
      style={{
        marginHorizontal: 10,
        color: 'black',
      }}
    >
      <Picker.Item
        label='Select one of the following...'
        enabled={false}
        style={{ color: 'gray', }}
      />
      <Picker.Item
        label='Latest repositories'
        value='latestRepositories'
        style={{ color: 'black', }}
      />
      <Picker.Item
        label='Highest rated repositories'
        value='HighestRatedRepositories'
        style={{ color: 'black', }}
      />
      <Picker.Item
        label='Lowest rated repositories'
        value='LowestRatedRepositories'
        style={{ color: 'black', }}
      />
    </Picker>
  )
}

export default SelectOrder
