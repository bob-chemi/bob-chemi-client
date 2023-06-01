import React from 'react'
import { TextInputProps } from 'react-native'
import * as S from './TextInputComp.style'
import CustomButton from '@/common/components/CustomButton'
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
        <CustomButton variant="primary" color="white" width={100} onPress={onPress} disabled={disabled}>
          {halfButtonText}
        </CustomButton>
      </S.SeprateInput>
    </S.InputWrapper>
  )
}

export default PhoneAuthInput
