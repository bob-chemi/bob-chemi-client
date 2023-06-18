import { useQuery } from 'react-query'
import { restaurantsRequest } from '@/api/restaurantsRequest'

export enum RestaurantsHooksEnum {
  NearByRestaurants = 'nearByRestaurants',
}

export const useGetNearByRestaurants = (lat: number, lon: number) => {
  return useQuery(
    [RestaurantsHooksEnum.NearByRestaurants, lat, lon],
    () => restaurantsRequest.getNearByRestaurants(lat, lon),
    {
      refetchOnWindowFocus: false,
    }
  )
}
