import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Lottie from 'lottie-react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './ChatRoom.style'
import theme from '@/common/style/theme'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'

type ChatRoomNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const ChatRoom = () => {
  // Navigaton
  const navigation = useNavigation<ChatRoomNavigationProp>()
  // Effects
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '사용자 ID',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerRight: () => <Icon name="exit-run" size={28} />,
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Chat' })} />
      ),
    })
  }, [navigation])

  return (
    <S.ChatRoomLayout>
      <S.ChatsArea>
        <S.LottieWrapper>
          <Lottie source={require('@assets/lotties/find-people.json')} autoPlay autoSize />
        </S.LottieWrapper>
      </S.ChatsArea>
      <S.InputArea>
        <Icon name="plus" size={28} color={theme.colors.primary} />
        <S.Input />
        <Icon name="send" size={28} color={theme.colors.primary} />
      </S.InputArea>
    </S.ChatRoomLayout>
  )
}

export default ChatRoom
