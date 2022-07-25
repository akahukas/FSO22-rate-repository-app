import { Image, View } from 'react-native'
import Text from './Text'

const RepoItemInfo = ({ mainStyle, avatarStyle, textStyle, imgSource, name, description }) => {
  if (description.length >= 40) {
    return (
      <View style={mainStyle} >
        <Image
          style={avatarStyle}
          source={{uri: `${imgSource}`}}
        />
        <View
          style={textStyle}>
            <Text fontSize='subheading' fontWeight='bold' >
              {name}
            </Text>
            <Text color='textSecondary' >
              {description}
            </Text>
          </View>
      </View>
    )
  }
  
  return (
    <View style={mainStyle} >
      <Image
        style={avatarStyle}
        source={{uri: `${imgSource}`}}
      />
      <View
        style={{...textStyle, flexDirection: 'column'}}>
          <Text fontSize='subheading' fontWeight='bold' >
            {name}
          </Text>
          <Text color='textSecondary' >
            {description}
          </Text>
        </View>
    </View>
  )
}

export default RepoItemInfo
