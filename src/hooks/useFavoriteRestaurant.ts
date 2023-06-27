import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import favoriteRequest from '@/api/favoriteRequest'
import { favoriteRestaurantAtom, favoriteRestaurantInfoAtom } from '@/recoil/atoms/favoriteRestaurantAtom'

const useFavoriteRestaurant = () => {
  const [favoriteRestaurant, setFavoriteRestaurant] = useRecoilState(favoriteRestaurantAtom)
  const [favoriteRestaurantInfo, setFavoriteRestaurantInfo] = useRecoilState(favoriteRestaurantInfoAtom)

  // Functions
  const updateFavoriteRestaurant = async () => {
    const favoriteRestaurantResponse = await favoriteRequest.queryCurrentFavoriteRestaurants()
    setFavoriteRestaurant(favoriteRestaurantResponse)
  }

  const updateFavoriteRestaurantInfo = (favoriteRestaurantInfo: any[]) => {
    setFavoriteRestaurantInfo(favoriteRestaurantInfo)
  }

  useEffect(() => {
    updateFavoriteRestaurant()
  }, [])

  return {
    favoriteRestaurant,
    setFavoriteRestaurant,
    favoriteRestaurantInfo,
    setFavoriteRestaurantInfo,
    updateFavoriteRestaurant,
    updateFavoriteRestaurantInfo,
  }
}

export default useFavoriteRestaurant
