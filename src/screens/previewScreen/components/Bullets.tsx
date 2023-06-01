import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '@/common/style/theme'

interface BulletsProps {
  index: number
}
const Bullets = ({ index }: BulletsProps) => {
  return (
    <View style={style.container}>
      <View style={index === 0 ? style.primaryBullet : style.grayBullet} />
      <View style={index === 1 ? style.primaryBullet : style.grayBullet} />
    </View>
  )
}

export default Bullets

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  primaryBullet: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: `${theme.colors.primary}`,
    marginHorizontal: 5,
  },
  grayBullet: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: `${theme.colors.gray300}`,
    marginHorizontal: 5,
  },
})
