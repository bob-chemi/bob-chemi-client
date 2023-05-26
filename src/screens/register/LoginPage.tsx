import React from 'react'
import { Text } from 'react-native'
import * as S from './LoginPage.style'
import ButtonStyle from '@/common/components/ButtonStyle'

const LoginPage = () => {
  return (
    <S.Container>
      <S.MainTextWrapper>
        <S.MainText>Login</S.MainText>
      </S.MainTextWrapper>
      <S.TextInputForm behavior="padding" enabled>
        <S.InputWrapper>
          <S.InputLabel>EMAIl</S.InputLabel>
          <S.LoginInput placeholder="example@mail.com" placeholderTextColor="#A0A5BA" />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.InputLabel>PASSWORD</S.InputLabel>
          <S.LoginInput placeholder="* * * * * * *" secureTextEntry placeholderTextColor="#A0A5BA" />
        </S.InputWrapper>
        <S.SaveIdLine>
          <Text>아이디 기억하기</Text>
          <Text>비밀번호를 잊으셨나요?</Text>
        </S.SaveIdLine>
        <ButtonStyle>로그인하기</ButtonStyle>
        <S.JoinIdLine>
          <Text>아직 회원이 아니신가요? &nbsp;&nbsp;</Text>
          <S.ColorText>회원가입</S.ColorText>
        </S.JoinIdLine>
      </S.TextInputForm>
    </S.Container>
  )
}

export default LoginPage
