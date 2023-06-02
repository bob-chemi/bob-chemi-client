import React from 'react'
import { TextInputProps } from 'react-native'
import * as S from './TextInputComp.style'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'

interface TextInputCompProp extends TextInputProps {
  labelText?: string
  validate: string
  onChangeText: (text: string) => void
  halfButtonText?: string
  onPress: () => void
  disabled?: boolean
  margin?: boolean
  onEndEditing?: () => void
}

const PhoneAuthInput = ({
  labelText,
  validate,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  halfButtonText,
  onPress,
  disabled,
  margin,
  onEndEditing,
}: TextInputCompProp) => {
  console.log(typeof halfButtonText)
  return (
    <S.InputWrapper>
      {margin ? (
        <S.Label>
          <S.InputLabel>{labelText}</S.InputLabel>
          <S.InputLabel>{validate && validate}</S.InputLabel>
        </S.Label>
      ) : null}

      <S.SeprateInput>
        <S.Input
          aria-label={labelText}
          placeholder={placeholder}
          placeholderTextColor="#A0A5BA"
          onChangeText={onChangeText}
          validate={validate}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onEndEditing={onEndEditing}
        />
        <CustomButton variant="primary" width={100} onPress={onPress} disabled={disabled}>
          <CustomText variant="white"> {halfButtonText || ''}</CustomText>
        </CustomButton>
      </S.SeprateInput>
    </S.InputWrapper>
  )
}

export default PhoneAuthInput
