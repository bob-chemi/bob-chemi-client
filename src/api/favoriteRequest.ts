import { requestData } from './constansts'
const favoriteRequest = {
  addFavoriteRestaurant: async (placeId: string) => {
    const body = {
      placeId,
    }
    const data = await requestData('/mark', 'post', null, body)
    console.log(data)
  },
}

export default favoriteRequest
