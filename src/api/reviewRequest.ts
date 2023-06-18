/* eslint-disable no-useless-catch */
import { requestData } from './constansts'
export const reviewRequest = {
  getReviews: async (page: number, order: string) => {
    try {
      await requestData('/reviews', 'get', { page, order })
    } catch (error) {
      throw error
    }
  },
  postReview: async (chemiRating: number, content: string) => {
    try {
      await requestData('/reviews', 'post', { chemiRating, content })
    } catch (error) {
      throw error
    }
  },
  userReviewInquiry: async (id: string) => {
    try {
      await requestData('/reviews', 'get', { id })
    } catch (error) {
      throw error
    }
  },
}
