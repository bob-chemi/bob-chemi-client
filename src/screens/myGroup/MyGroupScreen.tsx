import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
const MyGroupScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>MyGroupScreen</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>go Back</Text>
      </Pressable>
    </View>
  )
}

export default MyGroupScreen
