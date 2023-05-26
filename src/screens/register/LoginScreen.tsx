import React, { useState, useEffect } from 'react'
import { NativeSyntheticEvent, Text, TextInputChangeEventData, TouchableOpacity } from 'react-native'
import * as S from './LoginScreen.style'
import ButtonStyle from '@/common/components/ButtonStyle'

const LoginScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  useEffect(() => {
    console.log(email)
  }, [email])
  const onLoginPressed = () => {}
  return (
    <S.Container>
      <S.MainTextWrapper>
        <S.MainText>Login</S.MainText>
      </S.MainTextWrapper>
      <S.TextInputForm behavior="padding" enabled>
        <S.InputWrapper>
          <S.InputLabel>EMAIl</S.InputLabel>
          <S.LoginInput
            placeholder="example@mail.com"
            placeholderTextColor="#A0A5BA"
            onChangeText={mail => setEmail({ value: mail, error: '' })}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.InputLabel>PASSWORD</S.InputLabel>
          <S.LoginInput
            placeholder="* * * * * * *"
            secureTextEntry
            placeholderTextColor="#A0A5BA"
            onChangeText={pw => setPassword({ value: pw, error: '' })}
          />
        </S.InputWrapper>
        <S.SaveIdLine>
          <Text>아이디 기억하기</Text>
          <Text>비밀번호를 잊으셨나요?</Text>
        </S.SaveIdLine>
        <TouchableOpacity onPress={onLoginPressed}>
          <ButtonStyle>로그인하기</ButtonStyle>
        </TouchableOpacity>
        <S.JoinIdLine>
          <Text>아직 회원이 아니신가요? &nbsp;&nbsp;</Text>
          <S.ColorText>회원가입</S.ColorText>
        </S.JoinIdLine>
      </S.TextInputForm>
    </S.Container>
  )
}

export default LoginScreen
