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
    const { data } = await requestData(`/foodieBoard`, 'post', null, foodieData, foodieData.token)
    return data
  },
  patchFoodie: async (foodieData: {
    title: string
    content: string
  }, id: string) => {
    const { data } = await requestData(`/foodieBoard/${id}`, 'patch', null, foodieData)
    return data
  },
  deleteFoodie: async (id: string, token: string) => {
    const { data } = await requestData(`/foodieBoard/${id}`, 'delete', null, null, token)
    return data;
  }
}
