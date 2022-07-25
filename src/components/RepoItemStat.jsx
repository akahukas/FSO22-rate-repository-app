import { View } from 'react-native'
import Text from './Text'

const RepoItemStat = ({ style, number, text }) => {
  if (number >= 1000) {
    number = `${(number/1000).toFixed(1)}k`
  }

  return (
    <View style={style} >
      <Text fontWeight='bold'>
        {number}
      </Text>
      <Text color='textSecondary' >
        {text}
      </Text>
    </View>
  )
}

export default RepoItemStat
