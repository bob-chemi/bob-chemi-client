import { Text } from 'react-native'
import * as S from './SocialScreen.style'
import WeekDayPicker from './WeekDayPicker'

const SocialScreen = () => {
  return (
    <S.Container>
      <S.WeekContainer>
        <WeekDayPicker></WeekDayPicker>
      </S.WeekContainer>
    </S.Container>
  )
}

export default SocialScreen
