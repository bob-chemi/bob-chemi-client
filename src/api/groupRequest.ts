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
  }, userId: string) => {
    const { data } = await requestData(`/groups/${userId}`, 'post', null, groupData)
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
  AcceptGroupRequest: async (request: GroupRequest) => {
    const { data } = await requestData(`/groups/${request.pendingId}/${request.groupId}/accept`, 'post')
    return data;
  },
  DenyGroupRequest: async (request: GroupRequest) => {
    const { data } = await requestData(`/groups/${request.pendingId}/${request.groupId}/deny`, 'delete')
    return data;
  }
}
