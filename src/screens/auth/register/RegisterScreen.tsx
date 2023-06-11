import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as S from '../Auth.style'
import { Dropdown } from './components/Dropdown'
import GenderCheckbox from './components/GenderCheckbox'
import PhoneAuthInput from './components/PhoneAuthInput'
import TextInputComp from './components/TextInputComp'
import useRegisterInput from './hooks/useRegisterInput'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
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
    smsVerificatinOnPressed,
    requestSignupOnPress,
    birthDayError,
  } = useRegisterInput()

  const { navigate } = useNavigation<Nav>()

  return (
    <S.ScrollView>
      <S.TextInputForm>
        <TextInputComp
          labelText="아이디"
          validate={formData.id.error}
          placeholder="5~20글자를 입력해주세요"
          onChangeText={id => handleOnChangeText(id, 'id')}
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
          onEndEditing={() => signUpFieldEndEditing()}
        />
        <PhoneAuthInput
          labelText="휴대전화 번호"
          validate={formData.phoneNumber.error}
          placeholder="숫자만 입력해주세요"
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
          onPress={smsVerificatinOnPressed}
          disabled={phoneAuthButtonVisible}
        />
      </S.TextInputForm>
      <S.ButtonWrapper>
        <Dropdown setValue={setBirthDay} validate={birthDayError} />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <GenderCheckbox
          validate={formData.gender.error}
          selectedGender={formData.gender}
          setGender={gender => handleOnChangeText(gender, 'gender')}
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <CustomButton
          disabled={signUpButton.formValidate || signUpButton.verification}
          variant="primary"
          fullWidth
          borderRadius={20}
          onPress={requestSignupOnPress}
        >
          <CustomText variant="white" fontSize={16} fontWeight={600}>
            회원가입
          </CustomText>
        </CustomButton>
      </S.ButtonWrapper>
      <FlexDirectionWrapper justifyContent="center" mt={100} mb={100} alignItems="center">
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigate('LoginScreen')}>
          <CustomText variant="gray500">이미 회원이신가요? &nbsp;&nbsp;</CustomText>
          <CustomText variant="primary" fontWeight={600}>
            로그인하러 가기
          </CustomText>
        </TouchableOpacity>
      </FlexDirectionWrapper>
    </S.ScrollView>
  )
}

export default RegisterScreen
