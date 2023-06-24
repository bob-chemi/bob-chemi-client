import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { authRequest } from '@/api/authRequest'
import { calculateAge } from '@/utils/calculateAge'
import {
  idValidator,
  passwordValidator,
  confirmPwValidator,
  phoneNumberValidator,
  nickNameValidator,
  genderValidator,
  birthDayValidator,
} from '@/utils/validator'
const { userSMS, userVerificationCode, userSignUp } = authRequest
const useRegisterInput = () => {
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    id: { value: '', error: '' },
    password: { value: '', error: '' },
    confirmPassword: { value: '', error: '' },
    nickname: { value: '', error: '' },
    phoneNumber: { value: '', error: '' },
    verification: { value: '', error: '' },
    gender: { value: '', error: '' },
  })
  const [birthDay, setBirthDay] = useState({ year: 0, month: 0, day: 0 })
  const [phoneAuthButtonVisible, setPhoneAuthButtonVisible] = useState(true)
  const [signUpButton, setSignUpButton] = useState({ formValidate: true, verification: true })

  const { id, password, confirmPassword, phoneNumber, nickname, verification, gender } = formData

  const idError = idValidator(id.value)
  const passwordError = passwordValidator(password.value)
  const confirmError = confirmPwValidator(password.value, confirmPassword.value)
  const phoneNumberError = phoneNumberValidator(phoneNumber.value)
  const nickNameError = nickNameValidator(nickname.value)
  const genderError = genderValidator(gender.value)
  const birthDayError = birthDayValidator(birthDay)

  const signUpFieldEndEditing = () => {
    if (idError || passwordError || confirmError || phoneNumberError || nickNameError || genderError || birthDayError) {
      setFormData({
        ...formData,
        id: { ...id, error: idError },
        password: { ...password, error: passwordError },
        confirmPassword: { ...confirmPassword, error: confirmError },
        phoneNumber: { ...phoneNumber, error: phoneNumberError },
        nickname: { ...nickname, error: nickNameError },
        gender: { ...gender, error: genderError },
      })
    }
  }

  const phoneAuthOnPressed = async () => {
    if (phoneNumberError) {
      setFormData({
        ...formData,
        phoneNumber: { ...phoneNumber, error: phoneNumberError },
      })
      setPhoneAuthButtonVisible(true)
      return
    }
    const responseSMSCode = await userSMS(phoneNumber.value)
    if (responseSMSCode.code === 200) {
      setPhoneAuthButtonVisible(false)
    }
  }

  const smsVerificatinOnPressed = async () => {
    if (!verification.value) {
      return
    }
    const isCodeValid = await userVerificationCode(phoneNumber.value, verification.value)
    console.log(isCodeValid)
    if (isCodeValid) {
      setSignUpButton(prev => ({ ...prev, verification: false }))
    } else {
      setSignUpButton(prev => ({ ...prev, verification: true }))
    }
  }

  const handleOnChangeText = (inputText: string, field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: { value: inputText, error: '' } })
  }
  const requestSignupOnPress = async () => {
    const userData = {
      email: formData.id.value,
      password: formData.password.value,
      phone: formData.phoneNumber.value,
      name: formData.nickname.value,
      nickname: '',
      gender: formData.gender.value as 'Male' | 'Female',
      age: calculateAge(birthDay.year, birthDay.month, birthDay.day),
    }

    const response = await userSignUp(userData)
    if (response) {
      console.log('회원가입 성공')
      console.log(response)
      navigation.goBack()
    } else {
      console.log('회원가입 실패')
    }
  }

  useEffect(() => {
    const hasErrors = Object.values(formData).some(field => field.error)
    setSignUpButton(prev => ({ ...prev, formValidate: hasErrors }))
  }, [formData])

  return {
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
  }
}

export default useRegisterInput
