/* eslint-disable no-useless-catch */
import { GroupRequest } from '@/types/socialType'
import { requestData } from './constansts'
export const groupRequest = {
  getGroupList: async () => {
    const { data } = await requestData('/groups', 'get')
    return data
  },
  getGroupById: async (id: string) => {
    try {
      await requestData('/groups', 'get', { id })
    } catch (error) {
      throw error
    }
  },
  getGroupByDate: async (date: string) => {
    const { data } = await requestData(`/groups/date/${date}`, 'get')
    return data;
  },
  insertGroup: async (groupData: {
    title: string
    description: string
    groupDate: string
    groupPeopleLimit: number
    groupHour: number
    groupMin: number
    groupLocation: string
    image: string
  }, userId: string) => {
    const { data } = await requestData(`/groups/${userId}`, 'post', null, groupData)
    return data
  },
  patchGroup: async (groupData: {
    title: string
    description: string
    groupDate: string
    groupPeopleLimit: number
    groupHour: number
    groupMin: number
    groupLocation: string
  }, groupId: number) => {
    const { data } = await requestData(`/groups/${groupId}/group`, 'patch', null, groupData)
    return data
  },
  deleteGroup: async (id: number) => {
    const { data } = await requestData(`/groups/${id}`, 'delete')
    return data;
  },
  getCreatedGroup: async (userId: string) => {
    const { data } = await requestData(`/groups/created/${userId}`, 'get')
    return data;
  },
  getGroupPending: async (groupid: number) => {
    const { data } = await requestData(`/groups/${groupid}/pending`, 'get')
    return data;
  },
  acceptGroupRequest: async (request: GroupRequest) => {
    const { data } = await requestData(`/groups/${request.MemberId}/${request.groupId}/accept`, 'post')
    return data;
  },
  denyGroupRequest: async (request: GroupRequest) => {
    console.log(request);
    const { data } = await requestData(`/groups/${request.MemberId}/${request.groupId}/deny`, 'delete')
    return data;
  },
  joinGroupRequest: async (email: string, groupId: number) => {
    const { data } = await requestData(`/groups/${email}/${groupId}/join`, 'post')
    return data;
  }
}
