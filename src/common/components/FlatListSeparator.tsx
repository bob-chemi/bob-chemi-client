import React from 'react'
import styled from 'styled-components/native'

interface FlatListSeparatorProps {
  direction: 'vertical' | 'horizontal'
  backgroundColor?: string
}

type SeparatorProp = Pick<FlatListSeparatorProps, 'backgroundColor'>

const VerticalSeparator = styled.View<SeparatorProp>`
  width: 100%;
  height: 10px;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : null)};
`

const HorizontalSeparator = styled.View<SeparatorProp>`
  width: 10px;
  height: 100%;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : null)};
`

const FlatListSeparator = ({ direction, backgroundColor }: FlatListSeparatorProps) => {
  if (direction === 'vertical') {
    return <VerticalSeparator backgroundColor={backgroundColor} />
  } else {
    return <HorizontalSeparator backgroundColor={backgroundColor} />
  }
}

export default FlatListSeparator
