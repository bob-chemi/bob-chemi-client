import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '../style/theme'

interface MatchingTabBarProps {
  iconName: string
  size: number
  color: string
}

const MatchingTabBar = ({ iconName, color, size }: MatchingTabBarProps) => {
  const animatedValue = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.5, // Set the end value of the first part of your sequence
          duration: 1500, // Duration of the first part of your sequence
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 1, // Reset to initial scale
          duration: 1500, // Duration of the second part of your sequence
          useNativeDriver: false,
        }),
      ])
    ).start()
  }, [])

  return (
    <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
      <Icon name="heart-outline" color={theme.colors.primary} size={size} />
    </Animated.View>
  )
}

export default MatchingTabBar
