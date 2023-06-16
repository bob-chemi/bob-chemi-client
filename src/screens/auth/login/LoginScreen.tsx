import CheckBox from '@react-native-community/checkbox'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState, useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as S from '../Auth.style'
import TextInputComp from '../register/components/TextInputComp'
import { authRequest } from '@/api/authRequest'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { idValidator, passwordValidator } from '@/utils/validator'
export const REMEMBER_ID_KEY = '@remember_id'
type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList, 'Home'>
>

const LoginScreen = () => {
  const [id, setId] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [rememberID, setRememberID] = useState(false)
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
        email: id.value,
        password: password.value,
      }
      const loginSuccessResponse = await userLogin(userData)

      if (rememberID) {
        const newRememberID = { rememberID, userID: id.value }
        await setStorage(newRememberID, REMEMBER_ID_KEY)
      } else {
        await removeStorage(REMEMBER_ID_KEY)
      }

      // 로그인 완료시 홈으로
      if (loginSuccessResponse) {
        navigation.navigate('Tab', { screen: 'Home' })
      }
    }
  }
  const handleRememberID = () => {
    setRememberID(prev => !prev)
  }
  const getData = useCallback(async () => {
    const storageData = await getStorage(REMEMBER_ID_KEY)
    if (storageData && storageData.rememberID) {
      setId({ value: storageData.userID, error: '' })
      setRememberID(storageData.rememberID)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [])

  // 개발 중 로그인 버튼 클릭시 홈으로 이동
  // FIXME: 로그인 기능 구현 후 로그인 성공시 홈으로 이동으로 수정
  const tempGoToHome = () => {
    // FIXME: 매칭 개발 이후 Home으로 수정
    navigation.navigate('Tab', { screen: 'Matching' })
  }

  return (
    <S.ScrollView>
      <S.TextInputForm>
        <TextInputComp
          value={id.value}
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
      <FlexDirectionWrapper mt={24} mb={24} flexDirection="row" justifyContent="space-between" alignItems="center">
        <FlexDirectionWrapper flexDirection="row" alignItems="center">
          <CheckBox
            value={rememberID === true}
            onValueChange={() => handleRememberID()}
            tintColors={{ true: `${theme.colors.primary}` }}
          />
          <Text style={{ marginBottom: 5 }}>아이디 기억하기</Text>
        </FlexDirectionWrapper>
        <Text style={{ marginBottom: 5 }}>비밀번호를 잊으셨나요?</Text>
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
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('RegisterScreen')}>
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
