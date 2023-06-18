const idValidator = (id: string) => {
  if (!id) return '아이디를 입력해주세요.'
  if (id.length < 5 || id.length > 20) return '5~20글자를 입력해주세요'
  return ''
}
const passwordValidator = (password: string) => {
  if (!password) return '비밀번호를 입력해주세요.'
  if (password.length < 6 || password.length > 16) return '6~16글자를 입력해주세요'
  return ''
}
const confirmPwValidator = (password: string, confirm: string) => {
  if (!confirm) return '비밀번호를 입력해주세요.'
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
const nickNameValidator = (nickname: string) => {
  if (!nickname) return '닉네임을 입력해주세요.'
  return ''
}
const genderValidator = (gender: string) => {
  if (!gender) return '성별을 선택해주세요.'
  return ''
}
const birthDayValidator = (date: { year: number; month: number; day: number }) => {
  for (const x of Object.values(date)) {
    if (x === 0) {
      return '생년월일을 선택해주세요'
    }
  }
  return ''
}
export {
  idValidator,
  passwordValidator,
  confirmPwValidator,
  phoneNumberValidator,
  nickNameValidator,
  genderValidator,
  birthDayValidator,
}
