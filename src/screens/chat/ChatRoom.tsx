import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import Lottie from 'lottie-react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilState } from 'recoil'
import * as S from './ChatRoom.style'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import theme from '@/common/style/theme'
import { SocketContext } from '@/contexts/socketContext'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { StackParamList } from '@/navigations/StackNav'
import { matchingChatArrayAtom } from '@/recoil/atoms/matchingChatArrayAtom'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'
import { ChatType } from '@/types/chatRoomTypes'

type ChatRoomNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

type ChatRoomScreenProp = NativeStackScreenProps<StackParamList, 'ChatRoom'>

const ChatRoom = ({ navigation: screenNavigation }: ChatRoomScreenProp) => {
  // States
  const [textInputValue, setTextInputValue] = useState<string>('')

  const [matchingState, setMatchingState] = useRecoilState(matchingStatesAtom)
  const [chats, setChats] = useRecoilState<ChatType[]>(matchingChatArrayAtom)

  // Navigaton
  const navigation = useNavigation<ChatRoomNavigationProp>()

  // Refs
  const flatListRef = useRef<FlatList>(null)

  // Socket
  const socket = useContext(SocketContext)

  // Functions
  const renderChats: ListRenderItem<ChatType> = ({ item }) => {
    // console.log(item)
    const isMine = item.sender === matchingState.matchingInfo?.user2Id
    return (
      <S.ChatRow isMine={isMine}>
        {isMine && <S.ChatDate>{String(item.timestamp).substring(0, 15)}</S.ChatDate>}
        <S.ChatBubble isMine={isMine}>
          <S.ChatText isMine={isMine}>{item ? item.message : 'Good'}</S.ChatText>
        </S.ChatBubble>
        {!isMine && <S.ChatDate>{String(item.timestamp).substring(0, 15)}</S.ChatDate>}
      </S.ChatRow>
    )
  }

  const sendMessage = () => {
    if (!textInputValue) return

    const newMessage: any = {
      message: textInputValue,
      sender: matchingState.matchingInfo?.user2Id,
      receiver: matchingState.matchingInfo?.user1Id,
      roomId: matchingState.matchingInfo?.chatRoomId,
    }
    // console.log('메세지 소켓에 보내는 것 ')
    // console.log(newMessage)

    socket.emit('chat', newMessage)
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
      headerTitle: matchingState.matchingInfo?.user1Id ? matchingState.matchingInfo?.user1Id : '사용자를 찾는중입니다.',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerRight: () => <Icon name="exit-run" size={28} />,
      headerLeft: () => <Icon name="chevron-left" size={28} onPress={onPressBack} />,
    })
    // console.log('isOnChat')
    setMatchingState(prev => ({ ...prev, isOnChatRoom: true }))

    //채팅방 처음 들어올때 로컬에 저장, (로컬 채팅 데이터가 빈 경우 실행하고 받은 Array 로컬에 저장)
    socket.emit('getChatHistory', matchingState.matchingInfo?.chatRoomId)
    // 채팅방 대화 히스토리 받기
    socket.on('chatHistory', (chatHistory: ChatType[]) => {
      console.log('채팅방 채팅 히스토리')
      console.log(chatHistory)
      setChats(chatHistory)
    })

    // 나갈시 이벤트 해제
    return () => {
      socket.off('chatHistory')
    }
  }, [navigation])

  // 소켓 메세지 받고 스크로 아래로 내리기
  useEffect(() => {
    // 채팅 메세지 받기
    socket.on('chated', (chat: ChatType) => {
      console.log(chat)
      setChats(prev => [...prev, chat])
    })
    // 스크롤 아래로 내리기
    flatListRef.current?.scrollToEnd({ animated: true })
  }, [chats])

  // 디버깅
  useEffect(() => {
    console.log('매칭 state')
    console.log(matchingState.matchingInfo)
  }, [matchingState])

  return (
    <S.ChatRoomLayout>
      <S.ChatsArea>
        {!matchingState.isMatched ? (
          <S.LottieWrapper>
            <Lottie source={require('@assets/lotties/find-people.json')} autoPlay autoSize />
            <S.LottieText>식사 메이트를 찾는 중 입니다.</S.LottieText>
          </S.LottieWrapper>
        ) : (
          <FlatList
            ref={flatListRef}
            data={chats}
            renderItem={renderChats}
            ItemSeparatorComponent={() => <FlatListSeparator direction="vertical" />}
          />
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
