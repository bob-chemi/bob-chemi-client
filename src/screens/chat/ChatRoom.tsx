import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import Lottie from 'lottie-react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as S from './ChatRoom.style'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import theme from '@/common/style/theme'
import { SocketContext } from '@/contexts/socketContext'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { StackParamList } from '@/navigations/StackNav'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { ChatRoomProps, Message, tempDefaultMessages } from '@/types/chatRoomTypes'
import { getStorage, setStorage } from '@/utils/storage'

type ChatRoomNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

type ChatRoomScreenProp = NativeStackScreenProps<StackParamList, 'ChatRoom'>

const ChatRoom = ({ navigation: screenNavigation }: ChatRoomScreenProp) => {
  // States
  const [room, setRoom] = useState<ChatRoomProps>({
    createdAt: '2023-06-23',
    matchingId: '1234',
    messages: [],
    roomId: '12344',
    user: ['', ''],
  })
  const [chats, setChats] = useState<Message[]>(tempDefaultMessages)
  const [textInputValue, setTextInputValue] = useState<string>('')
  const userInfo = useRecoilValue(userStatesAtom)
  const [matchingState, setMatchingState] = useRecoilState(matchingStatesAtom)

  // Navigaton
  const navigation = useNavigation<ChatRoomNavigationProp>()

  // Refs
  const flatListRef = useRef<FlatList>(null)

  // Socket
  const socket = useContext(SocketContext)

  // Functions
  const renderChats: ListRenderItem<Message> = ({ item }) => {
    // console.log(item)
    const isMine = item.userId === '2'
    return (
      <S.ChatRow isMine={isMine}>
        {isMine && <S.ChatDate>{String(item.createdAt).substring(0, 15)}</S.ChatDate>}
        <S.ChatBubble isMine={isMine}>
          <S.ChatText isMine={isMine}>{item ? item.message : 'Good'}</S.ChatText>
        </S.ChatBubble>
        {!isMine && <S.ChatDate>{String(item.createdAt).substring(0, 15)}</S.ChatDate>}
      </S.ChatRow>
    )
  }

  const sendMessage = () => {
    if (!textInputValue) return
    const newMessage: any = {
      message: textInputValue,
      sender: 'f5b6f995-6f87-49c2-af04-043a36d217f1',
      receiver: 'f5b6f995-6f87-49c2-af04-043a36d217f1',
      roomId: 'dd42acbf-9fd5-4b89-8851-b112b4baa1cd',
    }
    socket.emit('chat', newMessage)
    setChats(prev => [...prev, newMessage])
    setTextInputValue('')
  }

  const goToChemiRating = () => {
    setMatchingState({
      isMatching: false,
      isMatched: false,
      isOnChatRoom: false,
    })
    screenNavigation.navigate('ChemiRating')
  }

  const onPressBack = () => {
    setMatchingState(prev => ({ ...prev, isOnChatRoom: false }))
    navigation.navigate('Tab', { screen: 'Profile' })
  }

  // Effects
  // 네비게이션 설정 / 마운트시 matchingState.isOnChatRoom 설정
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '사용자 ID',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerRight: () => <Icon name="exit-run" size={28} />,
      headerLeft: () => <Icon name="chevron-left" size={28} onPress={onPressBack} />,
    })
    console.log('isOnChat')
    setMatchingState(prev => ({ ...prev, isOnChatRoom: true }))
  }, [navigation])

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true })
  }, [chats])

  // 채팅창의 상태 업데이트
  useEffect(() => {
    const handleChatRooms = async () => {
      const chatRooms: ChatRoomProps[] = await getStorage('chatRooms')
      if (chatRooms) {
        console.log(chatRooms)
        const exists = chatRooms.some(chatRoom => chatRoom.roomId === room.roomId)
        if (!exists) {
          const newChatRooms = [...chatRooms, room]
          console.log('newChatRooms', newChatRooms)
          await setStorage(newChatRooms, 'chatRooms')
        }
      } else {
        const stringifyedRooms = JSON.stringify([room])
        await AsyncStorage.setItem('chatRooms', stringifyedRooms)
      }
    }

    setRoom(prev => {
      return {
        ...prev,
        messages: chats,
      }
    })

    handleChatRooms()
  }, [chats])

  // 소켓 서버에서 메세지 받는 것 처리
  useEffect(() => {
    socket.on('chatMessage', message => {
      console.log(message)
      setChats(prev => [...prev, message])
    })

    return () => {
      socket.off('chatMessage')
    }
  }, [])

  return (
    <S.ChatRoomLayout>
      <S.ChatsArea>
        {!matchingState.isMatched ? (
          <S.LottieWrapper>
            <Lottie source={require('@assets/lotties/find-people.json')} autoPlay autoSize />
            <S.LottieText>식사 메이트를 찾는 중 입니다.</S.LottieText>
          </S.LottieWrapper>
        ) : (
          <View></View>
          // <FlatList
          //   ref={flatListRef}
          //   data={chats}
          //   renderItem={renderChats}
          //   ItemSeparatorComponent={() => <FlatListSeparator direction="vertical" />}
          // />
        )}

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
