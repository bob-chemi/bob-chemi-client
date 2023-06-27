import { atom } from 'recoil'

export interface FavoriteRestaurantI {
  id: string
  placeId: string
}

export const favoriteRestaurantAtom = atom<FavoriteRestaurantI[]>({
  key: 'favoriteRestaurant',
  default: [],
})

export const favoriteRestaurantInfoAtom = atom<object[]>({
  key: 'favoriteRestaurantInfo',
  default: [],
})
