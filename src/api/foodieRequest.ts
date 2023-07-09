/* eslint-disable no-useless-catch */
import { requestData } from './constansts'
export const foodieRequest = {
  getFoodieList: async () => {
    const { data } = await requestData('/foodieBoard', 'get')
    return data
  },
  insertFoodie: async (foodieData: {
    title: string
    content: string
    token: string
  }) => {
    const { data } = await requestData(`/foodieBoard`, 'post', null, foodieData)
    return data
  },
}
