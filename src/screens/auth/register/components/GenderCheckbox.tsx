import CheckBox from '@react-native-community/checkbox'
import React from 'react'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
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
    <FlexDirectionWrapper alignItems="center" flex={1}>
      <FlexDirectionWrapper flex={1}>
        <CustomText variant="primary">성별</CustomText>
      </FlexDirectionWrapper>
      <FlexDirectionWrapper flex={2}>
        <FlexDirectionWrapper flex={1} alignItems="center">
          <CheckBox
            value={selectedGender.value === 'Male'}
            onValueChange={() => handleGenderSelection('Male')}
            tintColors={{ true: `${theme.colors.primary}` }}
          />
          <CustomText variant="gray500">남자</CustomText>
        </FlexDirectionWrapper>
        <FlexDirectionWrapper flex={1} alignItems="center">
          <CheckBox
            value={selectedGender.value === 'Female'}
            onValueChange={() => handleGenderSelection('Female')}
            tintColors={{ true: `${theme.colors.primary}` }}
          />
          <CustomText variant="gray500">여자</CustomText>
        </FlexDirectionWrapper>
      </FlexDirectionWrapper>
    </FlexDirectionWrapper>
  )
}

export default GenderCheckbox
