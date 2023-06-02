import { useState } from 'react'
import { request } from '@/api/request'
import { idValidator, passwordValidator, confirmPwValidator, phoneNumberValidator } from '@/utils/validator'
const { phoneVerificationAPI } = request
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

  const signUpFieldEndEditing = () => {
    const { id, password, confirmPassword, phoneNumber } = formData
    const idError = idValidator(id.value)
    const passwordError = passwordValidator(password.value)
    const confirmError = confirmPwValidator(password.value, confirmPassword.value)
    const phoneNumberError = phoneNumberValidator(phoneNumber.value)
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
    const { phoneNumber } = formData
    const phoneNumberError = phoneNumberValidator(phoneNumber.value)
    if (phoneNumberError) {
      setFormData({
        ...formData,
        phoneNumber: { ...phoneNumber, error: phoneNumberError },
      })
      setPhoneAuthButtonVisible(true)
      return
    }
    const number = await phoneVerificationAPI(phoneNumber.value)
    fetchPhoneVerification(number)
    setPhoneAuthButtonVisible(false)
  }

  const fetchPhoneVerification = (number: string | ErrorConstructor) => {
    const { verification } = formData
    if (number === verification.value) {
      setSignUpButton(prev => ({ ...prev, verification: false }))
    } else {
      setSignUpButton(prev => ({ ...prev, verification: true }))
    }
  }

  const handleOnChangeText = (inputText: string, label: keyof typeof formData) => {
    setFormData({ ...formData, [label]: { value: inputText, error: '' } })
  }

  return {
    formData,
    setBirthDay,
    phoneAuthButtonVisible,
    signUpButton,
    signUpFieldEndEditing,
    phoneAuthOnPressed,
    handleOnChangeText,
  }
}

export default useRegisterInput
