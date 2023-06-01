const emailValidator = (email: string) => {
  const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  if (!email) return '아이디가 비었습니다.'
  if (!EMAIL_REGEX.test(email)) return '이메일 형식의 아이디를 입력해주세요.'
  return ''
}
const passwordValidator = (password: string) => {
  if (!password) return '비밀번호가 비었습니다.'
  if (password.length < 6 || password.length > 16) return '6~16글자를 입력해주세요'
  return ''
}
const confirmPwValidator = (password: string, confirm: string) => {
  if (!confirm) return '비밀번호가 비었습니다.'
  if (password !== confirm) return '비밀번호를 확인해주세요.'
  return ''
}
const phoneNumberValidator = (phoneNumber: string) => {
  const number = phoneNumber.trim()
  if (!number) return '휴대전화 번호를 입력해주세요'
  if (number.length < 10 || number.length > 11) return '휴대전화 번호를 올바르게 입력해주세요'
  if (number.includes('-') || number.includes('.')) return '숫자만 입력해주세요'
  return ''
}
export { emailValidator, passwordValidator, confirmPwValidator, phoneNumberValidator }
