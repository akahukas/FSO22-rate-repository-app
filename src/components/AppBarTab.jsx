import { Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const AppBarTab = ({ handlePress, tabText, path, style }) => {
  return (
    <Pressable onPress={handlePress} style={style} >
      <Link to={path}>
        <Text color='textWhite' fontWeight='bold' fontSize='subheading'>
          {tabText}
        </Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
