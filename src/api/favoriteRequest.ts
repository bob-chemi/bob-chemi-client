import { requestData } from './constansts'
const favoriteRequest = {
  // 즐겨찾기 추가
  addFavoriteRestaurant: async (placeId: string) => {
    const body = {
      placeId,
    }
    const { data } = await requestData('/mark', 'post', null, body)
    return data
  },

  // 즐겨찾기 삭제
  deleteFavoriteRestaurant: async (id: string) => {
    await requestData(`/mark/${id}`, 'delete')
  },

  // 즐겨찾기 조회
  queryCurrentFavoriteRestaurants: async () => {
    const { data } = await requestData('/mark', 'get')
    return data
  },
}

export default favoriteRequest
