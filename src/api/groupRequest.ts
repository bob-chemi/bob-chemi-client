/* eslint-disable no-useless-catch */
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
    const { data } = await requestData('/groups/date', 'get', { date })
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
  }) => {
    console.log(groupData);
    const { data } = await requestData('/groups', 'post', null, groupData)
    return data
  },
  deleteGroup: async (id: string) => {
    try {
      await requestData('/groups', 'delete', { id })
    } catch (error) {
      throw error
    }
  },
}
