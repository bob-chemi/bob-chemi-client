import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as S from '../Auth.style'
import TextInputComp from '../register/components/TextInputComp'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import { Nav } from '@/types/nav'
import { idValidator, passwordValidator } from '@/utils/validator'

const LoginScreen = () => {
  const [id, setId] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { navigate } = useNavigation<Nav>()
  const navigation = useNavigation()

  const loginOnPressed = () => {
    const idError = idValidator(id.value)
    const passwordError = passwordValidator(password.value)
    if (idError || passwordError) {
      setId({ ...id, error: idError })
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
    <S.ScrollView>
      <S.TextInputForm>
        <TextInputComp
          labelText="아이디"
          validate={id.error}
          placeholder="example"
          onChangeText={mail => setId({ value: mail, error: '' })}
          keyboardType="email-address"
          fullWidth
        />
        <TextInputComp
          labelText="비밀번호"
          validate={password.error}
          placeholder="* * * * * * *"
          onChangeText={password => setPassword({ value: password, error: '' })}
          secureTextEntry
          fullWidth
        />
      </S.TextInputForm>
      <S.SaveIdLine>
        <Text>아이디 기억하기</Text>
        <Text>비밀번호를 잊으셨나요?</Text>
      </S.SaveIdLine>
      <S.ButtonWrapper>
        <CustomButton variant="primary" fullWidth onPress={loginOnPressed} borderRadius={20}>
          <CustomText variant="white" fontSize={16} fontWeight={600}>
            로그인하기
          </CustomText>
        </CustomButton>
      </S.ButtonWrapper>
      {/* 개발 중 홈화면으로 가기 위한 버튼  */}
      <S.ButtonWrapper>
        <CustomButton variant="primary" fullWidth onPress={tempGoToHome} borderRadius={20}>
          <CustomText variant="white"> 홈으로 가기(개발중)</CustomText>
        </CustomButton>
      </S.ButtonWrapper>
      <S.JoinIdLine>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('RegisterScreen')}>
          <Text>아직 회원이 아니신가요? &nbsp;&nbsp;</Text>
          <S.ColorText>회원가입</S.ColorText>
        </TouchableOpacity>
      </S.JoinIdLine>
    </S.ScrollView>
  )
}

export default LoginScreen
