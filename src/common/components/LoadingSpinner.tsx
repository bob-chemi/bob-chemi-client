import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const LoadingSpinnerLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LoadingSpinner = () => {
  return (
    <LoadingSpinnerLayout>
      <ActivityIndicator size={60} color="ff7622" />
    </LoadingSpinnerLayout>
  )
}

export default LoadingSpinner
