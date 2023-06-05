import { useState } from 'react'
import { authRequest } from '@/api/authRequest'
import { calculateAge } from '@/utils/calculateAge'
import { idValidator, passwordValidator, confirmPwValidator, phoneNumberValidator } from '@/utils/validator'
const { userSMS, userVerificationCode, userSignUp } = authRequest
const useRegisterInput = () => {
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

  const { id, password, confirmPassword, phoneNumber, verification } = formData
  const idError = idValidator(id.value)
  const passwordError = passwordValidator(password.value)
  const confirmError = confirmPwValidator(password.value, confirmPassword.value)
  const phoneNumberError = phoneNumberValidator(phoneNumber.value)

  const signUpFieldEndEditing = () => {
    if (idError || passwordError || confirmError || phoneNumberError) {
      setFormData({
        ...formData,
        id: { ...id, error: idError },
        password: { ...password, error: passwordError },
        confirmPassword: { ...confirmPassword, error: confirmError },
        phoneNumber: { ...phoneNumber, error: phoneNumberError },
      })

      return
    }
    const hasErrors = Object.values(formData).some(field => field.error)
    setSignUpButton(prev => ({ ...prev, formValidate: hasErrors }))
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
    const responseCode = await userSMS(phoneNumber.value)
    if (responseCode) {
      setPhoneAuthButtonVisible(false)
    }
  }

  const smsVerificatinOnPressed = async () => {
    if (!verification.value) {
      return
    }
    const isCodeValid = await userVerificationCode(phoneNumber.value, verification.value)

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
      id: formData.id.value,
      password: formData.password.value,
      phone: formData.phoneNumber.value,
      name: '',
      nickname: formData.nickname.value,
      gender: formData.gender.value as 'Male' | 'Female',
      age: calculateAge(birthDay.year, birthDay.month, birthDay.day),
    }
    const response = await userSignUp(userData)
  }
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
  }
}

export default useRegisterInput
