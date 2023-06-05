export const calculateAge = (year: number, month: number, day: number): number => {
  const currentDate: Date = new Date()
  const birthDate: Date = new Date(year, month - 1, day)
  let age: number = currentDate.getFullYear() - birthDate.getFullYear()

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}
