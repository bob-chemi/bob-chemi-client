import styled from 'styled-components/native'

export const SearchBarLayout = styled.View`
  position: absolute;
  top: 20px;
  width: 100%;
  z-index: 20;
  padding: ${({ theme }) => theme.paddings.default};
`
