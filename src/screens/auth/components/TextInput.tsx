import React from 'react'
import { TextInputProps } from 'react-native'
import * as S from '../Auth.style'
interface TextInputProp extends TextInputProps {
  labelText: string
  validate: string
  onChangeText: (text: string) => void
}
const TextInputComp = ({
  labelText,
  validate,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
}: TextInputProp) => {
  return (
    <S.InputWrapper>
      <S.Label>
        <S.InputLabel>{labelText}</S.InputLabel>
        <S.InputLabel>{validate && validate}</S.InputLabel>
      </S.Label>
      <S.LoginInput
        aria-label={labelText}
        placeholder={placeholder}
        placeholderTextColor="#A0A5BA"
        onChangeText={onChangeText}
        validate={validate}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </S.InputWrapper>
  )
}

export default TextInputComp
