import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, Text, TouchableOpacity } from 'react-native'
import PhoneAuthModal from '../components/PhoneAuthModal'
import * as S from './RegisterScreen.style'
import CustomButton from '@/common/components/CustomButton'
import { Nav } from '@/types/nav'
import { emailValidator, passwordValidator, confirmPwValidator, phoneNumberValidator } from '@/utils/validator'

const RegisterScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [nickname, setNickname] = useState({ value: '', error: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' })
  const [buttonDisable, setButtonDisable] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
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
  const phoneAuthOnPressed = () => {
    const phoneNumberError = phoneNumberValidator(phoneNumber.value)
    if (phoneNumberError) {
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError })
      return
    }
    setModalVisible(true)
    console.log(phoneNumberError)
  }
  return (
    <S.Container>
      <S.ScrollView>
        <S.TextInputForm>
          <S.InputWrapper>
            <S.LabelWrapper>
              <S.InputLabel>아이디</S.InputLabel>
              <S.InputLabel validation>{email.error && email.error}</S.InputLabel>
            </S.LabelWrapper>
            <S.LoginInput
              aria-label="id"
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
              <S.InputLabel>CREATE PASSWORD</S.InputLabel>
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
              <S.InputLabel>CONFIRM PASSWORD</S.InputLabel>
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
          <S.InputWrapper>
            <S.LabelWrapper>
              <S.InputLabel>닉네임</S.InputLabel>
              <S.InputLabel validation>{confirmPassword.error && confirmPassword.error}</S.InputLabel>
            </S.LabelWrapper>
            <S.LoginInput
              aria-label="nickname"
              placeholder="닉네임"
              secureTextEntry
              placeholderTextColor="#A0A5BA"
              onChangeText={nickname => setConfirmPassword({ value: nickname, error: '' })}
              autoCapitalize="none"
              keyboardType="visible-password"
            ></S.LoginInput>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.LabelWrapper>
              <S.InputLabel>휴대전화 번호</S.InputLabel>
              <S.InputLabel validation>{phoneNumber.error && phoneNumber.error}</S.InputLabel>
            </S.LabelWrapper>
            <S.LoginInput
              aria-label="phone-number"
              placeholder="01012345678"
              secureTextEntry
              placeholderTextColor="#A0A5BA"
              onChangeText={phoneNumber => setPhoneNumber({ value: phoneNumber, error: '' })}
              validate={phoneNumber.error}
              autoCapitalize="none"
              keyboardType="visible-password"
            ></S.LoginInput>
            <Button title="인증하기" onPress={phoneAuthOnPressed}></Button>
          </S.InputWrapper>

          <S.SaveIdLine></S.SaveIdLine>
          <TouchableOpacity disabled={buttonDisable} onPress={signUpOnPressed}>
            <CustomButton disabled={buttonDisable}>회원가입</CustomButton>
          </TouchableOpacity>

          <S.JoinIdLine>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('LoginScreen')}>
              <Text>이미 회원이신가요? &nbsp;&nbsp;</Text>
              <S.ColorText>로그인하러 가기</S.ColorText>
            </TouchableOpacity>
          </S.JoinIdLine>
        </S.TextInputForm>
      </S.ScrollView>
      <PhoneAuthModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </S.Container>
  )
}

export default RegisterScreen
