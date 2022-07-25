import { Pressable } from 'react-native'
import Text from './Text'

const AppBarTab = ({ handlePress, tabText, style }) => {
  return (
    <Pressable onPress={handlePress} style={style} >
      <Text color='textWhite' fontWeight='bold' fontSize='subheading'>
        {tabText}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
