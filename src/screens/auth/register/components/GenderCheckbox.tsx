import CheckBox from '@react-native-community/checkbox'
import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import * as S from '../components/TextInputComp.style'
import theme from '@/common/style/theme'
interface GenderCheckboxProp {
  selectedGender: {
    value: string
    error: string
  }
  setGender: (val: string) => void
}
const GenderCheckbox = ({ selectedGender, setGender }: GenderCheckboxProp) => {
  const handleGenderSelection = (gender: string) => {
    setGender(gender)
  }
  return (
    <S.Label>
      <LabelContainer>
        <S.InputLabel>성별</S.InputLabel>
      </LabelContainer>
      <Container>
        <Container>
          <CheckBox
            value={selectedGender.value === 'male'}
            onValueChange={() => handleGenderSelection('male')}
            tintColors={{ true: `${theme.colors.primary}` }}
          />
          <Text>남자</Text>
        </Container>
        <Container>
          <CheckBox
            value={selectedGender.value === 'female'}
            onValueChange={() => handleGenderSelection('female')}
            tintColors={{ true: `${theme.colors.primary}` }}
          />
          <Text>여자</Text>
        </Container>
      </Container>
    </S.Label>
  )
}

export default GenderCheckbox
const LabelContainer = styled(S.Label)`
  flex: 1;
  justify-content: flex-start;
`
const Container = styled(S.Label)`
  flex: 2;
  justify-content: flex-start;
`
