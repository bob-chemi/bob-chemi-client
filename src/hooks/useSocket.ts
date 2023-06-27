import { useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { SocketContext } from '@/contexts/socketContext'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'

const useSocket = () => {
  const socket = useContext(SocketContext)
  const [matchingState, setMatchingState] = useRecoilState(matchingStatesAtom)

  useEffect(() => {
    if (!socket.connected) {
      console.log('소켓연결안됨')
      socket.connect()
    }

    socket.on('findMatching', data => console.log('매칭 등록 : ', data))

    socket.on('matchFound', data => {
      console.log('매칭 완료')
      console.log(data)
      setMatchingState(false)
    })

    socket.emit('test', '테스트중!!!')
  }, [socket])

  return socket
}

export default useSocket
