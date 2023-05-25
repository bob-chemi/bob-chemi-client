import { useEffect } from 'react'
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

// 사용중인 권한
// - 위치정보
// - android: ACCESS_FINE_LOCATION
// - android: ACCESS_BACKGROUND_LOCATION
// - ios: LocationAccuracy
// - ios: LocationAlways
// - ios: LocationWhenInUse

const requestFineLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await request('android.permission.ACCESS_FINE_LOCATION')
      if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
        Alert.alert('이 앱은 위치 권한 허용이 필요합니다', '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요', [
          { text: '아니오', onPress: () => console.log('사용자가 위치 권한을 거부'), style: 'cancel' },
          { text: '네', onPress: () => Linking.openSettings() },
        ])
      }
    } catch (error) {
      console.log('안드로이드 위치 권한 에러', error)
    }
  } else if (Platform.OS === 'ios') {
    try {
      const result = await request('ios.permission.LOCATION_ALWAYS')
      if (result === RESULTS.DENIED) {
        Alert.alert('이 앱은 위치 권한 허용이 필요합니다', '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요', [
          { text: '아니오', onPress: () => console.log('사용자가 위치 권한을 거부'), style: 'cancel' },
          { text: '네', onPress: () => Linking.openSettings() },
        ])
      }
    } catch (error) {
      console.log('iOS 위치 권한 에러', error)
    }
  }
}

const requestBackgroundLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await request('android.permission.ACCESS_BACKGROUND_LOCATION')
      if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
        Alert.alert(
          '이 앱은 위치 권한 허용이 필요합니다',
          '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요',
          [
            { text: '아니오', onPress: () => console.log('사용자가 위치 권한을 거부'), style: 'cancel' },
            { text: '네', onPress: () => Linking.openSettings() },
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      console.log('안드로이드 위치 권한 에러', error)
    }
  } else if (Platform.OS === 'ios') {
    try {
      const result = await request('ios.permission.LOCATION_ALWAYS')
      if (result === RESULTS.DENIED) {
        Alert.alert(
          '이 앱은 위치 권한 허용이 필요합니다',
          '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요',
          [
            { text: '아니오', onPress: () => console.log('사용자가 위치 권한을 거부'), style: 'cancel' },
            { text: '네', onPress: () => Linking.openSettings() },
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      console.log('iOS 위치 권한 에러', error)
    }
  }
}

const usePermissions = () => {
  useEffect(() => {
    requestFineLocationPermission()
    requestBackgroundLocationPermission()
  }, [])
}

export default usePermissions
