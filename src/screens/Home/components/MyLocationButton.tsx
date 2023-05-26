import React from 'react'
import { Pressable, Text } from 'react-native'
import styled from 'styled-components/native'

interface MyLocationButtonProps {
  onPress: () => void
}

const Layout = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;

  width: 50px;
  height: 50px;
  background-color: #ff5c00;
  border-radius: 25px;

  justify-content: center;
  align-items: center;
`

const MyLocationButton = ({ onPress }: MyLocationButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color: 'white' }}>Cur</Text>
    </Pressable>
  )
}

export default MyLocationButton
