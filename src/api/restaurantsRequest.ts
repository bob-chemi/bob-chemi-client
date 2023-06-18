import { GOOGLE_MAPS_API_KEY } from '@env'
import axios from 'axios'

export const restaurantsRequest = {
  // 현재 위치 주변의 식당 정보 가져오기
  getNearByRestaurants: async (lat: number, lon: number, nextPageToken: string | null = null) => {
    let reqUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
    if (nextPageToken) {
      reqUrl += `&pagetoken=${nextPageToken}`
    }
    console.log('요청 URL: ', reqUrl)
    try {
      const res = await axios.get(reqUrl)
      if (res.status === 200) {
        const { results: nearByRestaurants, next_page_token: nextPageToken } = res.data
        return { nearByRestaurants, nextPageToken }
      }
    } catch (error) {
      console.log(error)
    }
  },
}
