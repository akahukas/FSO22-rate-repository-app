import { Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const AppBarTab = ({ hasLink, handlePress, tabText, path, style }) => {
  return (
    <Pressable onPress={handlePress} style={style} >
      { hasLink
        ? (
          <Link to={path}>
            <Text color='textWhite' fontWeight='bold' fontSize='subheading'>
              {tabText}
            </Text>
          </Link>
        )
        : (
          <Text color='textWhite' fontWeight='bold' fontSize='subheading'>
            {tabText}
          </Text>
        )
      }
    </Pressable>
  )
}

export default AppBarTab
