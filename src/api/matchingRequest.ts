import { requestData } from './constansts'

const matchingRequest = {
  findMatching: async (body: any) => {
    const { data } = await requestData('/quickMatching', 'post', null, body)
    return data
  },

  // 매칭된 상대방 유저 정보 조회
  queryMatchedUserInfo: async (matchingRoomId: string) => {
    const { data } = await requestData(`/quickMatching/${matchingRoomId}/user1`, 'get', null, null)
    return data
  },
}

export default matchingRequest
