import { useInfiniteQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { restaurantsRequest } from '@/api/restaurantsRequest'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'

export enum RestaurantsHooksEnum {
  NearByRestaurants = 'nearByRestaurants',
}

export const useRestaurantsQuery = () => {
  const currentLocation = useRecoilValue(currentLocationAtom)
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    [RestaurantsHooksEnum.NearByRestaurants, currentLocation.latitude, currentLocation.longitude],
    async ({ pageParam = '' }) =>
      restaurantsRequest.getNearByRestaurants(currentLocation.latitude, currentLocation.longitude, pageParam),
    {
      getNextPageParam: lastPage => lastPage?.nextPageToken || null,
      refetchOnWindowFocus: false,
    }
  )
  return { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching }
}
