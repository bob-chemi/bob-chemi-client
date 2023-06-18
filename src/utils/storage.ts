import AsyncStorage from '@react-native-async-storage/async-storage'

const setStorage = async <T extends object>(toSave: T, storageKey: string) => {
  try {
    const rememberID = JSON.stringify(toSave)
    await AsyncStorage.setItem(storageKey, rememberID)
  } catch (e) {
    console.warn(e)
  }
}

const getStorage = async (storageKey: string) => {
  try {
    const storageItem = await AsyncStorage.getItem(storageKey)
    if (storageItem) {
      const Item = JSON.parse(storageItem)
      return Item
    }
  } catch (e) {
    console.warn(e)
  }
  return null
}

const removeStorage = async (storageKey: string) => {
  try {
    await AsyncStorage.removeItem(storageKey)
  } catch (e) {
    console.warn(e)
  }
}

export { setStorage, getStorage, removeStorage }
