import { Region } from 'react-native-maps'
import { atom } from 'recoil'

export const currentLocationAtom = atom<Region>({
  key: 'currentLocationAtom',
  default: {
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.0461,
    longitudeDelta: 0.0211,
  },
})
