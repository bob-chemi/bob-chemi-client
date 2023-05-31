import NaverMapView from 'react-native-nmap'
import styled from 'styled-components/native'

export const Layout = styled.View`
  flex: 1;
  position: relative;
  z-index: 10;
`

export const MapView = styled(NaverMapView)`
  flex: 1;
  position: relative;
`
