import { atom } from 'recoil'
import { CurrentLocation } from '@/types/locationAdministrativeAreaTypes'

export const currentLocationAtom = atom<CurrentLocation>({
  key: 'currentLocationAtom',
  default: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0461,
    longitudeDelta: 0.0211,
    administrativeArea: '',
    sublocality: '',
  },
})
