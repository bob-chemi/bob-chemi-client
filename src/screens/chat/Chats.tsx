import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { ListRenderItem, FlatList, View, Text } from 'react-native'
import * as S from './Chats.style'
import ChatRoomCard from './components/ChatRoomCard'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import { ChatRoomProps } from '@/types/chatRoomTypes'

const Chats = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomProps[]>([])

  // Functions
  const getChatRooms = async () => {
    const chatRooms = await AsyncStorage.getItem('chatRooms')
    if (chatRooms) {
      const parsedChatRooms = JSON.parse(chatRooms)
      setChatRooms(parsedChatRooms)
    }
  }

  const renderItem: ListRenderItem<ChatRoomProps> = ({ item }) => {
    console.log('렌더링 함수')
    return (
      <ChatRoomCard
        createdAt={item.createdAt}
        matchingId={item.matchingId}
        messages={item.messages}
        roomId={item.roomId}
        user={item.user}
      />
    )
  }

  // Effects
  useEffect(() => {
    getChatRooms()
  }, [])

  useEffect(() => {
    console.log(chatRooms)
  }, [chatRooms])

  return (
    <S.ChatsLayout>
      {chatRooms ? (
        <FlatList
          style={{ flex: 1 }}
          data={chatRooms}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <FlatListSeparator direction="vertical" />}
        />
      ) : (
        <View>
          <Text>채팅 방이 없습니다.</Text>
        </View>
      )}
    </S.ChatsLayout>
  )
}

export default Chats
