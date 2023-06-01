import React from 'react'
import { TextInputProps } from 'react-native'
import * as S from './TextInputComp.style'
export interface TextInputCompProp extends TextInputProps {
  labelText: string
  validate: string
  onChangeText: (text: string) => void
  fullWidth?: boolean
  onEndEditing?: () => void
}
const TextInputComp = ({
  labelText,
  validate,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  fullWidth,
  onEndEditing,
}: TextInputCompProp) => {
  return (
    <S.InputWrapper>
      <S.Label>
        <S.InputLabel>{labelText}</S.InputLabel>
        {validate && <S.InputLabel> {validate}</S.InputLabel>}
      </S.Label>
      <S.Input
        aria-label={labelText}
        placeholder={placeholder}
        placeholderTextColor="#A0A5BA"
        onChangeText={onChangeText}
        validate={validate}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        fullWidth={fullWidth}
        onEndEditing={onEndEditing}
      />
    </S.InputWrapper>
  )
}

export default TextInputComp
