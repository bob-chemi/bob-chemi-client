import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity } from 'react-native'
import * as S from './LoginScreen.style'
import CustomButton from '@/common/components/CustomButton'
import { Nav } from '@/types/nav'
import { emailValidator, passwordValidator } from '@/utils/validator'

const LoginScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { navigate } = useNavigation<Nav>()
  const navigation = useNavigation()

  const loginOnPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
  }

  // 개발 중 로그인 버튼 클릭시 홈으로 이동
  // FIXME: 로그인 기능 구현 후 로그인 성공시 홈으로 이동으로 수정
  const tempGoToHome = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    navigation.navigate('Tab', { screen: 'Home' })
  }

  return (
    <S.Container>
      <S.MainTextWrapper>
        <S.MainText>Login</S.MainText>
      </S.MainTextWrapper>
      <S.TextInputForm behavior="padding" enabled>
        <S.InputWrapper>
          <S.LabelWrapper>
            <S.InputLabel validation={false}>EMAIl</S.InputLabel>
            <S.InputLabel validation>{email.error && email.error}</S.InputLabel>
          </S.LabelWrapper>
          <S.LoginInput
            aria-label="loginInput"
            placeholder="example@mail.com"
            placeholderTextColor="#A0A5BA"
            onChangeText={mail => setEmail({ value: mail, error: '' })}
            underlineColorAndroid="transparent"
            validate={email.error}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.LabelWrapper>
            <S.InputLabel validation={false}>PASSWORD</S.InputLabel>
            <S.InputLabel validation>{password.error && password.error}</S.InputLabel>
          </S.LabelWrapper>
          <S.LoginInput
            aria-label="password"
            placeholder="* * * * * * *"
            secureTextEntry
            placeholderTextColor="#A0A5BA"
            onChangeText={pw => setPassword({ value: pw, error: '' })}
            validate={password.error}
            autoCapitalize="none"
            keyboardType="visible-password"
          ></S.LoginInput>
        </S.InputWrapper>
        <S.SaveIdLine>
          <Text>아이디 기억하기</Text>
          <Text>비밀번호를 잊으셨나요?</Text>
        </S.SaveIdLine>
        <TouchableOpacity onPress={loginOnPressed}>
          <CustomButton variant="primary" color="white">
            로그인하기
          </CustomButton>
        </TouchableOpacity>
        {/* 개발 중 홈화면으로 가기 위한 버튼  */}
        <Pressable onPress={tempGoToHome}>
          <CustomButton variant="primary">홈으로 가기(개발중)</CustomButton>
        </Pressable>

        <S.JoinIdLine>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('RegisterScreen')}>
            <Text>아직 회원이 아니신가요? &nbsp;&nbsp;</Text>
            <S.ColorText>회원가입</S.ColorText>
          </TouchableOpacity>
        </S.JoinIdLine>
      </S.TextInputForm>
    </S.Container>
  )
}

export default LoginScreen
