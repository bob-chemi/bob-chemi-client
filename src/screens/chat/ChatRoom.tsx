import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import Lottie from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './ChatRoom.style'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import theme from '@/common/style/theme'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { StackParamList } from '@/navigations/StackNav'
import { Message, tempDefaultMessages } from '@/types/chatRoomTypes'

type ChatRoomNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

type ChatRoomScreenProp = NativeStackScreenProps<StackParamList, 'ChatRoom'>

const ChatRoom = ({ navigation: screenNavigation }: ChatRoomScreenProp) => {
  // States
  const [chats, setChats] = useState<Message[]>(tempDefaultMessages)
  const [textInputValue, setTextInputValue] = useState<string>('')

  // Navigaton
  const navigation = useNavigation<ChatRoomNavigationProp>()

  // Refs
  const flatListRef = useRef<FlatList>(null)

  // Functions
  const renderChats: ListRenderItem<Message> = ({ item }) => {
    const isMine = item.userId === '2'
    return (
      <S.ChatRow isMine={isMine}>
        {isMine && <S.ChatDate>{String(item.createdAt).substring(0, 15)}</S.ChatDate>}
        <S.ChatBubble isMine={isMine}>
          <S.ChatText isMine={isMine}>{item.message}</S.ChatText>
        </S.ChatBubble>
        {!isMine && <S.ChatDate>{String(item.createdAt).substring(0, 15)}</S.ChatDate>}
      </S.ChatRow>
    )
  }

  const sendMessage = () => {
    if (!textInputValue) return
    const newMessage: Message = {
      createdAt: new Date(),
      message: textInputValue,
      userId: '2',
      roomId: '123',
      key: String(Math.random()),
    }
    setChats(prev => [...prev, newMessage])
    setTextInputValue('')
  }

  const goToChemiRating = () => {
    screenNavigation.navigate('ChemiRating')
  }

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

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true })
  }, [chats])

  return (
    <S.ChatRoomLayout>
      <S.ChatsArea>
        {/* <S.LottieWrapper>
          <Lottie source={require('@assets/lotties/find-people.json')} autoPlay autoSize />
          <S.LottieText>식사 메이트를 찾는 중 입니다.</S.LottieText>
        </S.LottieWrapper> */}
        <FlatList
          ref={flatListRef}
          data={chats}
          renderItem={renderChats}
          ItemSeparatorComponent={() => <FlatListSeparator direction="vertical" />}
        />
        <S.AskWrapper onPress={() => goToChemiRating()}>
          <S.AskText>식사는 어떠셨나요?</S.AskText>
          <S.AskText>케미 점수를 남겨보세요!</S.AskText>
          <S.AskText underline>케미 점수 주러 가기</S.AskText>
        </S.AskWrapper>
      </S.ChatsArea>
      <S.InputArea>
        <Icon name="plus" size={28} color={theme.colors.primary} />
        <S.Input value={textInputValue} onChangeText={newText => setTextInputValue(newText)} />
        <Icon name="send" size={28} color={theme.colors.primary} onPress={sendMessage} />
      </S.InputArea>
    </S.ChatRoomLayout>
  )
}

export default ChatRoom
