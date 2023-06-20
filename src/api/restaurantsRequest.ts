import { GOOGLE_MAPS_API_KEY } from '@env'
import axios from 'axios'
export const restaurantsRequest = {
  // 위도, 경도로 행정구역, 하위 지역 구하기
  getAdministrativeArea: async (lat: number, lon: number) => {
    const reqUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
    const reqParams = {
      latlng: `${lat},${lon}`,
      key: GOOGLE_MAPS_API_KEY,
      language: 'ko',
      result_type: 'administrative_area_level_1|sublocality',
    }
    let administrativeArea = ''
    let sublocality = ''
    try {
      const res = await axios.get(reqUrl, {
        params: reqParams,
      })
      if (res.status === 200) {
        const { results } = res.data
        const result = results[0]
        const { address_components: addressComponents } = result
        for (const addressComponent of addressComponents) {
          const { long_name: longName, types } = addressComponent
          if (types.includes('administrative_area_level_1')) {
            administrativeArea = longName
          } else if (types.includes('sublocality_level_1')) {
            sublocality = longName
          }
        }
        // administrative_area_level_1이 없는 경우 formatted_address에서 추출
        if (administrativeArea === '') {
          const { formatted_address: formattedAddress } = result
          const splitAddress = formattedAddress.split(' ')
          administrativeArea = splitAddress[1]
        }

        // sublocality_level_1이 없는 경우 formatted_address에서 추출
        if (sublocality === '') {
          const { formatted_address: formattedAddress } = result
          const splitAddress = formattedAddress.split(' ')
          const administrativeAreaIndex = splitAddress.findIndex((address: string) => address === administrativeArea)
          sublocality = splitAddress[administrativeAreaIndex ? administrativeAreaIndex + 1 : 2]
        }
      }
    } catch (error) {
      console.log(error)
    }
    return { administrativeArea, sublocality }
  },
  // 현재 위치 주변의 식당 정보 가져오기
  getNearByRestaurants: async (lat: number, lon: number, nextPageToken: string | null = null) => {
    let reqUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
    if (nextPageToken) {
      reqUrl += `&pagetoken=${nextPageToken}`
    }

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
