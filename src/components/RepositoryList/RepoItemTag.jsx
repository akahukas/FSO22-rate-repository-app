import { View } from 'react-native'
import Text from '../Text'

const RepoItemTag = ({ textTag, mainStyle, tagStyle }) => {
  return (
    <View style={mainStyle} testID='repoItemTag' >
      <View style={tagStyle}>
        <Text color='textWhite' >
          {textTag}
        </Text>
      </View>
    </View>
  )
}

export default RepoItemTag
