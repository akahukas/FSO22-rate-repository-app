import { View } from 'react-native'
import RepoItemStat from './RepoItemStat'

const RepoItemStats = ({ mainStyle, statStyle, starCount, forkCount, reviewCount, rating }) => {
  return (
    <View style={mainStyle} >
      <RepoItemStat
        style={statStyle}
        number={starCount}
        text='Stars'
      />
      <RepoItemStat
        style={statStyle}
        number={forkCount}
        text='Forks'
      />
      <RepoItemStat
        style={statStyle}
        number={reviewCount}
        text='Reviews'
      />
      <RepoItemStat
        style={statStyle}
        number={rating}
        text='Rating'
      />
    </View>
  )
}

export default RepoItemStats
