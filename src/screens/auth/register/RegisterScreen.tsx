import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as S from '../Auth.style'
import { Dropdown } from './components/Dropdown'
import GenderCheckbox from './components/GenderCheckbox'
import PhoneAuthInput from './components/PhoneAuthInput'
import TextInputComp from './components/TextInputComp'
import useRegisterInput from './hooks/useRegisterInput'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import { Nav } from '@/types/nav'

const RegisterScreen = () => {
  const {
    formData,
    setBirthDay,
    phoneAuthButtonVisible,
    signUpButton,
    signUpFieldEndEditing,
    phoneAuthOnPressed,
    handleOnChangeText,
  } = useRegisterInput()

  const { navigate } = useNavigation<Nav>()

  return (
    <S.ScrollView>
      <S.TextInputForm>
        <TextInputComp
          labelText="아이디"
          validate={formData.id.error}
          placeholder="5~20글자를 입력해주세요"
          onChangeText={mail => handleOnChangeText(mail, 'id')}
          keyboardType="email-address"
          fullWidth
          onEndEditing={() => signUpFieldEndEditing()}
        />
        <TextInputComp
          labelText="비밀번호"
          validate={formData.password.error}
          placeholder="6~16글자를 입력해주세요"
          onChangeText={password => handleOnChangeText(password, 'password')}
          secureTextEntry
          fullWidth
          onEndEditing={() => signUpFieldEndEditing()}
        />
        <TextInputComp
          labelText="비밀번호 확인"
          validate={formData.confirmPassword.error}
          placeholder="6~16글자를 입력해주세요"
          onChangeText={confirmPassword => handleOnChangeText(confirmPassword, 'confirmPassword')}
          secureTextEntry
          fullWidth
          onEndEditing={() => signUpFieldEndEditing()}
        />
        <TextInputComp
          labelText="닉네임"
          validate={formData.nickname.error}
          placeholder="닉네임"
          onChangeText={nickname => handleOnChangeText(nickname, 'nickname')}
          fullWidth
        />
        <PhoneAuthInput
          labelText="휴대전화 번호"
          validate={formData.phoneNumber.error}
          placeholder="01012345678"
          onChangeText={phoneNumber => handleOnChangeText(phoneNumber, 'phoneNumber')}
          keyboardType="number-pad"
          halfButtonText={phoneAuthButtonVisible ? '인증번호 발송' : '다시 보내기'}
          onPress={phoneAuthOnPressed}
          onEndEditing={() => signUpFieldEndEditing()}
          margin
        />
        <PhoneAuthInput
          validate={formData.verification.error}
          placeholder="1234"
          onChangeText={verification => handleOnChangeText(verification, 'verification')}
          keyboardType="number-pad"
          halfButtonText="인증하기"
          onPress={phoneAuthOnPressed}
          disabled={phoneAuthButtonVisible}
        />
      </S.TextInputForm>
      <S.ButtonWrapper>
        <Dropdown setValue={setBirthDay} />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <GenderCheckbox selectedGender={formData.gender} setGender={gender => handleOnChangeText(gender, 'gender')} />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <CustomButton
          disabled={signUpButton.formValidate || signUpButton.verification}
          variant="primary"
          fullWidth
          borderRadius={20}
        >
          <CustomText variant="white" fontSize={16} fontWeight={600}>
            회원가입
          </CustomText>
        </CustomButton>
      </S.ButtonWrapper>
      <S.JoinIdLine>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('LoginScreen')}>
          <Text>이미 회원이신가요? &nbsp;&nbsp;</Text>
          <S.ColorText>로그인하러 가기</S.ColorText>
        </TouchableOpacity>
      </S.JoinIdLine>
    </S.ScrollView>
  )
}

export default RegisterScreen
