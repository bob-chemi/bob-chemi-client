import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as S from './RegisterScreen.style'
import CustomButton from '@/common/components/CustomButton'
import { Nav } from '@/types/nav'
import { emailValidator, passwordValidator, confirmPwValidator } from '@/utils/validator'

const RegisterScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const { navigate } = useNavigation<Nav>()

  const signUpOnPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmError = confirmPwValidator(password.value, confirmPassword.value)

    if (emailError || passwordError || confirmError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...confirmPassword, error: confirmError })
      return
    }
  }

  return (
    <S.Container>
      <S.MainTextWrapper>
        <S.MainText>SignUp</S.MainText>
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
            <S.InputLabel validation={false}>CREATE PASSWORD</S.InputLabel>
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
        <S.InputWrapper>
          <S.LabelWrapper>
            <S.InputLabel validation={false}>CONFIRM PASSWORD</S.InputLabel>
            <S.InputLabel validation>{confirmPassword.error && confirmPassword.error}</S.InputLabel>
          </S.LabelWrapper>
          <S.LoginInput
            aria-label="confirmpassword"
            placeholder="* * * * * * *"
            secureTextEntry
            placeholderTextColor="#A0A5BA"
            onChangeText={confirmPw => setConfirmPassword({ value: confirmPw, error: '' })}
            validate={confirmPassword.error}
            autoCapitalize="none"
            keyboardType="visible-password"
          ></S.LoginInput>
        </S.InputWrapper>
        <S.SaveIdLine></S.SaveIdLine>
        <TouchableOpacity onPress={signUpOnPressed}>
          <CustomButton>회원가입</CustomButton>
        </TouchableOpacity>

        <S.JoinIdLine>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('RegisterScreen')}>
            <Text>이미 회원이신가요? &nbsp;&nbsp;</Text>
            <S.ColorText>로그인하러 가기</S.ColorText>
          </TouchableOpacity>
        </S.JoinIdLine>
      </S.TextInputForm>
    </S.Container>
  )
}

export default RegisterScreen
