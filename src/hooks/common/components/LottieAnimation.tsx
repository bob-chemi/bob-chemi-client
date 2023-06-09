import LottieView from 'lottie-react-native'
import React from 'react'

const LottieAnimation = () => {
  return (
    <LottieView
      source={require('../../assets/lottie.json')}
      autoPlay
      loop
      style={[
        {
          transform: [{ scale: 0.9 }],
        },
      ]}
      resizeMode="cover"
    />
  )
}
export default LottieAnimation
