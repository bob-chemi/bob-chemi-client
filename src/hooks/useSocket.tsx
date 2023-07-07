import { useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useModal } from './useModal'
import { SocketContext } from '@/contexts/socketContext'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'
import UserFoundModal from '@/screens/matching/components/modals/UserFoundModal'
import { JoinedRoomData } from '@/types/chatRoomTypes'

const useSocket = () => {
  const socket = useContext(SocketContext)
  const [matchingState, setMatchingState] = useRecoilState(matchingStatesAtom)
  const { openModal } = useModal()

  // Function

  // Effects
  useEffect(() => {
    if (!socket.connected) {
      console.log('소켓연결안됨')
      socket.connect()
    }

    socket.on('findMatching', data => console.log('매칭 등록 : ', data))

    socket.on('matchFound', data => {
      console.log(data)
      setMatchingState(prev => ({ ...prev, isMatched: true, isMatching: false }))
      openModal({ content: <UserFoundModal /> })
    })

    socket.on('matchingSuccess', data => {
      console.log(data)
      setMatchingState(prev => ({ ...prev, isMatched: true, isMatching: false }))
      openModal({ content: <UserFoundModal /> })
      // matchedUser 의 id가 채팅룸 아이디
      socket.emit('joinRoom', {
        chatRoomId: data.matchedUser.id,
      })
    })

    socket.on('joinedRoom', (data: JoinedRoomData) => {
      console.log('joinedRoom')
      console.log(data)
      setMatchingState(prev => ({ ...prev, matchingInfo: data }))
    })

    socket.on('matchingFailure', data => {
      console.log('매칭 실패')
      console.log(data)
    })

    socket.on('usersConnected', data => {
      console.log(data)
    })

    // 채팅 메세지 받기
    socket.on('chated', data => {
      console.log(data)
    })

    // 채팅방 대화 히스토리 받기
    socket.on('chatHistory', data => {
      console.log('채팅방 채팅 히스토리')
      console.log(data)
    })

    socket.emit('test', `Socket Id from App Id is : ${socket.id}`)
  }, [socket, matchingState, setMatchingState])

  return socket
}

export default useSocket
