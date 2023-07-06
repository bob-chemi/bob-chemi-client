import { requestData } from './constansts'

const matchingRequest = {
  findMatching: async (body: any) => {
    const { data } = await requestData('/quickMatching', 'post', null, body)
    return data
  },
}

export default matchingRequest
