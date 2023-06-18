/* eslint-disable no-useless-catch */
import { requestData } from './constansts'
export const foodieRequest = {
  getFoodieList: async () => {
    const { data } = await requestData('/foodieBoard', 'get')
    return data
  },
}
