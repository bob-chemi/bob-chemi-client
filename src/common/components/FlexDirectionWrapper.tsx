import React from 'react'
import styled from 'styled-components/native'
import { FlexInterface, PaddingAndMargin, Variant } from '../style/theme'
interface FlexWrapperProps {
  children: React.ReactNode
}
const FlexDirectionWrapper = ({ children, ...props }: FlexWrapperProps & ContainerProps) => {
  return <Container {...props}>{children}</Container>
}

export default FlexDirectionWrapper

interface ContainerProps extends FlexInterface, PaddingAndMargin {
  backgroundColor?: Variant
}

const Container = styled.View<ContainerProps>`
  padding: ${({ p }) => (typeof p === 'number' ? `${p}px` : '0px')};
  padding-left: ${({ pl }) => (pl ? `${pl}px` : '0px')};
  padding-right: ${({ pr }) => (pr ? `${pr}px` : '0px')};
  padding-top: ${({ pt }) => (pt ? `${pt}px` : '0px')};
  padding-bottom: ${({ pb }) => (pb ? `${pb}px` : '0px')};
  margin: ${({ m }) => (m ? `${m}px` : '0px')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0px')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0px')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0px')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0px')};
  flex: ${({ flex }) => (typeof flex === 'number' ? flex : '0 1 auto')};
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'flex-start')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'stretch')};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : 'transparent'};
`
