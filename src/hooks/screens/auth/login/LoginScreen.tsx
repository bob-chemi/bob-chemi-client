import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as S from '../Auth.style'
import TextInputComp from '../register/components/TextInputComp'
import { authRequest } from '@/api/authRequest'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { Nav } from '@/types/nav'
import { idValidator, passwordValidator } from '@/utils/validator'

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList, 'Home'>
>

const LoginScreen = () => {
  const [id, setId] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { navigate } = useNavigation<Nav>()
  const navigation = useNavigation<NavigationProp>()
  const { userLogin } = authRequest
  const loginOnPressed = async () => {
    const idError = idValidator(id.value)
    const passwordError = passwordValidator(password.value)
    if (idError || passwordError) {
      setId({ ...id, error: idError })
      setPassword({ ...password, error: passwordError })
      return
    } else {
      const userData = {
        id: id.value,
        password: password.value,
      }
      const response = await userLogin(userData)
    }
  }

  // 개발 중 로그인 버튼 클릭시 홈으로 이동
  // FIXME: 로그인 기능 구현 후 로그인 성공시 홈으로 이동으로 수정
  const tempGoToHome = () => {
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
      <FlexDirectionWrapper mt={24} mb={24} flexDirection="row" justifyContent="space-between">
        <Text>아이디 기억하기</Text>
        <Text>비밀번호를 잊으셨나요?</Text>
      </FlexDirectionWrapper>
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
      <FlexDirectionWrapper justifyContent="center" mt={100} mb={100} alignItems="center">
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('RegisterScreen')}>
          <CustomText variant="gray500">아직 회원이 아니신가요? &nbsp;&nbsp;</CustomText>
          <CustomText fontWeight={600} variant="primary">
            회원가입
          </CustomText>
        </TouchableOpacity>
      </FlexDirectionWrapper>
    </S.ScrollView>
  )
}

export default LoginScreen
