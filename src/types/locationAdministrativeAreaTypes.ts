import { Region } from 'react-native-maps'

export type AdministrativeArea = {
  administrativeArea: string
  sublocality: string
}

export type CurrentLocation = Region & AdministrativeArea
