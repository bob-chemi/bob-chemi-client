import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import * as S from './TextInputComp.style'
export interface TextInputCompProp extends TextInputProps {
  labelText: string
  validate: string
  onChangeText: (text: string) => void
  fullWidth?: boolean
  onEndEditing?: () => void
  value?: string
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
  value,
}: TextInputCompProp) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
        secureTextEntry={secureTextEntry && !showPassword}
        fullWidth={fullWidth}
        onEndEditing={onEndEditing}
        value={value && value}
      />
      {secureTextEntry && (
        <S.TogglePasswordButton onPress={toggleShowPassword}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={25} />
        </S.TogglePasswordButton>
      )}
    </S.InputWrapper>
  )
}

export default TextInputComp
