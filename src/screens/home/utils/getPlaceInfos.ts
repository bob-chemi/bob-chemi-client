import { GOOGLE_MAPS_API_KEY } from '@env'
import axios from 'axios'

interface PhotoOfApi {
  width: number
  height: number
  html_attributions: string[]
  photo_reference: string
}

const getImages = (imageRefs: PhotoOfApi[] | null) => {
  const reqUrl = 'https://maps.googleapis.com/maps/api/place/photo'
  if (imageRefs === null) {
    return []
  }
  const imageUrls: string[] = imageRefs.map(imageRef => {
    const ref = imageRef.photo_reference
    const url = `${reqUrl}?maxwidth=400&photo_reference=${ref}&key=${GOOGLE_MAPS_API_KEY}`
    return url
  })
  return imageUrls
}

export const getPlaceDetailInfo = async (placeId: string) => {
  const detailReqUrl = 'https://maps.googleapis.com/maps/api/place/details/json'
  try {
    const detailRestaurantInfo = await axios.get(detailReqUrl, {
      params: {
        place_id: placeId,
        key: GOOGLE_MAPS_API_KEY,
        language: 'ko',
      },
    })
    if (detailRestaurantInfo.status === 200 && detailRestaurantInfo.data.status === 'OK') {
      const detailInfo = detailRestaurantInfo.data.result
      console.log(detailInfo)
      const imageRefs = detailInfo.photos ? detailInfo.photos : null
      const imageUrls = getImages(imageRefs)
      // 영업중인지 확인
      const openNow = detailInfo.current_opening_hours
        ? detailInfo.current_opening_hours.open_now
          ? true
          : false
        : null
      const operationHours = detailInfo.current_opening_hours ? detailInfo.current_opening_hours.weekday_text : []
    }
  } catch (error) {
    console.log(error)
  }
}
